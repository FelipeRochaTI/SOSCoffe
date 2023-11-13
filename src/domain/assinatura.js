class Assinatura {
    static idCont = 0
    constructor(idPalno, idUsuario, assinatura = true, dataVencimento, dataCancelamento = -1) {
        this.id = this.idCont++
        this.idPlano = idPalno
        this.idUsuario = idUsuario
        this.assinatura = assinatura
        this.dataComeco = new Date()
        this.dataVencimento = dataVencimento
        this.dataCancelamento = dataCancelamento
    }


}