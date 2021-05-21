const mysql = require('../database/mysql');

exports.getAll = async () => {
    const result = await mysql.execute('select a.* from Arma a');

    return result;
};

exports.getById = async (id) => {
    const result = await mysql.execute('select a.nome, a.danoCorpo, a.danoCabeca from Arma a where a.arma_id = ?', id);    
    
    return result;    
};