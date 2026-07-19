import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    Title
);

const ProgramRegistrationChart = ({ data = [] }) => {

    // Remove programs with 0 registrations
    const filtered = data.filter(
        (item) => item.registrations_count > 0
    );

    const colors = [
        "#696CFF", // Indigo
        "#71DD37", // Green
        "#03C3EC", // Cyan
        "#FFAB00", // Orange
        "#FF3E1D", // Red
        "#8592A3", // Gray
        "#8E44AD", // Purple
        "#1ABC9C", // Teal
        "#E91E63", // Pink
        "#3498DB", // Blue
    ];

    const chartData = {
        labels: filtered.map((item) => item.name),
        datasets: [
            {
                label: "Registrations",
                data: filtered.map((item) => item.registrations_count),
                backgroundColor: filtered.map(
                    (_, index) => colors[index % colors.length]
                ),
                borderColor: filtered.map(
                    (_, index) => colors[index % colors.length]
                ),
                borderWidth: 1,
                borderRadius: 6,
                borderSkipped: false,
            },
        ],
    };

    const options = {
        indexAxis: "y", // Horizontal Bar Chart

        responsive: true,

        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false,
            },

            title: {
                display: true,
                font: {
                    size: 18,
                },
            },

            tooltip: {
                callbacks: {
                    label: (context) =>
                        `${context.raw} Registrations`,
                },
            },
        },

        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
                title: {
                    display: true,
                    text: "Number of Registrations",
                },
                grid: {
                    color: "#e9ecef",
                },
            },

            y: {
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0">
                    Program-wise Registrations
                </h5>
            </div>

            <div
                className="card-body"
                style={{ height: `${Math.max(filtered.length * 45, 300)}px` }}
            >
                {filtered.length > 0 ? (
                    <Bar
                        data={chartData}
                        options={options}
                    />
                ) : (
                    <div className="text-center mt-5">
                        No registrations found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProgramRegistrationChart;