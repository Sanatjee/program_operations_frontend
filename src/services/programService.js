import api from '../api/axios';

const getPrograms = (params) => {
  return api.get('/programs', {
    params,
  });
};

const create = (data) => {
  return api.post('/programs', data);
};

const update = (id, data) => {
  return api.put(`/programs/${id}`, data);
};

const destroy = (id) => {
  return api.delete(`/programs/${id}`);
};

export default {
  getPrograms,
  create,
  update,
  destroy,
};