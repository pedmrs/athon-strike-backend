const repository = require('../repositories/ranking-repository');
const API_V1_PATH = 'api/v1/armas/';

exports.get = async (req, res, next) => {
    try {
        var data = await repository.getRanking(req.params.id);

        if(data.length == 0) {
            return res.status(404).send({error: 'Ranking indisponível'});
        }
    
        return res.status(200).send(data);
    } catch (err) {
        res.status(500).send({error: err});
    }
};