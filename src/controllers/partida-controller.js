const repository = require('../repositories/partida-repository');
const API_V1_PATH = 'api/v1/partidas/';

exports.getAll = async (req, res, next) => {
    try {
        var data = await repository.getAll();
        
        let partidaAtual = 0;
        let response = [];
        let equipeAlpha = [];
        let equipeBravo =[];

        data.forEach(function(element, index) {
            if(element.partida_id != partidaAtual){
                if(partidaAtual == 0){
                    partidaAtual = element.partida_id;
                    if(element.equipe == "Alpha"){
                        equipeAlpha.push(element.nickname)
                    } else {
                        equipeBravo.push(element.nickname)
                    }
                } else {
                    response.push({
                        partida_id: partidaAtual,
                        alpha: equipeAlpha,
                        bravo: equipeBravo
                    });
                    partidaAtual = element.partida_id;
                    equipeAlpha = [];
                    equipeBravo = [];
                    if(element.equipe == "Alpha"){
                        equipeAlpha.push(element.nickname)
                    } else {
                        equipeBravo.push(element.nickname)
                    }
                }
            } else {
                if(element.equipe == "Alpha"){
                    equipeAlpha.push(element.nickname)
                } else {
                    equipeBravo.push(element.nickname)
                }

                if(index == data.length - 1){
                    response.push({
                        partida_id: partidaAtual,
                        alpha: equipeAlpha,
                        bravo: equipeBravo
                    });
                }
            }
        });
    
        return res.status(200).send(response);
    } catch (err) {
        res.status(404).send({error: err});
    }
};

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);

        if(data.length == 0) {
            return res.status(404).send({error: 'Partida inexistente :('});
        }

        let response = [];
        let equipeVencedores = [];
        let equipePerdedores = [];

        data.forEach(function(info) {
            if(info.resultado == "Vencedor") {
                equipeVencedores.push({
                    nickname: info.nickname,
                    abates: info.abates,
                    mortes: info.mortes,
                    headshots: info.headshots
                });
            } else {
                equipePerdedores.push({
                    nickname: info.nickname,
                    abates: info.abates,
                    mortes: info.mortes,
                    headshots: info.headshots
                });
            }
        });

        response.push({
            vencedores: equipeVencedores,
            perdedores: equipePerdedores
        });

        res.status(200).send(response);
    } catch(err) {
        res.status(500).send({error: err});
    }
};