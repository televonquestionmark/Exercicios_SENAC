
import { select, input, confirm } from "@inquirer/prompts";

async function menu() {
    const opcao = await select({
        message: "Escolha uma opção:",
        choices: [
            { name: "Cadastrar", value: 1 },
            { name: "Listar", value: 2 },
            { name: "Sair", value: 0 }
        ]
    });

    console.log(opcao);
}

menu();