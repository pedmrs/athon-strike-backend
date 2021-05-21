const mysql = require('../database/mysql');

exports.getAll = async () => {
    const result = await mysql.execute(`select p.partida_id, e.nome as equipe, j.nickname
                                        from Partida p
                                        inner join PartidaJogador pj on pj.partida_id = p.partida_id
                                        inner join Jogador j on j.jogador_id = pj.jogador_id
                                        inner join Equipe e on e.equipe_id = pj.equipe_id
                                        order by p.partida_id, e.nome, j.nickname`);

    return result;
};

exports.getById = async (id) => {
    const result = await mysql.execute(`select case e.equipe_id
                                            when p.equipeVencedora_id then 'Vencedor'
                                            when p.equipePerdedora_id then 'Perdedor'
                                            else 'Erro' end resultado,
                                            e.nome as equipe, j.nickname, pj.abates, pj.mortes, pj.headshots
                                        from PartidaJogador pj
                                        inner join Equipe e on e.equipe_id = pj.equipe_id 
                                        inner join Partida p on p.partida_id = pj.partida_id
                                        inner join Jogador j on j.jogador_id = pj.jogador_id
                                        where p.partida_id = ?
                                        order by resultado desc, pj.abates desc, pj.mortes asc`,
                                        [id]);    
    
    return result;    
};