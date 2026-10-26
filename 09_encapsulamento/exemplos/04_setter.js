class Produto {
    #preco;

    constructor(nome, preco) {
        this.nome = nome;
        this.preco = preco;
    }

    moeda(valor){
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
    }

    get preco() {
        return this.#preco;
    }

    set preco(valor) {
        if (!Number.isFinite(valor) || valor < 0) {
            throw new Error("Preço inválido.");
        }

        this.#preco = valor;
    }
}

const produto = new Produto("Mouse", 50);

console.log(`Preço inicial: ${produto.moeda(produto.preco)}`);

produto.preco = 80;

console.log(`Novo preço: ${produto.moeda(produto.preco)}`);
