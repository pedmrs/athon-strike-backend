const mysql = require('../database/mysql');

exports.getRanking = async (id) => {
    const result = await mysql.execute(`select j.nickname, mmr.pontos from MMR mmr
                                        inner join Jogador j on j.jogador_id = mmr.jogador_id
                                        inner join ModoDeJogo mdj on mdj.modoDeJogo_id = mmr.modoDeJogo_id
                                        where mdj.modoDeJogo_id = ?
                                        order by mmr.pontos desc
                                        limit 10`,
                                        [id]);

    return result;
};