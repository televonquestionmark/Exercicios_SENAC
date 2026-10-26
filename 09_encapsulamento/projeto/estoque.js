import { select, input, confirm } from "@inquirer/prompts";

class Produto {
    #preco;
    #quantidade;

    constructor(codigo, nome, preco, quantidade) {
        if (!Number.isInteger(codigo) || codigo <= 0) {
            throw new Error("Código inválido.");
        }

        if (typeof nome !== "string" || !nome.trim()) {
            throw new Error("Nome inválido.");
        }

        this.codigo = codigo;
        this.nome = nome.trim();
        this.preco = preco;
        this.quantidade = quantidade;
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

    get quantidade() {
        return this.#quantidade;
    }

    set quantidade(valor) {
        if (!Number.isInteger(valor) || valor < 0) {
            throw new Error("Quantidade inválida.");
        }

        this.#quantidade = valor;
    }

    calcularTotal() {
        return this.#preco * this.#quantidade;
    }

    apresentar() {
        console.log(`Código: ${this.codigo}`);
        console.log(`Produto: ${this.nome}`);
        console.log(`Preço: R$ ${this.preco.toFixed(2)}`);
        console.log(`Quantidade: ${this.quantidade}`);
        console.log(`Total: R$ ${this.calcularTotal().toFixed(2)}`);
        console.log("-----------------------------");
    }
}

const produtos = [
    new Produto(101, "Mouse", 50, 10),
    new Produto(102, "Teclado", 80, 5),
    new Produto(103, "Monitor", 700, 2)
];

async function perguntarNumero(mensagem, validar) {
    const resposta = await input({
        message: mensagem,
        validate(valor) {
            const texto = valor.trim();
            const numero = Number(texto);

            if (!texto || !Number.isFinite(numero)) {
                return "Informe um número válido.";
            }

            return validar(numero)
                ? true
                : "Valor fora das regras permitidas.";
        }
    });

    return Number(resposta.trim());
}

async function cadastrarProduto() {
    const codigo = await perguntarNumero(
        "Código:",
        numero => Number.isInteger(numero) && numero > 0
    );

    if (produtos.some(p => p.codigo === codigo)) {
        console.log("Esse código já está cadastrado.");
        return;
    }

    const nome = (await input({
        message: "Nome:",
        validate(valor) {
            return valor.trim()
                ? true
                : "Informe um nome.";
        }
    })).trim();

    const preco = await perguntarNumero(
        "Preço (utilize ponto decimal):",
        numero => numero >= 0
    );

    const quantidade = await perguntarNumero(
        "Quantidade:",
        numero => Number.isInteger(numero) && numero >= 0
    );

    try {
        const produto = new Produto(
            codigo,
            nome,
            preco,
            quantidade
        );

        produtos.push(produto);
        console.log("Produto cadastrado!");
    } catch (erro) {
        console.log("Erro:", erro.message);
    }
}

function listarProdutos() {
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    produtos.forEach(produto => produto.apresentar());
}

async function localizarProduto() {
    const codigo = await perguntarNumero(
        "Informe o código:",
        numero => Number.isInteger(numero) && numero > 0
    );

    return produtos.find(produto => produto.codigo === codigo);
}

async function pesquisarProduto() {
    const produto = await localizarProduto();

    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }

    produto.apresentar();
}

async function atualizarProduto() {
    const produto = await localizarProduto();

    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }

    const campo = await select({
        message: "O que deseja atualizar?",
        choices: [
            { name: "Preço", value: "preco" },
            { name: "Quantidade", value: "quantidade" }
        ]
    });

    try {
        if (campo === "preco") {
            const valor = await perguntarNumero(
                "Novo preço:",
                numero => numero >= 0
            );

            produto.preco = valor;
        } else {
            const valor = await perguntarNumero(
                "Nova quantidade:",
                numero => Number.isInteger(numero) && numero >= 0
            );

            produto.quantidade = valor;
        }

        console.log("Produto atualizado!");
        produto.apresentar();
    } catch (erro) {
        console.log("Erro:", erro.message);
    }
}

async function excluirProduto() {
    const produto = await localizarProduto();

    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }

    const confirmar = await confirm({
        message: `Excluir ${produto.nome}?`,
        default: false
    });

    if (!confirmar) {
        console.log("Exclusão cancelada.");
        return;
    }

    const indice = produtos.indexOf(produto);
    produtos.splice(indice, 1);

    console.log("Produto excluído!");
}

function relatorioFinanceiro() {
    const total = produtos.reduce(
        (soma, produto) => soma + produto.calcularTotal(),
        0
    );

    console.log(`Total geral: R$ ${total.toFixed(2)}`);
}

async function menu() {
    let opcao;

    do {
        opcao = await select({
            message: "CONTROLE DE ESTOQUE",
            choices: [
                { name: "1. Cadastrar", value: 1 },
                { name: "2. Listar", value: 2 },
                { name: "3. Pesquisar", value: 3 },
                { name: "4. Atualizar", value: 4 },
                { name: "5. Excluir", value: 5 },
                { name: "6. Relatório", value: 6 },
                { name: "0. Sair", value: 0 }
            ]
        });

        switch (opcao) {
            case 1:
                await cadastrarProduto();
                break;
            case 2:
                listarProdutos();
                break;
            case 3:
                await pesquisarProduto();
                break;
            case 4:
                await atualizarProduto();
                break;
            case 5:
                await excluirProduto();
                break;
            case 6:
                relatorioFinanceiro();
                break;
            case 0:
                console.log("Encerrando o sistema.");
                break;
        }
    } while (opcao !== 0);
}

try {
    await menu();
} catch (erro) {
    if (erro.name === "ExitPromptError") {
        console.log("\nPrograma interrompido.");
    } else {
        console.error("Erro inesperado:", erro.message);
        process.exitCode = 1;
    }
}
