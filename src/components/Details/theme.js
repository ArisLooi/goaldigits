const incomeTheme = {
    card: {
        root: "text-green-800 bg-none",
        header: "text-green-800 shadow-none",
        body: "p-1 text-center",
    },
    chartConfig: {
        type: "pie",
        width: 280,
        height: 280,
        series: [44, 55, 13, 43, 22],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#4caf50", "#66bb6a", "#81c784", "#a5d6a7", "#c8e6c9"],
            legend: {
                show: true,
                position: "bottom",
            },
        },
    }
};

const expenseTheme = {
    card: {
        root: "text-red-800 bg-none",
        header: "text-red-700 shadow-none",
        body: "p-1 text-center",
    },
    chartConfig: {
        type: "pie",
        width: 280,
        height: 280,
        series: [44, 55, 13, 43, 22],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#f44336", "#e57373", "#ef9a9a", "#ffcdd2", "#ffebee"],
            legend: {
                show: true,
                position: "bottom",
            },

        },
    }
};

export { incomeTheme, expenseTheme };

