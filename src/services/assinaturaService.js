const mysql = require('../mysql').pool;
const PlanoService = require('../services/planoService');

const planoService = new PlanoService();

class AssinaturaService {
  getAllAssinaturas(callback) {
    mysql.getConnection((error, conn) => {
      if (error) {
        return callback(error, null);
      }
      conn.query('SELECT * FROM assinatura;', (error, resultado, field) => {
        conn.release();
        if (error) {
          return callback(error, null);
        }
        return callback(null, resultado);
      });
    });
  }

  getAssinaturaById(id, callback) {
    mysql.getConnection((error, conn) => {
      if (error) {
        return callback(error, null);
      }
      conn.query(
        'SELECT * FROM assinatura WHERE id_assinatura = ?',
        [id],
        (error, resultado, field) => {
          conn.release();
          if (error) {
            return callback(error, null);
          }
          if (!resultado || resultado.length === 0) {
            return callback({ message: 'assinatura não encontrada' }, null);
          }
          return callback(null, resultado);
        }
      );
    });
  }

  getAssinaturasByUsuarioId(idUsuario, callback) {
    mysql.getConnection((error, conn) => {
      if (error) {
        return callback(error, null);
      }
      conn.query(
        'SELECT * FROM assinatura WHERE id_usuario = ?;',
        [idUsuario],
        (error, resultado, field) => {
          conn.release();
          if (error) {
            return callback(error, null);
          }
          if (!resultado || resultado.length === 0) {
            return callback({ message: 'Usuario não encontrado' }, null);
          }
          return callback(null, resultado);
        }
      );
    });
  }

  getAssinaturaAtivaByUsuarioId(idUsuario, callback) {
    mysql.getConnection((error, conn) => {
      if (error) {
        return callback(error, null);
      }
      conn.query(
        'SELECT * FROM assinatura WHERE id_usuario = ? AND assinatura_ativa = true;',
        [idUsuario],
        (error, resultado, field) => {
          conn.release();
          if (error) {
            return callback(error, null);
          }
          return callback(null, resultado && resultado.length > 0 ? resultado[0] : null);
        }
      );
    });
  }

  createAssinatura(assinaturaDTO, callback) {
    planoService.getPlanoById(assinaturaDTO.fk_id_planos, (error, plano) => {
      if (error) {
        return callback(error, null);
      }
  
      if (!plano) {
        return callback({ message: 'Plano não encontrado' }, null);
      }
      
      this.getAssinaturaAtivaByUsuarioId(assinaturaDTO.id_usuario, (error, assinaturaAtiva) => {
        if (error) {
          return callback(error, null);
        }
    
        if (assinaturaAtiva) {
          return callback({ message: 'Usuário já possui uma assinatura ativa' }, null);
        }
  
        mysql.getConnection((error, conn) => {
          if (error) {
            return callback(error, null);
          }
          conn.query(
            'INSERT INTO assinatura (id_usuario, fk_id_planos, assinatura_ativa, data_inicio, data_fim) VALUES (?,?,?,?,?)',
            [
              assinaturaDTO.id_usuario,
              assinaturaDTO.fk_id_planos,
              assinaturaDTO.assinatura_ativa,
              assinaturaDTO.data_inicio,
              assinaturaDTO.data_fim,
            ],
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
    });
  };

  cancelaAssinatura(assinaturaDTO, callback) {
    this.getAssinaturaAtivaByUsuarioId(assinaturaDTO.id_usuario, (error, assinaturaAtiva) => {
      
      if (error) {
        return callback(error, null);
      }

      if (!assinaturaAtiva) {
        return callback({ message: 'Usuário não possui uma assinatura ativa' }, null);
      }

      mysql.getConnection((error, conn) => {
        if (error) {
          return callback(error, null);
        }

        const dataAtual = new Date().toISOString().slice(0, 19).replace('T', ' ');

        conn.query(
          'UPDATE assinatura SET assinatura_ativa = false, data_fim = ? WHERE id_usuario = ? AND assinatura_ativa = true',
          [dataAtual, assinaturaDTO.id_usuario],
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

module.exports = AssinaturaService;