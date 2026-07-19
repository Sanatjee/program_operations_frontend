import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RegistrationModal from '../../components/RegistrationModal';
import PaymentModal from '../../components/PaymentModal';
import Permission from '../../components/Permission';
import Toast from '../../components/Toast';
import DeleteModal from '../../components/DeleteModal';
import registrationService from '../../services/registrationService';
import paymentService from '../../services/paymentService';
import NoDataFound from '../../components/NoDataFound';
import PaymentHistoryModal from '../../components/PaymentHistoryModal';
import programService from '../../services/programService';

const Registrations = () => {
  const [program, setProgram] = useState(null);

  const [registrations, setRegistrations] = useState([]);

  const [pagination, setPagination] = useState({});

  const [selectedRegistration, setSelectedRegistration] = useState(null);

  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showPaymentHistoryModal, setShowPaymentHistoryModal] = useState(false);

  const [paymentHistory, setPaymentHistory] = useState([]);

  const [errors, setErrors] = useState({});

  const [searchParams] = useSearchParams();

  const [filters, setFilters] =
    useState({
      search: '',
      payment_status: '',
      page: 1,
      program_id: searchParams.get(
        'program_id'
      ),
    });


  const [successMessage, setSuccessMessage] = useState('');

  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  const loadProgram = async () => {
    if (!filters.program_id) return;

    const response = await programService.show(
      filters.program_id
    );

    setProgram(response.data.data);
  };

  const loadRegistrations = async () => {
    try {
      console.log("Registration called")
      const response = await registrationService.getRegistrations(filters);

      setRegistrations(
        response.data.data.data
      );

      setPagination(
        response.data.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  const saveRegistration = async (data) => {
    try {
      setErrors({});

      if (
        selectedRegistration
      ) {
        await registrationService.update(
          selectedRegistration.id,
          {
            amount: data.amount,
            payment_status: data.payment_status,
          }
        );

        setToast({
          show: true,
          message: "Registration updated successfully.",
          type: "success",
        });

      } else {
        await registrationService.create(
          data
        );
        setToast({
          show: true,
          message:
            'Registration created successfully.',
          type: 'success',
        });
      }
      setShowRegistrationModal(false);
      setSelectedRegistration(null);




      loadRegistrations();
    } catch (error) {
      if (
        error.response?.status === 422
      ) {
        setErrors(
          error.response.data
            .errors
        );
      } else {

        setToast({
          show: true,
          message: error.response?.data?.message ?? 'Something went wrong.',
          type: 'danger',
        });
      }
    }
  };

  const makePayment = async (data) => {
    try {

      const response = await paymentService.create(
        selectedRegistration.id,
        data
      );

      console.log(response);

      setShowPaymentModal(
        false
      );

      loadRegistrations();

      setToast({
        show: true,
        message: 'Payment updated successfully.',
        type: 'success',
      });
    } catch (error) {
      if (
        error.response?.status === 422
      ) {
        setErrors(
          error.response.data.errors
        );
      }
    }
  };

  const loadPaymentHistory = async (registrationId) => {
    try {

      const response = await paymentService.history(registrationId);

      setPaymentHistory(response.data.data);

      setShowPaymentHistoryModal(true);

    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = async () => {
    if (!selectedRegistration)
      return;

    try {
      await registrationService.destroy(
        selectedRegistration.id
      );

      setShowDeleteModal(false);
      setSelectedRegistration(
        null
      );

      setToast({
        show: true,
        message: 'Registration deleted successfully.',
        type: 'success',
      });
      loadRegistrations();
    } catch (error) {
      setToast({
        show: true,
        message: error.response?.data?.message ?? 'Failed to delete registration.',
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    loadProgram();
    loadRegistrations();
    //auto hiding the toast
    if (toast.show) {
      const timer =
        setTimeout(() => {
          setToast((prev) => ({
            ...prev,
            show: false,
          }));
        }, 3000);

      return () =>
        clearTimeout(timer);
    }
  }, [filters, toast.show]);

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      {program && (
        <div className="card mb-4">
          <div className="card-header">
            <h5>{program.name}</h5>
          </div>

          <div className="card-body">
            <div className="row">

              <div className="col-md-3">
                <strong>Code</strong>
                <p>{program.code}</p>
              </div>

              <div className="col-md-3">
                <strong>Coordinator</strong>
                <p>{program.coordinator}</p>
              </div>

              <div className="col-md-2">
                <strong>Mode</strong>
                <p>{program.mode}</p>
              </div>

              <div className="col-md-2">
                <strong>Fee</strong>
                <p>₹{program.fee}</p>
              </div>

              <div className="col-md-2">
                <strong>Status</strong>
                <p>{program.status}</p>
              </div>

              <div className="col-md-3">
                <strong>Start Date</strong>
                <p>{program.start_date}</p>
              </div>

              <div className="col-md-3">
                <strong>End Date</strong>
                <p>{program.end_date}</p>
              </div>

            </div>
          </div>
        </div>
      )}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">

            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Search learner..."
                value={filters.search}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    search: e.target.value,
                    page: 1,
                  })
                }
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={filters.payment_status}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    payment_status:
                      e.target.value,
                    page: 1,
                  })
                }
              >
                <option value="">
                  All Payments
                </option>

                <option value="pending">
                  Pending
                </option>

                <option value="partial">
                  Partial
                </option>

                <option value="paid">
                  Paid
                </option>
              </select>
            </div>

            <div className="col-md-2">
              <Permission permission="registration.create">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setShowRegistrationModal(
                      true
                    )
                  }
                >
                  <i className="bx bx-plus"></i>
                  <span>
                    Add Learner
                  </span>

                </button>
              </Permission>
            </div>

          </div>
        </div>
      </div>
      {/* Basic Bootstrap Table */}
      <div className="card">
        <h5 className="card-header">Registrations</h5>
        <div className="table-responsive text-nowrap">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {registrations.length > 0 ? (
                registrations.map((registration) => (
                  <tr key={registration.id}>
                    <td>{registration.user?.name}</td>

                    <td>{registration.user?.email}</td>

                    <td>₹{registration.amount}</td>

                    <td>
                      <span
                        className={`badge ${registration.payment_status === "paid"
                          ? "bg-label-success"
                          : registration.payment_status === "partial"
                            ? "bg-label-warning"
                            : "bg-label-danger"
                          }`}
                      >
                        {registration.payment_status}
                      </span>
                    </td>

                    <td>
                      <div className="d-flex gap-2">
                        <Permission permission="payment.create">
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => {
                              setSelectedRegistration(registration);
                              setShowPaymentModal(true);
                            }}
                          >
                            <i className="bx bx-rupee"></i>
                          </button>
                        </Permission>

                        <Permission permission="payment.view">
                          <button
                            className="btn btn-sm btn-outline-info"
                            onClick={() => {
                              setSelectedRegistration(registration);
                              loadPaymentHistory(registration.id);
                            }}
                          >
                            <i className="bx bx-history"></i>
                          </button>
                        </Permission>

                        <Permission permission="registration.edit">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => {
                              setErrors({});
                              setSelectedRegistration(registration);
                              setShowRegistrationModal(true);
                            }}
                          >
                            <i className="bx bx-edit"></i>
                          </button>
                        </Permission>

                        <Permission permission="registration.delete">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => {
                              setSelectedRegistration(registration);
                              setShowDeleteModal(true);
                            }}
                          >
                            <i className="bx bx-trash"></i>
                          </button>
                        </Permission>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-0">
                    <NoDataFound
                      title="No Registrations Found"
                      message="No learners have been registered yet."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {registrations.length > 0 &&
          <div className="demo-inline-spacing">
            {/* Basic Pagination */}
            <nav>
              <ul className="pagination justify-content-center">
                {Array.from(
                  {
                    length:
                      pagination.last_page || 1,
                  },
                  (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${pagination.current_page ===
                        i + 1
                        ? 'active'
                        : ''
                        }`}
                    >
                      <button
                        className="page-link"
                        onClick={() =>
                          setFilters({
                            ...filters,
                            page: i + 1,
                          })
                        }
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </nav>
            {/*/ Basic Pagination */}

            {/* Success Message */}
            <Toast
              show={toast.show}
              message={toast.message}
              type={toast.type}
              onClose={() =>
                setToast((prev) => ({
                  ...prev,
                  show: false,
                }))
              }
            />
            {/* Success Message */}
          </div>
        }


      </div>
      {/*/ Basic Bootstrap Table */}
      <RegistrationModal
        programId={filters.program_id}
        show={showRegistrationModal}
        registration={
          selectedRegistration
        }
        errors={errors}
        onClose={() => {
          setShowRegistrationModal(false);
          setSelectedRegistration(null);
        }}
        onSubmit={saveRegistration}
      />

      <PaymentModal
        show={showPaymentModal}
        errors={errors}
        registration={
          selectedRegistration
        }
        onClose={() =>
          setShowPaymentModal(false)
        }
        onSubmit={makePayment}
      />

      <PaymentHistoryModal
        show={showPaymentHistoryModal}
        registration={selectedRegistration}
        payments={paymentHistory}
        onClose={() => {
          setShowPaymentHistoryModal(false);
          setPaymentHistory([]);
        }}
      />

      <DeleteModal
        show={showDeleteModal}
        title="Delete Program"
        message={`Are you sure you want to delete registration for "${selectedRegistration?.user?.name}"?`}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedRegistration(null);
        }}
        onConfirm={confirmDelete}
      />

    </div>
  )
}

export default Registrations