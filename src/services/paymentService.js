import api from '../api/axios';

const create = (
  registrationId,
  data
) => {
  return api.post(
    `/register/${registrationId}/payments`,
    data
  );
};

export default {
  create,
};