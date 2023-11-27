const mysql = require('../mysql').pool;

class PlanoService {
  getAllPlanos(callback) {
    mysql.getConnection((error, conn) => {
      if (error) {
        return callback(error, null);
      }
      conn.query('SELECT * FROM planos;', (error, resultado, field) => {
        conn.release();
        if (error) {
          return callback(error, null);
        }
        return callback(null, resultado);
      });
    });
  }

  getPlanoById(id, callback) {
    mysql.getConnection((error, conn) => {
      if (error) {
        return callback(error, null);
      }
      conn.query(
        'SELECT * FROM planos WHERE id_planos = ?;',
        [id],
        (error, resultado, field) => {
          conn.release();
          if (error) {
            return callback(error, null);
          }
          if (!resultado || resultado.length === 0) {
            return callback({ message: 'Plano não encontrado' }, null);
          }
          return callback(null, resultado);
        }
      );
    });
  }

  createPlano(planoDTO, callback) {
    mysql.getConnection((error, conn) => {
      if (error) {
        return callback(error, null);
      }
      conn.query(
        'INSERT INTO planos (nome_plano, valor) VALUES (?,?)',
        [planoDTO.nomePlano, planoDTO.valor],
        (error, resultado, field) => {
          conn.release();
          if (error) {
            return callback(error, null);
          }
          return callback(null, resultado);
        }
      );
    });
  }

  updatePlano(id, planoDTO, callback) {
    this.getPlanoById(id, (error, existingPlano) => {
      if (error) {
        return callback (error,null);
      }
      
      if (!existingPlano) {
        return callback({message: 'Plano não encontrado'}, null);
      }

      mysql.getConnection((error, conn) => {
        conn.query(
          'UPDATE planos SET nome_plano = ?, valor = ? WHERE id_planos = ?',
          [planoDTO.nomePlano, planoDTO.valor, id],
          (error, resultado, field) => {
            conn.release();
            if (error) {
              return callback(error, null);
            }
            return callback(null, resultado);
          }
        );
      });
    });
  }

  deletePlano(id, callback) {
    this.getPlanoById(id, (error, existingPlano) => {
      if (error) {
        return callback (error,null);
      }
      
      if (!existingPlano) {
        return callback({message: 'Plano não encontrado'}, null);
      }
      
      mysql.getConnection((error, conn) => {
        if (error) {
          return callback(error, null);
        }
        conn.query(
          'DELETE FROM planos WHERE id_planos = ?',
          [id],
          (error, resultado, field) => {
            conn.release();
            if (error) {
              return callback(error, null);
            }
            return callback(null, resultado);
          }
        );
      });
    });
  }
}

module.exports = PlanoService;
