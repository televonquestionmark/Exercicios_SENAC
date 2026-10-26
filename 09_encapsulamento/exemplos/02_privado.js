class Produto {
    #preco;

    constructor(nome, preco) {
        this.nome = nome;
        this.#preco = preco;
    }

    apresentar() {
        console.log(`Produto: ${this.nome}`);
        console.log(`Preço: R$ ${this.#preco}`);
    }
}

const produto1 = new Produto("Teclado", 80);

produto1.preco = -100;

produto1.apresentar();
