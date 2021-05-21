const repository = require('../repositories/arma-repository');

exports.getAll = async (req, res, next) => {
    try {
        var data = await repository.getAll();

        const response = {
            quantidade: data.length,
            armas: data.map(arma => {
                return {
                    nome: arma.nome,
                    danoCorpo : arma.danoCorpo,
                    danoCabeca: arma.danoCabeca,
                    url: 'http://localhost:3000/api/v1/armas/' + arma.arma_id
                }
            })
        };
    
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send({error: err});
    }
};

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);

        if(data.length == 0) {
            return res.status(404).send({error: 'Arma inexistente :('});
        }

        res.status(200).send(data);
    } catch(err) {
        res.status(500).send({error: err});
    }
};