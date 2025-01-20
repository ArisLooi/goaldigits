import React from 'react';
import ReportCharts from '../components/ReportCharts';
import ExpenseTracker from '../components/ExpenseTracker';

export default function BudgetsPage() {
    return (
        <div className="mx-auto mt-10 max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-center text-base font-semibold text-indigo-600">Budget smarter, live freer.</h2>
            <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Your Stats</p>
            <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-2 lg:grid-rows-3">

                {/* Charts column */}
                <div className="relative lg:row-span-2">
                    <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
                        <div className="absolute inset-0 p-4">
                            <ReportCharts title="Income" />
                            <ReportCharts title="Expense" />
                        </div>
                    </div>
                </div>

                {/* column*/}
                <div className="relative lg:row-span-2 min-h-[70rem]">
                    <div className="absolute inset-0 p-4">

                    </div>
                </div>
            </div>
        </div>
    );
}
