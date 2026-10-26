class Produto {
    #quantidade;

    constructor(nome, quantidade) {
        this.nome = nome;
        this.quantidade = quantidade;
    }

    get quantidade() {
        return this.#quantidade;
    }

    set quantidade(valor) {
        if (!Number.isInteger(valor) || valor < 0) {
            throw new Error("Quantidade inválida.");
        }

        this.#quantidade = valor;
    }
    apresentar() {
        console.log(`Produto: ${this.nome}`);
        console.log(`Preço: R$ ${this.#quantidade}`);
    }
}


const produto1 = new Produto ("LGTV_4K", 10)

produto1.apresentar()

produto1.quantidade = 20 

produto1.apresentar()

produto1.quantidade = -5 

produto1.apresentar()

produto1.quantidade = -2.5

produto1.apresentar()