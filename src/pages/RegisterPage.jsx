import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("RegisterPage loaded");
    }, []);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            console.log("Attempting to register user with email:", email);
            await createUserWithEmailAndPassword(auth, email, password);
            toast.success("Successfully registered!");
            console.log("User registered, navigating to /login");
            navigate("/login");
        } catch (error) {
            console.error(`Error during sign up: ${error}`);
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <div className="isolate bg-foreground px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center text-foreground">
                <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Register</h2>
                <p className="mt-2 text-lg">Track today, thrive tomorrow.</p>
            </div>
            <form onSubmit={handleSignUp} method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2 text-foreground">
                        <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2 text-foreground">
                        <label htmlFor="password" className="block text-sm font-semibold">Password</label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="password"
                                required
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button type="submit"
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <p className="mt-10 text-center text-sm text-foreground">
                Already a member?
                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500"> Login Now</Link>
            </p>
        </div>
    );
}
