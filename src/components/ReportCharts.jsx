import React from 'react';
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";

const ReportCharts = ({ title }) => {
    const isIncome = title === 'Income';

    const theme = {
        card: {
            root: `text-${isIncome ? 'green' : 'red'}-800 bg-transparent`,
            header: `text-${isIncome ? 'green' : 'red'}-700 shadow-none bg-transparent`,
            body: "p-1 text-center",
        },
        chartConfig: {
            type: "pie",
            width: 280,
            height: 280,
            series: [44, 55, 13, 43, 22],
            options: {
                chart: { toolbar: { show: false } },
                title: { show: false },
                dataLabels: { enabled: false },
                colors: isIncome
                    ? ["#4caf50", "#66bb6a", "#81c784", "#a5d6a7", "#c8e6c9"]
                    : ["#f44336", "#e57373", "#ef9a9a", "#ffcdd2", "#ffebee"],
                legend: { show: true, position: "bottom" },
            },
        },
    };

    return (
        <Card className={theme.card.root}>
            <CardHeader className={theme.card.header}>
                <Typography variant='h4'>{title}</Typography>
            </CardHeader>
            <CardBody className={theme.card.body}>
                <Typography variant='h5' className={`text-${isIncome ? 'green' : 'red'}-600`}>Total: RM50</Typography>
                <Chart {...theme.chartConfig} />
            </CardBody>
        </Card>
    );
};

export default ReportCharts;


