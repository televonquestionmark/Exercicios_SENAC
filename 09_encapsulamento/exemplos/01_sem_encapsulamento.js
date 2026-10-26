class Produto {
    constructor(nome, preco) {
        this.nome = nome;
        this.preco = preco;
    }
}

const produto = new Produto("Mouse", 50);

produto.preco = -100;

console.log(produto);