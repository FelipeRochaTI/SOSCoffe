class Usuario {
    static idCont = 0
    constructor(nome, email) {
        this.id = this.idCont++
        this.nome = nome
        this.email = email
    }


}