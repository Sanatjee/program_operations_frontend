import React, {
  useEffect,
  useState,
} from 'react';

const RegistrationModal = ({
  show,
  onClose,
  onSubmit,
  registration,
  programId,
  errors = {},
}) => {
  const initialState = {
    name: '',
    email: '',
    phone: '',
    amount: '',
    reference_no: '',
    payment_status: "pending",
    program_id: programId,
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (registration) {
      setForm({
        name: registration.user?.name || '',
        email: registration.user?.email || '',
        phone: registration.user?.phone || '',
        amount: registration.amount || '', reference_no: '',
        payment_status: registration.payment_status || "pending",
        reference_no: "",
        program_id: registration.program_id, });
    } else {
      setForm({
        ...initialState,
        program_id: programId || '',
      });
    }
  }, [registration, programId]);

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
    onSubmit(form);
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
                {registration
                  ? 'Edit Registration'
                  : 'Register Learner'}
              </h5>

              <button className="btn-close" onClick={onClose} />
            </div>

            <form onSubmit={ handleSubmit } >
              <div className="modal-body">

                <div className="mb-3">
                  <label className="form-label">
                    Name
                  </label>

                  <input
                    className={`form-control ${ errors.name ? 'is-invalid' : '' }`}
                    name="name"
                    value={ form.name }
                    disabled={!!registration}
                    onChange={
                      handleChange
                    }
                  />

                  {errors.name && (
                    <div className="invalid-feedback">
                      {
                        errors.name[0]
                      }
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    className={`form-control ${ errors.email ? 'is-invalid' : '' }`}
                    name="email"
                    value={ form.email }
                    disabled={!!registration}
                    onChange={
                      handleChange
                    }
                  />

                  {errors.email && (
                    <div className="invalid-feedback">
                      {
                        errors.email[0]
                      }
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Phone
                  </label>

                  <input className={`form-control ${ errors.phone ? 'is-invalid' : '' }`}
                    name="phone"
                    value={ form.phone }
                    disabled={!!registration}
                    onChange={
                      handleChange
                    }
                  />

                  {errors.phone && (
                    <div className="invalid-feedback">
                      {
                        errors.phone[0]
                      }
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    {registration ? "Amount" : "Initial Amount"}
                  </label>

                  <input type="number" className={`form-control ${ errors.amount ? 'is-invalid' : '' }`}
                    name="amount"
                    value={ form.amount }
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
                
                { !registration && 
                <div className="mb-3">
                  <label className="form-label">
                    Reference No
                  </label>

                  <input className={`form-control ${ errors.reference_no ? 'is-invalid' : '' }`}
                    name="reference_no"
                    value={ form.reference_no }
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
                }

                {registration && (
                  <div className="mb-3">
                    <label className="form-label">
                      Payment Status
                    </label>

                    <select
                      name="payment_status"
                      className={`form-select ${
                        errors.payment_status ? "is-invalid" : ""
                      }`}
                      value={form.payment_status}
                      onChange={handleChange}
                    >
                      <option value="pending">Pending</option>
                      <option value="partial">Partial</option>
                      <option value="paid">Paid</option>
                    </select>

                    {errors.payment_status && (
                      <div className="invalid-feedback">
                        {errors.payment_status[0]}
                      </div>
                    )}
                  </div>
                )}
                

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
                  className="btn btn-primary"
                >
                  {registration
                    ? 'Update'
                    : 'Register'}
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

export default RegistrationModal;