const errorMap = {
  NOT_FOUND: 404,
  INVALID_VALUE: 422,
  REQUIRED_VALUE: 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = { errorMap, mapError };
