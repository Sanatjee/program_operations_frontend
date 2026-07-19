import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

const MonthlyRevenueChart = ({ data = [] }) => {

    const labels = data.map(item =>
        new Date(item.month + "-01").toLocaleString("default", {
            month: "short",
            year: "numeric",
        })
    );

    const chartData = {
        labels,
        datasets: [
            {
                label: "Revenue Collection (₹)",
                data: data.map(item => item.total),

                backgroundColor: [
                    "#696cff",
                    "#71dd37",
                    "#03c3ec",
                    "#ffab00",
                    "#ff3e1d",
                    "#8592a3",
                    "#233446",
                    "#e83e8c",
                    "#20c997",
                    "#6610f2",
                    "#fd7e14",
                    "#198754",
                ],

                borderRadius: 6,
                borderSkipped: false,
            },
        ],
    };

    const options = {
        responsive: true,

        plugins: {
            legend: {
                display: false,
            },
        },

        scales: {
            y: {
                beginAtZero: true,

                ticks: {
                    callback: value => "₹" + value,
                },
            },
        },
    };

    return (
         <div className="card">
            <div className="card-header">
                <h5 className="mb-0">Revenue Collection (Monthly)</h5>
            </div>

            <div
                className="card-body" 
                
            >
                <Bar
                    data={chartData}
                    options={options}
                />
            </div>
        </div>
    );
};

export default MonthlyRevenueChart;