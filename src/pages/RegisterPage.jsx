import React from 'react';
import ReportCharts from '../components/ReportCharts';
import { fetchTransactionsByUser } from '../features/transactions/transactionsSlice';

export default function ReportsPage({ transactions, refreshTransactions }) {
    const hasTransactions = transactions && transactions.length > 0;

    return (
        <div className="mx-auto mt-10 max-w-xs px-4 sm:max-w-lg sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-center text-base font-semibold text-indigo-600">Budget smarter, live freer.</h2>
            <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Your Stats
            </p>

            {hasTransactions ? (
                <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-2 lg:grid-rows-1">
                    {/* column 1 */}
                    <div className="bg-background p-4 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-autotext-foreground">
                        <div className="relative lg:row-span-2">
                            <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
                                <ReportCharts title="Income" />
                            </div>
                        </div>
                    </div>
                    {/* column 2 */}
                    <div className="bg-background p-4 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-autotext-foreground">
                        <div className="relative lg:row-span-2 min-h-[70rem]">
                            <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
                                <ReportCharts title="Expense" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-16 text-center text-lg font-medium text-gray-600">
                    <p>No transactions available.</p>
                    <p className="mt-2">Key in your transactions to start tracking your stats!</p>
                </div>
            )}
        </div>
    );
}
