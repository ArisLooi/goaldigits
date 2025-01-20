import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    ThemeProvider,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

const ReportCharts = ({ title }) => {
    const incomeTheme = {
        card: {
            root: "text-green-800 bg-transparent",
            header: "text-green-800 shadow-none bg-transparent",
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
            root: "text-red-800 bg-transparent",
            header: "text-red-700 shadow-none bg-transparent",
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

    const theme = title === 'Income' ? incomeTheme : expenseTheme;
    const chartConfig = theme.chartConfig; // Use chartConfig from the theme

    return (
        <ThemeProvider value={theme}>
            <Card className={theme.card.root}>
                <CardHeader className={theme.card.header}>
                    <Typography variant='h4'>{title}</Typography>
                </CardHeader>
                <CardBody className={theme.card.body}>
                    <Typography variant='h5'>Total: RM50</Typography>
                    <Chart {...chartConfig} />
                </CardBody>
            </Card>
        </ThemeProvider>
    );
};

export default ReportCharts;

