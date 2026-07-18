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

const history = (registrationId) => {
    return api.get(
        `/register/${registrationId}/payments`
    );
};

export default {
  create,
  history,
};