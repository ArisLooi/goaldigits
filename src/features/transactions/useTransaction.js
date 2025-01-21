import { useSelector } from 'react-redux';
import { incomeCategories, expenseCategories, resetCategories } from '../../assets/utils/categories';

const useTransactions = (title) => {
    const { transactions } = useSelector((state) => state.transactions);
    resetCategories();

    // Filter transactions by type
    const rightTransactions = transactions.filter((t) => t.type === title);

    // Calculate the total by ensuring amounts are numbers
    const total = rightTransactions.reduce((acc, currVal) => acc += parseFloat(currVal.amount), 0).toLocaleString();

    // Select categories based on title
    const categories = title === 'income' ? incomeCategories : expenseCategories;

    // Aggregate amounts by category
    rightTransactions.forEach((t) => {
        const category = categories.find((c) => c.type === t.category);
        if (category) category.amount += parseFloat(t.amount);
    });

    // Filter categories with amount > 0
    const filteredCategories = categories.filter((sc) => sc.amount > 0);

    // Prepare chart data
    const chartData = {
        datasets: [{
            data: filteredCategories.map((c) => c.amount),
            backgroundColor: filteredCategories.map((c) => c.color),
        }],
        labels: filteredCategories.map((c) => c.type),
    };

    // Debugging logs 
    console.log("Title:", title);
    console.log("Transactions:", transactions);
    console.log("Filtered Transactions:", rightTransactions);
    console.log("Total:", total);
    console.log("Categories:", categories);
    console.log("Filtered Categories:", filteredCategories);
    console.log("ChartData:", chartData);

    return { filteredCategories, total, chartData };
};

export default useTransactions;
