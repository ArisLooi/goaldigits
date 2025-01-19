import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    ThemeProvider,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { incomeTheme, expenseTheme } from './theme';

const Details = ({ title }) => {
    const theme = title === 'Income' ? incomeTheme : expenseTheme;
    const chartConfig = theme.chartConfig; // Use chartConfig from the theme

    return (
        <ThemeProvider value={theme}>
            <Card className={theme.card.root}>
                <CardHeader className={theme.card.header}>
                    <Typography variant='h4'>{title}</Typography>
                </CardHeader>
                <CardBody className={theme.card.body}>
                    <Typography variant='h5'>RM50</Typography>
                    <Chart {...chartConfig} />
                </CardBody>
            </Card>
        </ThemeProvider>
    );
};

export default Details;

