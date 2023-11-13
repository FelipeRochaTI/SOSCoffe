class Planos {
    static idCont = 0
    constructor(nome, valor) {
        this.id = this.idCont++
        this.nome = nome
        this.valor = valor
    }


}