'use strict'

const limparFormulario = (endereco) => {
    document.getElementById('endereco').value = ""
    document.getElementById('bairro').value = ""
    document.getElementById('cidade').value = ""
    document.getElementById('estado').value = ""
}

const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro
    document.getElementById('bairro').value = endereco.bairro
    document.getElementById('cidade').value = endereco.localidade
    document.getElementById('estado').value = endereco.uf
}

// Validando se o CEP tem 8 dígitos e é composto apenas por números
const isNumber = (numero) => /^[0-9]+$/.test(numero)

const cepValido = (cep) => cep.length == 8 && isNumber(cep)

// 1a forma 
// const pesquisarCep = () => {
//     const cep = document.getElementById('cep').value
//     const url = `http://viacep.com.br/ws/${cep}/json/`

//     fetch(url).then(response => response.json()).then(console.log)
// }

// 2a forma 
const pesquisarCep = async() => {
    limparFormulario();
    
    const cep = document.getElementById('cep').value.replace("-","");
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        const promessa = await fetch(url);
        const endereco = await promessa.json();
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'CEP não encontrado!';
        }else {
            preencherFormulario(endereco);
        }
    }else{
        document.getElementById('endereco').value = 'CEP incorreto!';
    }
}


document.getElementById('cep').addEventListener('focusout', pesquisarCep)