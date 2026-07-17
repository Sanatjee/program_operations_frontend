import React, {
  useState,
} from 'react';

const PaymentModal = ({
  show,
  onClose,
  onSubmit,
  registration,
  errors = {},
}) => {
  const [form, setForm] =
    useState({
      amount: '',
      reference_no: '',
      paid_on:
        new Date()
          .toISOString()
          .split('T')[0],
    });

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      registration_id:registration.id,
    });
  };

  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show"
        style={{
          display: 'block',
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">
                Make Payment
              </h5>

              <button
                className="btn-close"
                onClick={onClose}
              />
            </div>

            <form
              onSubmit={
                handleSubmit
              }
            >
              <div className="modal-body">

                <div className="mb-3">
                  <label className="form-label">
                    Learner
                  </label>

                  <input
                    className="form-control"
                    value={
                      registration
                        ?.user
                        ?.name || ''
                    }
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Program
                  </label>

                  <input
                    className="form-control"
                    value={
                      registration
                        ?.program
                        ?.name || ''
                    }
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Amount
                  </label>

                  <input
                    type="number"
                    name="amount"
                    className={`form-control ${
                      errors.amount
                        ? 'is-invalid'
                        : ''
                    }`}
                    value={
                      form.amount
                    }
                    onChange={
                      handleChange
                    }
                  />

                  {errors.amount && (
                    <div className="invalid-feedback">
                      {
                        errors.amount[0]
                      }
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Reference No
                  </label>

                  <input
                    name="reference_no"
                    className={`form-control ${
                      errors.reference_no
                        ? 'is-invalid'
                        : ''
                    }`}
                    value={
                      form.reference_no
                    }
                    onChange={
                      handleChange
                    }
                  />

                  {errors.reference_no && (
                    <div className="invalid-feedback">
                      {
                        errors.reference_no[0]
                      }
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Paid On
                  </label>

                  <input
                    type="date"
                    name="paid_on"
                    className="form-control"
                    value={
                      form.paid_on
                    }
                    onChange={
                      handleChange
                    }
                  />
                </div>

              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-label-secondary"
                  onClick={
                    onClose
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Save Payment
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default PaymentModal;