import React from "react";

const UpcomingProgramsTable = ({ programs = [] }) => {
    return (
        <div className="card">

            <div className="card-header">
                <h5 className="mb-0">
                    Upcoming Programs (Next 7 Days)
                </h5>
            </div>

            <div className="table-responsive">

                <table className="table table-hover mb-0">

                    <thead>

                        <tr>
                            <th>Program</th>
                            
                            <th>Mode</th>
                            
                            <th>Start Date</th>

                            <th>End Date</th>
                        
                        </tr>

                    </thead>

                    <tbody>

                        {programs.length > 0 ? (

                            programs.map(program => (

                                <tr key={program.id}>

                                    <td>{program.name}</td>


                                    <td>{program.mode}</td>


                                    <td>
                                        {new Date(
                                            program.start_date
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>
                                        {new Date(
                                            program.end_date
                                        ).toLocaleDateString()}
                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center py-4 text-muted"
                                >
                                    No upcoming programs.
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default UpcomingProgramsTable;