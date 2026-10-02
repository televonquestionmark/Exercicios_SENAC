import {input, number, confirm, select, checkbox, password} from '@inquirer/prompts'

const valor_total = await number({
    message:"valor total da compra ->",
    min:0

})

const forma_pgto = await select ({
    message: 'Escolha a forma de pagamento',
    choices:[
        {name: 'PIX(10%)', value: 'pix'},
        {name: 'Cartão à vista (5%)', value: 'avista'},
        {name: 'Cartão Parcelado', value: 'parcelado'}
    ]
});


let valor_descontado = 0;


switch (forma_pgto) {
    default:
        console.log("Opção invalida")
        break;
    case 'pix':
         valor_descontado = valor_total * 0.9
        break;
    case 'avista':
        valor_descontado = valor_total * 0.95
        break;
    case 'parcelado':;
        valor_descontado = valor_total * 1
        break;
}

console.log(`O valor da compra é de R$ ${valor_descontado}`);