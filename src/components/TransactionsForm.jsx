import React, { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';
import { createTransaction } from '../features/transactions/transactionsSlice';
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaImage, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { categories } from '../assets/utils/categories';
import useSpeechRecognition from '../hook/useSpeechRecognition';

const TransactionsForm = ({ refreshTransactions }) => {
    const [transactiondate, setTransactionDate] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const { currentUser } = useContext(AuthContext);
    const dispatch = useDispatch();
    const { isListening, transcript, startListening, stopListening, isSupported } = useSpeechRecognition();

    // Process voice input
    const processVoiceInput = (transcript) => {
        if (!transcript) return;

        const text = transcript.toLowerCase();
        console.log('Processing voice input:', text); // For debugging

        // Process date
        const monthNames = {
            'january': '01', 'february': '02', 'march': '03', 'april': '04',
            'may': '05', 'june': '06', 'july': '07', 'august': '08',
            'september': '09', 'october': '10', 'november': '11', 'december': '12'
        };

        // Handle common misspellings
        const monthAliases = {
            'febuary': 'february',
            'sept': 'september',
            'oct': 'october',
            'nov': 'november',
            'dec': 'december'
        };

        // Replace common misspellings with correct month names
        let correctedText = text;
        for (const [alias, correctMonth] of Object.entries(monthAliases)) {
            correctedText = correctedText.replace(alias, correctMonth);
        }

        const dateMatch = correctedText.match(/(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})(?:st|nd|rd|th)?(?:\s*,?\s*(\d{4}))?/i);
        if (dateMatch) {
            const month = monthNames[dateMatch[1].toLowerCase()];
            let day = dateMatch[2].padStart(2, '0');
            const year = dateMatch[3] || new Date().getFullYear();

            // Format as dd/mm/yyyy
            const formattedDate = `${year}-${month}-${day}`;
            setTransactionDate(formattedDate);
            console.log('Date set:', formattedDate);
        }

        // Process amount
        const amountRegex = /(?:rm|myr|ringgit)?\s*(\d+(?:\.\d{2})?|\d+)/i;
        const amountMatch = text.match(amountRegex);
        if (amountMatch) {
            const amount = amountMatch[1].replace(/[^\d.]/g, '');
            setAmount(amount);
            console.log('Amount set:', amount);
        }

        // Process type
        if (text.includes('income') || text.includes('earning') || text.includes('salary')) {
            setType('income');
            console.log('Type set: income');
        } else if (text.includes('expense') || text.includes('spent') || text.includes('payment')) {
            setType('expense');
            console.log('Type set: expense');
        }

        // Process category
        const allCategories = [...categories.income, ...categories.expense];
        const categoryMatch = allCategories.find(c =>
            text.includes(c.type.toLowerCase()) ||
            text.includes(`category ${c.type.toLowerCase()}`)
        );
        if (categoryMatch) {
            setCategory(categoryMatch.type);
            console.log('Category set:', categoryMatch.type);
        }

        // Process description
        let descriptionText = '';
        const descriptionMarkers = ['description', 'note', 'for', 'about'];

        for (const marker of descriptionMarkers) {
            const regex = new RegExp(`${marker}\\s+(.+?)(?=\\s+(?:${descriptionMarkers.join('|')})|$)`, 'i');
            const match = text.match(regex);
            if (match) {
                descriptionText = match[1].trim();
                break;
            }
        }

        if (!descriptionText) {
            const words = text.split(' ');
            const remainingWords = words.filter(word =>
                !word.match(/^(rm|myr|ringgit|income|expense|category|january|february|march|april|may|june|july|august|september|october|november|december)$/i)
            );
            descriptionText = remainingWords.join(' ');
        }

        if (descriptionText) {
            setDescription(descriptionText);
            console.log('Description set:', descriptionText);
        }


    };

    // Process transcript when it changes
    useEffect(() => {
        if (transcript) {
            processVoiceInput(transcript);
            toast.success('Voice input processed');
        }
    }, [transcript]);

    const handleVoiceCommand = () => {
        if (isListening) {
            stopListening();
        } else {
            toast.info(
                'Speak your transaction details. For example: "Income of RM 500 on January 15th 2024 for salary in category wages description monthly payment"'
            );
            startListening();
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentUser) {
            let uploadedImageUrl = '';

            // Upload image to Firebase storage if an image is selected
            if (image) {
                const storageRef = ref(storage, `images/${image.name}`);
                const snapshot = await uploadBytes(storageRef, image);
                uploadedImageUrl = await getDownloadURL(snapshot.ref);
                // console.log("Image", image);
            }

            const data = {
                uid: currentUser.uid,
                category: category,
                amount: amount,
                transactiondate: transactiondate,
                description: description,
                type: type,
                image_url: uploadedImageUrl,
            };

            try {
                await dispatch(createTransaction(data));
                toast.success('Transaction added successfully!');
                refreshTransactions();
                // Reset state to null after successful submission
                setTransactionDate('');
                setAmount('');
                setType('income');
                setCategory('');
                setDescription('');
                setImage(null);
                setImagePreview('');
            } catch (error) {
                console.error('Error adding transaction:', error);
                toast.error('Error adding transaction.');
            }
        }
    };

    // Ensure the categories are correctly selected based on the type
    const selectedCategories = type === 'income' ? categories.income : categories.expense;

    return (
        <div className="bg-background p-4 rounded-lg w-full max-w-md mx-auto sm:max-w-lg lg:max-w-xl">
            {isSupported && (
                <button
                    type="button"
                    onClick={handleVoiceCommand}
                    className={`mb-4 p-3 rounded-full ${isListening ? 'bg-red-500 text-white' : 'bg-indigo-600 text-white'
                        } flex items-center justify-center w-full gap-2`}
                >
                    {isListening ? (
                        <>
                            <FaMicrophoneSlash className="w-4 h-4" />
                            <span>Stop Listening</span>
                        </>
                    ) : (
                        <>
                            <FaMicrophone className="w-4 h-4" />
                            <span>Add Transaction by Voice</span>
                        </>
                    )}
                </button>
            )}
            <form onSubmit={handleSubmit}>
                {/* Transaction type */}
                <div className="flex flex-col mb-4">
                    <label htmlFor="type" className="font-semibold mb-2">Type</label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none text-gray-900"
                    >
                        <option value="income" className='text-sm'>Income</option>
                        <option value="expense" className='text-sm'>Expense</option>
                    </select>
                </div>

                {/* Transaction Date */}
                <div className="flex flex-col mb-4">
                    <label htmlFor="transactiondate" className="font-semibold mb-2">Date</label>
                    <input
                        type="date"
                        id="transactiondate"
                        value={transactiondate}
                        onChange={(e) => setTransactionDate(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-900"
                        required
                    />
                </div>

                {/* Amount */}
                <div className="flex flex-col mb-4">
                    <label htmlFor="amount" className="font-semibold mb-2">Amount (MYR):</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-900"
                        required
                    />
                </div>

                {/* Category */}
                <div className="flex flex-col mb-4">
                    <label htmlFor="category" className="font-semibold mb-2">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-900"
                    >
                        {selectedCategories.map((c) => <option key={c.type} value={c.type}>{c.type}</option>)}
                    </select>
                </div>

                {/* Account
                <div className="flex flex-col mb-4">
                    <label htmlFor="account" className="font-semibold mb-2">Account</label>
                    <input
                        type="text"
                        id="account"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-900"
                        required
                    />
                </div> */}

                {/* Description */}
                <div className="flex flex-col mb-4">
                    <label htmlFor="description" className="font-semibold mb-2">Description</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-900"
                    />
                </div>

                {/* Image */}
                <div className="flex flex-col mb-4">
                    <label htmlFor="image" className="font-semibold mb-2">Image</label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-900"
                    />
                    {imagePreview ? (
                        <img src={imagePreview} alt="Transaction" className="mt-2 rounded-md max-h-70 overflow-auto" />
                    ) : (
                        <div className="flex items-center justify-center mt-2 text-gray-600">
                            <FaImage className="text-3xl/>
                 mr-2" />
                            <span>Upload invoice or receipt</span> </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="mb-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Submit
                </button>

            </form>
        </div>
    );
}

export default TransactionsForm;
