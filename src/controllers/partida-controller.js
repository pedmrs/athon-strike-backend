const repository = require('../repositories/partida-repository');
const API_V1_PATH = 'api/v1/partidas/';

exports.getAll = async (req, res, next) => {
    try {
        var data = await repository.getAll();
    
        return res.status(200).send(data);
    } catch (err) {
        res.status(500).send({error: "err"});
    }
};

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);

        if(data.length == 0) {
            return res.status(404).send({error: 'Partida inexistente :('});
        }

        res.status(200).send(data);
    } catch(err) {
        res.status(500).send({error: err});
    }
};