import React from "react";

const TopPerformingProgramsTable = ({ programs = [] }) => {
    return (
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0">
                    Top Performing Programs (By Revenue)
                </h5>
            </div>

            <div className="table-responsive">
                <table className="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Program</th>
                            <th>Registrations</th>
                            <th className="text-end">
                                Revenue
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {programs.length > 0 ? (
                            programs.map((program, index) => (
                                <tr key={program.id}>
                                    <td>
                                        {index === 0 && "🥇"}
                                        {index === 1 && "🥈"}
                                        {index === 2 && "🥉"}
                                        {index > 2 && index + 1}
                                    </td>

                                    <td>{program.name}</td>

                                    <td>
                                        {program.registrations_count}
                                    </td>

                                    <td className="text-end fw-semibold text-success">
                                        ₹
                                        {Number(
                                            program.registrations_sum_amount
                                        ).toLocaleString("en-IN")}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center py-4"
                                >
                                    No data available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopPerformingProgramsTable;