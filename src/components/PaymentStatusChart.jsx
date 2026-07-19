import React from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const PaymentStatusChart = ({ data = {} }) => {

    const chartData = {
        labels: ["Paid", "Partial", "Pending"],
        datasets: [
            {
                data: [
                    data.paid ?? 0,
                    data.partial ?? 0,
                    data.pending ?? 0,
                ],
                backgroundColor: [
                    "#5B8DEF",
                    "#6FCF97",
                    "#F2C94C",
                    "#EB5757",
                    "#56CCF2",
                    "#BB6BD9",
                ],
                borderColor: "#ffffff",
                borderWidth: 2,
                hoverOffset: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: "bottom",
            },

            tooltip: {
                callbacks: {
                    label: function (context) {

                        const total =
                            context.dataset.data.reduce(
                                (a, b) => a + b,
                                0
                            );

                        const value = context.raw;

                        const percentage =
                            total === 0
                                ? 0
                                : (
                                    (value / total) *
                                    100
                                ).toFixed(1);

                        return `${context.label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },

        cutout: "65%",
    };

    return (
        <div className="card h-100">

            <div className="card-header">
                <h5 className="mb-0">
                    Payment Status
                </h5>
            </div>

            <div
                className="card-body"
                style={{ height: "350px" }}
            >
                <Doughnut
                    data={chartData}
                    options={options}
                />
            </div>

        </div>
    );
};

export default PaymentStatusChart;