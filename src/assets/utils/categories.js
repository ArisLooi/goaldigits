export const categories = {
    income: [
        { type: 'Business' },
        { type: 'Investments' },
        { type: 'Extra income' },
        { type: 'Deposits' },
        { type: 'Lottery' },
        { type: 'Gifts' },
        { type: 'Salary' },
        { type: 'Savings' },
        { type: 'Rental income' },
    ],
    expense: [
        { type: 'Bills' },
        { type: 'Car' },
        { type: 'Clothes' },
        { type: 'Travel' },
        { type: 'Food' },
        { type: 'Shopping' },
        { type: 'House' },
        { type: 'Entertainment' },
        { type: 'Phone' },
        { type: 'Pets' },
        { type: 'Other' },
    ],
};

export const resetCategories = (categories) => {
    Object.values(categories).forEach((group) =>
        group.forEach((c) => (c.amount = 0))
    );
};
