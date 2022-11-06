async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');

        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro);
    }
}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));




// SEM ASYNC & AWAIT

//CALLBACK HELL
// var consultaCEP = fetch('https://viacep.com.br/ws/62370-000/json/')
//     .then(response => response.json())
//     .then(r => {
//         if(r.erro){
//             throw Error('Esse CEP não existe!'); 
//         }else{
//             console.table(r)
//         }
//     }) 
//     .catch(erro => console.log(erro))
//     .finally(mensagem => console.log('Processamento Concluído!'))
// console.log(consultaCEP.erro)