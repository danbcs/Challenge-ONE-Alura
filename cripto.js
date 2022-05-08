/***
 * Recebento informações do HTML
 */
const textIn = document.getElementById('text-entrada');
const result = document.getElementById('text-resultado');
const btnEncrypt = document.getElementById('btn-criptografar');
const btnDecrypt = document.getElementById('btn-descriptografar');
const btnCopy = document.getElementById('btn-copiar');
const btnClean = document.getElementById('btn-limpar');
const textCopy = document.getElementById('copiar-texto');
const listError = document.getElementById('erros');

let Validated = true;

/***
 * Regras de criptografia e descriptografia ---
 * permitir apenas letras minusculas, e trocar conforme indicado abaixo:
 * e -> enter
 * i -> imes
 * a -> ai
 * o -> ober
 * u -> ufat
 */

 const paramsIn = ['e', 'i', 'a', 'o', 'u'];
 const paramsOut = ['enter', 'imes', 'ai', 'ober', 'ufat'];


/**
 * 
 * @param {document} element -> troca status result 
 */
 function backgroundOff(element){
    element.classList.add('remove-background');
}

/**
 * 
 * @param {document} element 
 */
function backgroundIn(element){
    element.classList.remove('remove-background');
}


/**
 * Função padrão para todos os cenários (Encriptar e desencriptar)
 */
function standard(){
    textIn.value = ''; //Limpa campo 'digite aqui'
    backgroundOff(result);
    btnCopy.classList.remove('bloqueado'); //Remove bloqueio do botão Copiar
    btnClean.classList.remove('bloqueado'); //Remove bloqueio do botão Limpar
    btnEncrypt.classList.add('bloqueado'); //Add bloqueio em botão Encriptar
    btnDecrypt.classList.add('bloqueado'); //Add bloqueio do botão Desencriptar
}

/**
 * Função para encriptar o texto inserido
 * @param {string} text 
 * @returns texto encriptado
 */
function encrypt(text){
    for (let i = 0; i < paramsIn.length; i++) {
        text = text.replaceAll(paramsIn[i], paramsOut[i]);
    }
    return text;
}

/**
 * Função para desencriptar o texto inserido
 * @param {string} texto 
 * @returns texto desencriptado
 */
function decrypt(texto){
    for (let i = 0; i < paramsIn.length; i++) {
        texto = texto.replaceAll(paramsOut[i], paramsIn[i]);
    }
    return texto;
}

/**
 * 
 * @param {string} text 
 * @returns 
 */
function validatedIN(text){
    let error = [];
    let textAccents = false;
    let hasNumber = false;
    let accents = 'àèìòùâêîôûäëïöüáéíóúãõ'.split(''); // variável com palavras acentuadas


    // Validação de acentuação
    for (let i = 0; i < accents.length; i++){
        let letter = accents[i];
        if (text.toLowerCase().includes(letter)){
            textAccents = true;
            break;
        }
    }

    // Validação de números
    for (let i = 0; i < text.length; i++){
        letter = text[i];
        if (Number.isInteger(parseInt(letter))){
            hasNumber = true;
            break;
        }
    }
    
    if (text.toLowerCase() != text) error.push(' remova as letras maíusculas');
    if (hasNumber) error.push(' remova os números')
    if (textAccents) error.push(' remova acentuação');

    return error;
}

/**
 * Evento para encriptar o texto
 */
 btnEncrypt.addEventListener('click', function(){
    if (Validated && textIn.value != ''){
        result.value = encrypt(textIn.value);
        standard();
    }
});

/**
 * Evento para desencriptar o texto
 */
btnDecrypt.addEventListener('click', function(){
    if (Validated && textIn.value != ''){
        result.value = decrypt(textIn.value);
        standard();
    }
});


btnCopy.addEventListener('click', function(){
    let resultValue = result.value;
    if (resultValue != ''){
        navigator.clipboard.writeText(result.value);
        textCopy.innerHTML = 'Copiado com sucesso...';
        setTimeout(() => {
            textCopy.innerHTML = '';
        }, 500);
    }
    
});

btnClean.addEventListener('click', function(){
    let resultValue = result.value;
    if (resultValue != ''){
        result.value = '';
        backgroundIn(result);
        btnCopy.classList.add('bloqueado');
        btnClean.classList.add('bloqueado');
        textCopy.innerHTML = 'Limpo...';
        setTimeout(() => {
            textCopy.innerHTML = '';
        }, 500);
    }
});


textIn.addEventListener('input', function(){
    let error = validatedIN(textIn.value);
    error.forEach(function(erro){
        document.getElementById("link-msg").innerHTML = error;
    });

    if (error == "") {
        document.getElementById("link-msg").innerHTML = "";
    
    // Bloqueio dos botões
    btnEncrypt.classList.remove('bloqueado');
    btnDecrypt.classList.remove('bloqueado');

    Validated = true;
    }
    if (error.length > 0 || textIn.value == ''){
        btnEncrypt.classList.add('bloqueado');
        btnDecrypt.classList.add('bloqueado');
        //error = ''
        Validated = false;
    }
});

