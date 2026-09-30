import {input, number, confirm, select, checkbox, password} from '@inquirer/prompts'

const nome = await input({ message: 'qual é o seu nome?'}); 

const idade = await number({
    message: 'Idade?',
    min: 0,
    max: 120,
    required: true,
})
 
const ingresso = await confirm({
    message: 'Ingresso?',
    required: true,
})

const acompanhamento = await confirm({
    message: 'Acompanhado?',
    required: true,
})

console.log("Bem vindo", nome+"!");
