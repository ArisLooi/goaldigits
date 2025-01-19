import React from 'react';
import Details from '../../components/Details/Details';
import ExpenseTracker from '../../components/ExpenseTracker/ExpenseTracker';

export default function BudgetsPage() {
    return (
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-center text-base/7 font-semibold text-indigo-600">Budget smarter, live freer.</h2>
            <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">GoalDigits</p>
            <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">

                {/* Expense Tracker */}
                <div className="relative lg:order-2 lg:row-span-2">
                    <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
                    <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                        <div className="absolute inset-x-10 bottom-0 top-10">
                            <ExpenseTracker />
                        </div>
                    </div>
                    <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
                </div>

                {/* Income column */}
                <div className="relative lg:order-1 lg:row-span-2">
                    <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
                    <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                        <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                            <div className="absolute inset-x-10 bottom-0 top-10">
                                <Details title="Income" />
                            </div>
                        </div>
                    </div>
                    <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
                </div>

                {/* Expense Column */}
                <div className="relative lg:order-3 lg:row-span-2">
                    <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                    <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                        <div className="relative min-h-[30rem] w-full grow">
                            <div className="absolute inset-x-10 bottom-0 top-10">
                                <Details title="Expense" />
                            </div>
                        </div>
                    </div>
                    <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                </div>
            </div>
        </div>
    );
}
