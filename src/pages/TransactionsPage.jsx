import React from 'react';
import ExpenseTracker from '../components/ExpenseTracker';

export default function TransactionsPage() {
    return (
        <div className="mx-auto mt-10 max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-center text-base/7 font-semibold text-indigo-600">Budget smarter, live freer.</h2>
            <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Your Transactions</p>
            <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-2 lg:grid-rows-3 ">

                {/* Expense Tracker */}
                <div className="relative lg:order-1 lg:row-span-2 min-h-[70rem] ">
                    <div className="absolute inset-x-10 bottom-0 top-10 ">
                        <ExpenseTracker />
                    </div>
                </div>

                {/* column */}
                <div className="relative lg:order-1 lg:row-span-2">
                    <div className="absolute inset-px rounded-lg"></div>
                    <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
                        <div className="absolute inset-x-10 bottom-0 top-10">

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
