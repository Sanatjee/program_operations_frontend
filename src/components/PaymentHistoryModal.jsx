import React from "react";

const PaymentHistoryModal = ({
    show,
    onClose,
    payments = [],
    registration,
}) => {

    if (!show) return null;

    const totalPaid = payments.reduce(
        (sum, payment) => sum + Number(payment.amount),
        0
    );

    return (
        <>
            <div className="modal fade show d-block">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <div>
                                <h5 className="modal-title">
                                    Payment History
                                </h5>

                                <small className="text-muted">
                                    {registration?.user?.name}
                                </small>
                            </div>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>

                        <div className="modal-body">

                            <div className="row mb-3">

                                <div className="col-md-6">
                                    <strong>Program</strong>

                                    <div>
                                        {registration?.program?.name}
                                    </div>
                                </div>


                                <div className="col-md-6">
                                    <strong>Total Paid</strong>

                                    <div className="text-success">
                                        ₹{totalPaid}
                                    </div>
                                </div>

                            </div>

                            <div className="table-responsive">

                                <table className="table table-bordered table-hover">

                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Reference</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {payments.length > 0 ? (

                                            payments.map(
                                                (
                                                    payment,
                                                    index
                                                ) => (
                                                    <tr key={payment.id}>
                                                        <td>
                                                            {index + 1}
                                                        </td>

                                                        <td>
                                                            {new Date(
                                                                payment.paid_on
                                                            ).toLocaleDateString()}
                                                        </td>

                                                        <td>
                                                            ₹{payment.amount}
                                                        </td>

                                                        <td>
                                                            {payment.reference_no || "-"}
                                                        </td>

                                                        <td>
                                                            <span
                                                                className={`badge ${{
                                                                        pending: "bg-label-info",
                                                                        partial: "bg-label-warning",
                                                                        paid: "bg-label-success",
                                                                        success: "bg-label-success",
                                                                        failed: "bg-label-danger",
                                                                        refunded: "bg-label-secondary",
                                                                    }[payment.status] ?? "bg-label-dark"
                                                                    }`}
                                                            >
                                                                {{
                                                                    pending: "Pending",
                                                                    partial: "Partial",
                                                                    paid: "Paid",
                                                                    success: "Success",
                                                                    failed: "Failed",
                                                                    refunded: "Refunded",
                                                                }[payment.status] ?? payment.status}
                                                            </span>
                                                        </td>

                                                    </tr>
                                                )
                                            )

                                        ) : (

                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="text-center"
                                                >
                                                    No payment history found.
                                                </td>
                                            </tr>

                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Close
                            </button>

                        </div>

                    </div>
                </div>
            </div>

            <div className="modal-backdrop fade show"></div>
        </>
    );
};

export default PaymentHistoryModal;