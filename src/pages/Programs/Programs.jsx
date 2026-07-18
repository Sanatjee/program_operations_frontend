import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import programService from '../../services/programService';
import ProgramModal from '../../components/ProgramModal';
import DeleteModal from '../../components/DeleteModal';
import Toast from '../../components/Toast';
import Permission from '../../components/Permission';
import NoDataFound from '../../components/NoDataFound';

const Programs = () => {

  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedProgram, setSelectedProgram] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [programs, setPrograms] = useState([]);

  const [pagination, setPagination] = useState({});

  const [errors, setErrors] = useState({});

  const [successMessage, setSuccessMessage] = useState('');

  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    mode: '',
    from_date: "",
    to_date: "",
    page: 1,
  });

  const loadPrograms = async () => {
    try {
      const response =
        await programService.getPrograms(
          filters
        );

      setPrograms(
        response.data.data.data
      );

      setPagination(
        response.data.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = () => {
    setErrors({});
    setSelectedProgram(null);
    setShowEditModal(true);
  };

  const saveProgram = async (data) => {
    try {
      setErrors({});

      if (selectedProgram) {
        await programService.update(
          selectedProgram.id,
          data
        );

        showToast(
          'Program updated successfully.',
          'success'
        );
      } else {
        await programService.create(
          data
        );

        showToast(
          'Program created successfully.',
          'success'
        );
      }

      closeProgramModal();

      loadPrograms();
    } catch (error) {
      if (
        error.response?.status === 422
      ) {
        setErrors(
          error.response.data.errors
        );
      } else {
        showToast(
          error.response?.data
            ?.message ??
          'Something went wrong.',
          'danger'
        );
      }
    }
  };

  const handleEdit = (program) => {
    setSelectedProgram(program);
    setShowEditModal(true);
  };

  const updateProgram = async (data) => {
    try {
      setErrors({});

      if (selectedProgram) {
        await programService.update(
          selectedProgram.id,
          data
        );
      } else {
        await programService.create(
          data
        );
      }

      setShowEditModal(false);
      setSelectedProgram(null);

      setToast({
        show: true,
        message:
          'Program updated successfully.',
        type: 'success',
      });

      loadPrograms();
    } catch (error) {
      if (
        error.response?.status === 422
      ) {
        setErrors(
          error.response.data.errors
        );
      } else {
        alert(
          error.response?.data
            ?.message ??
          'Something went wrong.'
        );
      }
    }
  };


  const handleDelete = (program) => {
    setSelectedProgram(program);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedProgram) return;

    try {
      await programService.destroy(
        selectedProgram.id
      );

      setShowDeleteModal(false);
      setSelectedProgram(null);
      setToast({
        show: true,
        message:
          'Program deleted successfully.',
        type: 'success',
      });
      loadPrograms();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ??
        'Failed to delete program.'
      );
    }
  };

  const closeProgramModal = () => {
    setShowEditModal(false);
    setSelectedProgram(null);
    setErrors({});
  };

  const navigate = useNavigate();

  const handleRegistrations = (program) => {
    navigate(
      `/registrations?program_id=${program.id}`
    );
  };

  useEffect(() => {
    loadPrograms();

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
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">

            <div className="col-md-2">
              <input
                className="form-control"
                placeholder="Search..."
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

            <div className="col-md-2">
              <select
                className="form-select"
                value={filters.status}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    status: e.target.value,
                    page: 1,
                  })
                }
              >
                <option value="">
                  All Status
                </option>

                <option value="active">
                  Active
                </option>

                <option value="inactive">
                  Inactive
                </option>
              </select>
            </div>

            <div className="col-md-2">
              <select
                className="form-select"
                value={filters.mode}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    mode: e.target.value,
                    page: 1,
                  })
                }
              >
                <option value="">
                  All Modes
                </option>

                <option value="ONLINE">
                  Online
                </option>

                <option value="OFFLINE">
                  Offline
                </option>

                <option value="HYBRID">
                  Hybrid
                </option>
              </select>
            </div>

            {/* From Date */}
  <div className="col-md-2">
    <input
      type="date"
      className="form-control"
      value={filters.from_date}
      onChange={(e) =>
        setFilters({
          ...filters,
          from_date: e.target.value,
          page: 1,
        })
      }
    />
  </div>

  {/* To Date */}
  <div className="col-md-2">
    <input
      type="date"
      className="form-control"
      value={filters.to_date}
      min={filters.from_date}
      onChange={(e) =>
        setFilters({
          ...filters,
          to_date: e.target.value,
          page: 1,
        })
      }
    />
  </div>

            <div className="col-md-2">
              <Permission permission="program.create">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleCreate}
                >
                  <i className="bx bx-plus me-1"></i>
                  Add Program
                </button>

              </Permission>
            </div>

          </div>
        </div>
      </div>
      {/* Basic Bootstrap Table */}
      <div className="card">
        <h5 className="card-header">Programs</h5>
        <div className="table-responsive text-nowrap">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Mode</th>
                <th>Date </th>
                <th>Fees </th>
                <th>Co-ordinator </th>
                <th>Status </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {programs.length > 0 ? (
                programs.map((program) => (
                  <tr key={program.id}>
                    <td>{program.name}</td>
                    <td>{program.code}</td>
                    <td>{program.mode}</td>
                    <td>{program.start_date} -{program.end_date}
                    </td>
                    <td>₹{program.fee}</td>
                    <td>{program.coordinator}</td>
                    <td>
                      <span
                        className={`badge ${program.status ===
                            'active'
                            ? 'bg-label-success'
                            : 'bg-label-danger'
                          }`}
                      >
                        {program.status}
                      </span>
                    </td>

                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        {/* Edit */}
                        <Permission permission="program.edit">
                          <button
                            className="btn btn-sm btn-icon btn-outline-primary"
                            title="Edit Program"
                            onClick={() => handleEdit(program)}
                          >
                            <i className="bx bx-edit-alt"></i>
                          </button>
                        </Permission>

                        {/* Delete */}
                        <Permission permission="program.delete">
                          <button
                            className="btn btn-sm btn-icon btn-outline-danger"
                            title="Delete Program"
                            onClick={() => handleDelete(program)}
                          >
                            <i className="bx bx-trash"></i>
                          </button>
                        </Permission>

                        {/* Registrations */}
                        <Permission permission="registration.view">
                          <button
                            className="btn btn-sm btn-icon btn-outline-info"
                            title="View Registrations"
                            onClick={() => handleRegistrations(program)}
                          >
                            <i className="bx bx-group"></i>
                          </button>
                        </Permission>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-0">
                    <NoDataFound
                      title="No Programs Found"
                      message="No programs have been created yet."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="demo-inline-spacing">
          {/* Basic Pagination */}
          {programs.length > 0 &&
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
          }
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


      </div>
      {/*/ Basic Bootstrap Table */}
      <ProgramModal
        show={showEditModal}
        onClose={closeProgramModal}
        onSubmit={updateProgram}
        program={selectedProgram}
        errors={errors}
      />

      <DeleteModal
        show={showDeleteModal}
        title="Delete Program"
        message={`Are you sure you want to delete "${selectedProgram?.name}"?`}
        onClose={() =>
          setShowDeleteModal(false)
        }
        onConfirm={confirmDelete}
      />
    </div>
  )
}

export default Programs