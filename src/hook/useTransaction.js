import { useSelector } from 'react-redux';
import { categories, resetCategories } from '../assets/utils/categories';
import chartColors from '../assets/utils/chartColors';

const useTransactions = (type) => {
    const { transactions } = useSelector((state) => state.transactions);
    const categoryGroup = categories[type];
    const colorGroup = chartColors[type];

    resetCategories(categories);

    const filteredTransactions = transactions.filter((t) => t.type === type);
    const total = filteredTransactions.reduce((acc, curr) => acc + parseFloat(curr.amount), 0).toLocaleString();

    filteredTransactions.forEach((t) => {
        const category = categoryGroup.find((c) => c.type === t.category);
        if (category) category.amount = (category.amount || 0) + parseFloat(t.amount);
    });

    const filteredCategories = categoryGroup
        .map((c, idx) => ({ ...c, color: colorGroup[idx], amount: c.amount || 0 }))
        .filter((c) => c.amount > 0);

    const chartData = {
        datasets: [{
            data: filteredCategories.map((c) => c.amount),
            backgroundColor: filteredCategories.map((c) => c.color),
        }],
        labels: filteredCategories.map((c) => c.type),
    };

    return { filteredCategories, total, chartData };
};

export default useTransactions;
