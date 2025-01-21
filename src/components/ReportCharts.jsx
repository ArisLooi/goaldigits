import React from 'react';
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { Doughnut } from 'react-chartjs-2';
import useTransactions from '../features/transactions/useTransaction';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';

ChartJS.register(ArcElement, Tooltip, Legend);

const ReportCharts = ({ title }) => {
    const { total, chartData } = useTransactions(title.toLowerCase());

    return (
        <Card className={`text-${title === 'Income' ? 'green' : 'red'}-800 bg-transparent`}>
            <CardHeader className={`text-${title === 'Income' ? 'green' : 'red'}-700 shadow-none bg-transparent`}>
                <Typography variant='h4'>{title}</Typography>
            </CardHeader>
            <CardBody className="p-1 text-center">
                <Typography variant="h5">RM{total}</Typography>
                <Doughnut data={chartData} />
            </CardBody>
        </Card>
    );
};

export default ReportCharts;

