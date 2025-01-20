import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaImage } from 'react-icons/fa';

const TransactionsForm = () => {
    const [transactiondate, setTransactionDate] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');
    const [categoryid, setCategoryId] = useState('');
    const [accountid, setAccountId] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const { currentUser } = useContext(AuthContext);
    const backendUrl = import.meta.env.VITE_BACKEND + '/transactions';

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
                accountid: accountid,
                categoryid: categoryid,
                amount: amount,
                transactiondate: transactiondate,
                description: description,
                type: type,
                image_url: uploadedImageUrl,
            };

            try {
                await axios.post(backendUrl, data)
                    .then((response) => {
                        console.log("Success:", response.data);
                        toast.success('Transaction added successfully!');

                        // Reset state to null after successful submission
                        setTransactionDate('');
                        setAmount('');
                        setType('income');
                        setCategoryId('');
                        setAccountId('');
                        setDescription('');
                        setImage(null);
                        setImagePreview('');
                    });
            } catch (error) {
                console.error('Error adding transaction:', error);
                toast.error('Error adding transaction.');
            }
        }
    };

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
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-900"
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
                    <label htmlFor="categoryid" className="font-semibold mb-2">Category</label>
                    <input
                        type="text"
                        id="categoryid"
                        value={categoryid}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-900"
                        required
                    />
                </div>

                {/* Account */}
                <div className="flex flex-col mb-4">
                    <label htmlFor="accountid" className="font-semibold mb-2">Account</label>
                    <input
                        type="text"
                        id="accountid"
                        value={accountid}
                        onChange={(e) => setAccountId(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-900"
                        required
                    />
                </div>

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
                        <img src={imagePreview} alt="Transaction" className="mt-2 rounded-md max-h-60" />
                    ) : (
                        <div className="flex items-center justify-center mt-2 text-gray-600">
                            <FaImage className="text-3xl mr-2" />
                            <span>Upload invoice or receipt</span> </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-2 rounded-md self-center mt-4 focus:outline-none w-full"
                >
                    Add Transaction
                </button>
            </form>
        </div>
    );
}

export default TransactionsForm;
