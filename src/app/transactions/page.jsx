import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider'
import { toast } from 'react-toastify';
import { storage } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


export default function TransactionsPage() {
    const [transactiondate, setTransactionDate] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');
    const [categoryid, setCategoryId] = useState('');
    const [accountid, setAccountId] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const backendUrl = import.meta.env.VITE_BACKEND + '/transactions'

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
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
                console.log("Image", image)
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

            }

            try {
                await axios.post(backendUrl, data)
                    .then((response) => {
                        console.log("Success:", response.data);
                        toast.success('Transaction added successfully!');
                    })
            } catch (error) {
                console.error('Error adding transaction:', error);
                toast.error('Error adding transaction.');
            }
        }
    };


    return (
        <div className="bg-background p-8 rounded-lg w-full md:w-1/2 lg:w-1/3 ">
            <h1 className="text-3xl font-bold text-center mb-8">Transaction Form</h1>
            <form onSubmit={handleSubmit}>

                {/* Transaction type */}
                <div className="flex flex-col mb-4">
                    <label htmlFor="type" className="text-lg font-semibold mb-2">Transaction Type:</label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-900"
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                {/* Transaction Date */}
                <div className="flex flex-col mb-4">
                    <label htmlFor="transactiondate" className="text-lg font-semibold mb-2">Transaction Date</label>
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
                    <label htmlFor="amount" className="text-lg font-semibold mb-2">Amount (MYR):</label>
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
                    <label htmlFor="categoryid" className="text-lg font-semibold mb-2">Category:</label>
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
                    <label htmlFor="accountid" className="text-lg font-semibold mb-2">Account:</label>
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
                    <label htmlFor="description" className="text-lg font-semibold mb-2">Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none  text-gray-900"
                    />
                </div>

                {/* Image*/}
                <div className="flex flex-col mb-4">
                    <label htmlFor="image" className="text-lg font-semibold mb-2">Image:</label>
                    <input type="file" id="image" onChange={handleImageChange} className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-900" /> </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-2 rounded-md self-center mt-4 focus:outline-none"
                >
                    Add Transaction
                </button>
            </form>
        </div>
    );
}

