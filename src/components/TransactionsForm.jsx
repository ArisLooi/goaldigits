import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';
import { createTransaction } from '../features/transactions/transactionsSlice'
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaImage } from 'react-icons/fa';
import { incomeCategories, expenseCategories } from '../assets/utils/categories'

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
                console.log("Image", image);
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
    const selectedCategories = type === 'income' ? incomeCategories : expenseCategories;

    return (
        <div className="bg-background p-4 rounded-lg w-full max-w-md mx-auto sm:max-w-lg lg:max-w-xl">
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
                    className="bflex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Add Transaction
                </button>
            </form>
        </div>
    );
}

export default TransactionsForm;
