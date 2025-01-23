import React, { useState, useContext } from 'react';
import { useDispatch } from "react-redux";
import { AuthContext } from '../context/AuthProvider';
import { updateTransaction, deleteTransaction } from "../features/transactions/transactionsSlice";
import { toast } from 'react-toastify';
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { FaImage } from 'react-icons/fa';
import { incomeCategories, expenseCategories } from '../assets/utils/categories'

const UpdateTransactionModal = ({ isOpen, onClose, transaction, refreshTransactions }) => {
    const [formData, setFormData] = useState({
        category: transaction.category,
        amount: transaction.amount,
        transactiondate: transaction.transactiondate,
        description: transaction.description,
        type: transaction.type,
        image_url: transaction.image_url
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(transaction.image_url);
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Reset category when type changes 
    const handleTypeChange = (e) => {
        setFormData({ ...formData, type: e.target.value, category: '' });
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
            let uploadedImageUrl = formData.image_url;

            // Upload image to Firebase storage if an image is selected
            if (image) {
                const storageRef = ref(storage, `images/${image.name}`);
                const snapshot = await uploadBytes(storageRef, image);
                uploadedImageUrl = await getDownloadURL(snapshot.ref);
            }

            const data = {

                uid: currentUser.uid,
                category: formData.category,
                amount: formData.amount,
                transactiondate: formData.transactiondate,
                description: formData.description,
                type: formData.type,
                image_url: uploadedImageUrl,
            };

            try {
                const response = await dispatch(updateTransaction({
                    transactionid: transaction.transactionid,
                    newTransaction: data,
                    newFile: image
                })).unwrap();

                // console.log("Update Response", response);

                if (response.data && response.data.transactionid) {
                    toast.success('Transaction updated successfully!');
                    refreshTransactions(); onClose();
                } else {
                    console.error('Update failed: Invalid response structure', response);
                    toast.error('Failed to update transaction.');
                }
            } catch (error) {
                console.error('Error updating transaction:', error);
                toast.error('Failed to update transaction.');
            }
        }
    };

    const handleDelete = async () => {
        try {
            const response = await dispatch(deleteTransaction({
                transactionid: transaction.transactionid
            })).unwrap();
            if (response === transaction.transactionid) {
                toast.success("Transaction successfully deleted");
                refreshTransactions();
                onClose();
            } else {
                toast.error("Failed to delete transaction");
            }
        } catch (error) {
            console.error('Error deleting transaction:', error);
            toast.error('An error occurred while trying to delete the transaction.');
        }
    };

    if (!isOpen) return null;

    // Ensure the categories are correctly selected based on the type 
    const selectedCategories = formData.type === 'income' ? incomeCategories : expenseCategories;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center dark:bg-black  bg-white bg-opacity-95 overflow-auto">
            <div className="rounded-lg shadow-lg w-full max-w-md p-6 max-h-full mb-5">
                <h2 className="text-xl font-semibold mb-4">Update Transaction</h2>
                <form onSubmit={handleSubmit}>

                    {/* Type */}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="type" className="font-semibold mb-2">Type</label>
                        <select id="type" name="type" value={formData.type} onChange={handleTypeChange} className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none text-gray-900" >
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
                            name="transactiondate"
                            value={formData.transactiondate}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-900"
                            required
                        />
                    </div>

                    {/* Type */}

                    {/* Amount */}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="amount" className="font-semibold mb-2">Amount (MYR)</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-900"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="category" className="font-semibold mb-2">Category</label>
                        <select id="category" name="category" value={formData.category} onChange={handleInputChange} className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-900" >
                            {selectedCategories.map((c) => <option key={c.type} value={c.type}>{c.type}</option>)}
                        </select>
                    </div>

                    {/* Account
                    <div className="flex flex-col mb-4">
                        <label htmlFor="account" className="font-semibold mb-2">Account</label>
                        <input
                            type="text"
                            id="account"
                            name="account"
                            value={formData.account}
                            onChange={handleInputChange}
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
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
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
                            <img src={imagePreview} alt="Transaction" className="mt-2 rounded-md max-h-50" />
                        ) : (
                            <div className="flex items-center justify-center mt-2 text-gray-600">
                                <FaImage className="text-3xl mr-2" />
                                <span>No image available</span> </div>
                        )}
                    </div>

                    <div className="flex justify-center mt-5">
                        <button type="button" className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md" onClick={onClose}>Cancel</button>
                        <button type="submit" className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-md">Update</button>
                        <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleDelete}>Delete</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTransactionModal;
