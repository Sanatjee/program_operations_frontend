import api from '../api/axios';

const getRegistrations = (
  params
) => {
  return api.get(
    '/register/learner',
    {
      params,
    }
  );
};

const create = (data) => {
  return api.post(
    '/register/learner',
    data
  );
};

const update = (
  id,
  data
) => {
  return api.put(
    `/registrations/${id}`,
    data
  );
};

const destroy = (id) => {
  return api.delete(
    `/registrations/${id}`
  );
};

export default {
  getRegistrations,
  create,
  update,
  destroy,
};