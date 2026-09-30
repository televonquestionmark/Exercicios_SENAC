// import {input} from '@inquirer/prompts'
// import {input, number} from '@inquirer/prompts'
import {input, number, confirm, select, checkbox, password} from '@inquirer/prompts'

const nome = await input({ message: 'qual é o seu nome?'}); 

const idade = await number({
    message: 'Idade?',
    min: 0,
    max: 120,
    required: true,
})

// let idade_depois = idade + 1






console.log("Bem vindo", nome+"!");
// console.log("Ano que vem vc tera: ", idade_depois+" anos.");
// console.log(resultado)




