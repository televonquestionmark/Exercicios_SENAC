class Aluno {
    // Declare o campo privado da nota
    #nota
    constructor(nome, nota) {
        this.nome = nome;
        this.#nota = nota
        // Inicialize a nota
    }

    apresentar() {
        // Apresente nome e nota
        console.log(`Aluno: ${this.nome}`);
        console.log(`Nota: ${this.#nota}/100`);
    }
}

const aluno1 = new Aluno("Jobervaldo", 80);

aluno1.nota = -2

aluno1.apresentar()
