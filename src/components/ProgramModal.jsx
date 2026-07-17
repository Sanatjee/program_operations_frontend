import React, { useEffect, useState, } from 'react';

const initialState = {
  name: '',
  code: '',
  mode: 'ONLINE',
  start_date: '',
  end_date: '',
  fee: '',
  coordinator: '',
  status: 'active',
};

const ProgramModal = ({
  show,
  onClose,
  onSubmit,
  program = null,
  errors
}) => {
  const [form, setForm] =
    useState(initialState);

  useEffect(() => {
    if (program) {
      setForm({
        name: program.name || '',
        code: program.code || '',
        mode: program.mode || 'ONLINE',
        start_date:
          program.start_date || '',
        end_date:
          program.end_date || '',
        fee: program.fee || '',
        coordinator:
          program.coordinator || '',
        status:
          program.status || 'active',
      });
    } else {
      setForm(initialState);
    }
  }, [program, show]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
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
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {program
                  ? 'Edit Program'
                  : 'Create Program'}
              </h5>

              <button
                type="button"
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
                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label>
                      Name
                    </label>

                    <input type="text" name="name" 
                      className={`form-control ${ errors?.name ? 'is-invalid' : '' }`}
                      value={ form.name }
                      onChange={
                        handleChange
                      }
                    />
                    {
                        errors?.name && (
                            <div className="invalid-feedback">
                                {errors.name[0]}
                            </div>
                        )
                    }
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>
                      Code
                    </label>

                    <input type="text" name="code" 
                    className={`form-control ${ errors?.code ? 'is-invalid' : '' }`}
                    value={ form.code }
                      onChange={
                        handleChange
                      }
                    />
                    {
                        errors?.code && (
                            <div className="invalid-feedback">
                                {errors.code[0]}
                            </div>
                        )
                    }
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>
                      Mode
                    </label>

                    <select name="mode" className="form-select" value={ form.mode }
                      onChange={
                        handleChange
                      }
                    >
                      <option value="ONLINE">
                        ONLINE
                      </option>

                      <option value="OFFLINE">
                        OFFLINE
                      </option>

                      <option value="HYBRID">
                        HYBRID
                      </option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>
                      Coordinator
                    </label>

                    <input type="text" name="coordinator" 
                    className={`form-control ${ errors?.coordinator ? 'is-invalid' : '' }`}
                    value={ form.coordinator }
                      onChange={
                        handleChange
                      }
                    />
                    {
                        errors?.coordinator && (
                            <div className="invalid-feedback">
                                {errors.coordinator[0]}
                            </div>
                        )
                    }
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>
                      Start Date
                    </label>

                    <input
                      type="date"
                      name="start_date"
                      className={`form-control ${ errors?.start_date ? 'is-invalid' : '' }`}
                      value={
                        form.start_date
                      }
                      onChange={
                        handleChange
                      }
                    />
                    {
                        errors?.start_date && (
                            <div className="invalid-feedback">
                                {errors.start_date[0]}
                            </div>
                        )
                    }
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>
                      End Date
                    </label>

                    <input
                      type="date"
                      name="end_date"
                      className={`form-control ${ errors?.end_date ? 'is-invalid' : '' }`}
                      value={
                        form.end_date
                      }
                      onChange={
                        handleChange
                      }
                    />
                    {
                        errors?.end_date && (
                            <div className="invalid-feedback">
                                {errors.end_date[0]}
                            </div>
                        )
                    }
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>
                      Fee
                    </label>

                    <input
                      type="number"
                      name="fee"
                      className={`form-control ${ errors?.fee ? 'is-invalid' : '' }`}
                      value={
                        form.fee
                      }
                      onChange={
                        handleChange
                      }
                    />
                    {
                        errors?.fee && (
                            <div className="invalid-feedback">
                                {errors.fee[0]}
                            </div>
                        )
                    }
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>
                      Status
                    </label>

                    <select
                      name="status"
                      className="form-select"
                      value={
                        form.status
                      }
                      onChange={
                        handleChange
                      }
                    >
                      <option value="active">
                        Active
                      </option>

                      <option value="inactive">
                        Inactive
                      </option>
                    </select>
                  </div>
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
                  className="btn btn-primary"
                >
                  {program
                    ? 'Update'
                    : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" />
    </>
  );
};

export default ProgramModal;