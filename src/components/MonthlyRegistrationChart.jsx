import {
    Line
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const MonthlyRegistrationChart = ({ data = [] }) => {

    const chartData = {
        labels: data.map(item =>
            new Date(item.month + "-01").toLocaleString("default", {
                month: "short",
                year: "2-digit",
            })
        ),
        datasets: [
            {
                label: "Registrations",
                data: data.map(item => item.total),
                borderColor: "#696cff",
                backgroundColor: "rgba(105,108,255,0.15)",
                pointBackgroundColor: "#696cff",
                pointBorderColor: "#696cff",
                pointRadius: 5,
                pointHoverRadius: 7,
                borderWidth: 3,
                tension: 0.4, // Smooth curve
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
            },
        },
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0">Registration Trend (Monthly)</h5>
            </div>

            <div
                className="card-body"
                style={{ height: "400px" }}
            >
                <Line
                    data={chartData}
                    options={options}
                />
            </div>
        </div>
    );
};

export default MonthlyRegistrationChart;