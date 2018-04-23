// yup: lightweight object schema validation library
const yup = require('yup');

const schema = yup.object().shape({
  id: yup.number().integer().required(),
  name: yup.string().required(),
  address: yup.string().required(),
  latitude: yup.number().min(-90).max(90).required(),
  longitude: yup.number().min(-180).max(180).required()
});

module.exports = {
  schema
};
