import inquirer from "inquirer";

let total = 0;
let qtdBarato = 0;
let qtdMedio = 0;
let qtdCaro = 0;

const resposta = await inquirer.prompt([
    {
    type:"input",
    name:"quantidade",
    message:"Quantos produtos?"        
    }
]);

const quantidade = Number(resposta.quantidade);

for(let i = 1; i <= quantidade; i++) {

const dados = await inquirer.prompt([
    {
    type:"input",
    name:"nome",
    message:`Nome do produto ${i}:`  
    },
    {
    type:"input",
    name:"preco",
    message:"Preço (R$):"  
    }     
]);

const preco = Number(dados.preco);
total += preco;

if(preco <= 50 ) {
console.log("Categoria: Barato");
qtdBarato++;
}
else if(preco <= 100){
console.log("Categoria: Médio")
qtdMedio++;    
}
else {
console.log("Categoria: Caro")
qtdCaro++;    
}
}
console.log("\n--- RESUMO ---"); 
console.log(`Total: R$ ${total.toFixed(2)}`); 
console.log(`Baratos: ${qtdBarato}`); 
console.log(`Médios: ${qtdMedio}`); 
console.log(`Caros: ${qtdCaro}`);

