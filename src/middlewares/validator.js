const schemas = require('./schemas');

const createProductValidator = ({ name }) => {
  const { error } = schemas.createProductSchema.validate({ name });

  if (error) {
    if (error.message.includes('characters')) {
      return { type: 'INVALID_VALUE', message: error.message };
    }
    return { type: 'REQUIRED_VALUE', message: error.message };
  }

  return { type: null, message: '' };
};

module.exports = { createProductValidator };
