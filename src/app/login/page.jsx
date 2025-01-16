import React, { useContext, useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const auth = getAuth();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) navigate("/budgets");
    }, [currentUser, navigate]);


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setError(""); // Clear any previous error
        } catch (error) {
            console.error(error);
            setError("Invalid email or password. Please try again."); // Set error message
        }
    };
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 text-foreground">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleLogin} className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground">Email address</label>
                        <div className="mt-2">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-foreground">Password</label>
                            {/* <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div> */}
                        </div>
                        <div className="mt-2">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>

                </form>

                <p className="mt-10 text-center text-sm text-foreground">
                    Not a member?
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500"> Register Now</a>
                </p>
            </div>
        </div>
    );
}


