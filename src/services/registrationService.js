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
    `/register/learner/${id}`,
    data
  );
};

const destroy = (id) => {
  return api.delete(
    `/register/learner/${id}`
  );
};

export default {
  getRegistrations,
  create,
  update,
  destroy,
};