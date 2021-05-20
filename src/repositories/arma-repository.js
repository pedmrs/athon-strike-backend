const mysql = require('../database/mysql').pool;

exports.getAll = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if(err) {
            return res.status(500).send({error: err});
        }

        conn.query(
            'select a.* from Arma a',
            (error, result, fields) => {
                conn.release();

                if(error) {
                    return res.status(500).send({error: err});
                }

                if(result.length == 0) {
                    return res.status(404).send({error: 'Nenhuma arma encontrada :('});
                }

                const response = {
                    quantidade: result.length,
                    armas: result.map(arma => {
                        return {
                            nome: arma.nome,
                            danoCorpo : arma.danoCorpo,
                            danoCabeca: arma.danoCabeca,
                            url: 'http://localhost:3000/api/v1/armas/' + arma.arma_id
                            }
                    })
                }

                return res.status(200).send(response);
            }
        );
    });
};

exports.findById = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if(err) {
            return res.status(500).send({error: err});
        }

        conn.query(
            'select a.nome, a.danoCorpo, a.danoCabeca from Arma a where a.arma_id = ?',
            req.params.id,
            (error, result, fields) => {
                conn.release();

                if(error) {
                    return res.status(500).send({error: err});
                }

                if(result.length == 0) {
                    return res.status(404).send({error: 'Arma inexistente :('});
                }

                return res.status(200).send(result);
            }
        );
    });
};