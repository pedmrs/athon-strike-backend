const repository = require('../repositories/arma-repository');

exports.get = repository.getAll;
exports.getById = repository.findById;