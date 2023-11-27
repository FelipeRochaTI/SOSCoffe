class AssinaturaDTO {
  constructor(id_usuario, fk_id_planos, assinatura_ativa, data_inicio, data_fim) {
    this.id_usuario = id_usuario;
    this.fk_id_planos = fk_id_planos;
    this.assinatura_ativa = assinatura_ativa;
    this.data_inicio = data_inicio;
    this.data_fim = data_fim;
  }
}

module.exports = AssinaturaDTO;