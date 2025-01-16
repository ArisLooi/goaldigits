import React, { useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {

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

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res.user);
        } catch (error) {
            console.error(error);
            setError("Unable to sign up. Please try again.")
        };
    };



    return (
        <div className="isolate bg-foreground px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center text-foreground">
                <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Register</h2>
                <p className="mt-2 text-lg ">Track today, thrive tomorrow.</p>
            </div>
            <form onSubmit={handleSignUp} method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    {/* <div className="sm:col-span-2 text-foreground">
                        <label htmlFor="username" className="block text-sm font-semibold ">Your name</label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="given-name"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div> */}

                    <div className="sm:col-span-2 text-foreground">
                        <label htmlFor="email" className="block text-sm font-semibold ">Email</label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2 text-foreground">
                        <label htmlFor="password" className="block text-sm font-semibold ">Password</label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="password"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>
                    {/* <div className="sm:col-span-2 text-foreground">
                        <label htmlFor="phone-number" className="block text-sm font-semibold ">Phone number</label>
                        <div className="mt-2.5">
                            <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                <div className="grid shrink-0 grid-cols-1 relative">
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country"
                                        aria-label="Country"
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pl-3.5 pr-7 text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                    >
                                        <option>US</option>
                                        <option>MYR</option>
                                        <option>SG</option>
                                    </select>
                                    <svg
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 h-5 w-5 self-center justify-self-end text-gray-500 sm:h-4 sm:w-4"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    name="phone-number"
                                    id="phone-number"
                                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm"
                                    placeholder="123-456-7890"
                                />
                            </div>
                        </div>
                    </div> */}

                    <div className="flex gap-x-4 sm:col-span-2 text-foreground">
                        <div className="flex h-6 items-center">
                            <button
                                type="button"
                                className="flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                role="switch"
                                aria-checked="false"
                                aria-labelledby="switch-1-label"
                            >
                                <span className="sr-only">Agree to policies</span>
                                <span
                                    aria-hidden="true"
                                    className="h-4 w-4 translate-x-0 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                                ></span>
                            </button>
                        </div>
                        <label className="text-sm" id="switch-1-label">
                            By selecting this, you agree to our{' '}
                            <a href="#" className="font-semibold text-indigo-600">
                                privacy&nbsp;policy
                            </a>
                            .
                        </label>
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
        </div>
    );
};
