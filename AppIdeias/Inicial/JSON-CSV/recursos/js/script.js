$(document).ready(function(){
    $('.json').click(function(){
        if(verificaCSV()){
            CSV2JSON()
        }
    })
})

/*Verificar possíveis erros antes de executar o transformador*/
function verificaCSV(){
    var texto=$('#original').val()
    if(texto.length==0){
        alert('CSV vazio')
        return false
    }else if(!isAlpha(texto[0])){
        alert('Verifique se você colocou os identificadores')
        return false
    }else if(texto[0]== '['){
        alert('Verifique se já não é um JSON')
        return false
    }
    return true
}

/*Ajuda na identificação do CSV*/
function isAlpha(ch){
    return typeof ch === "string" && ch.length === 1 
    && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
}

/*Função que transforma o CSV em Json*/
function CSV2JSON(){
/*Arrays que vão guardar infos importantes*/
    var json=[]
    var identificadores = [] //Guarda os nomes dos campos

/*Variáveis que recebem informações dos textos*/
    var texto=$('#original').val().trim()
    var tam = texto.length
    
    var i=0 //contador para cada char da lista

/*Array que é usada para separar palavras dentro de cada linha*/
    var palavra=[]

/*Define os identificadores usados no JSON*/
    while(texto[i]!="\n"){
        if(texto[i]!=","){
            palavra.push(texto[i])  
        }else{
            identificadores.push(palavra.join(''))
            palavra=[]
        }
        i++
    }
    identificadores.push(palavra.join(''))
    palavra=[]
    i++

/*Loop que verifica todas as char do texto*/
    while(i<tam){
        var aux=[]
        /*Separa as palavras da linha*/
        while(texto[i]!="\n" && i<tam){
            if(texto[i]!=","){
                palavra.push(texto[i])  
            }else{
                aux.push(padronizaPalavra(palavra.join('')))
                palavra=[]
            }
            i++
        }
        aux.push(padronizaPalavra(palavra.join('')))
        palavra=[]
        var aux2 =[]
        /* Junta para cada elemento do json*/
        aux2.push('{')
        var string=""
        for(var j=0; j<aux.length; j++){
            string +=  identificadores[j] + ':' + aux[j] + ','
        }
        string = string.split('')
        string.pop()
        aux2.push(string.join('')+'}')
        json.push(aux2.join(''))
        i++
    }  

/*Parte que faz o print no text Area Final*/
    string='['
    for(i=0;i<json.length;i++){
        string+=json[i]
        if(i!=json.length-1){
            string+=','
        }
        string+='\n'
    }
    string+=']'
    $('#final').val(string)

    console.log(json)
}

function padronizaPalavra(palavra){
    palavra = palavra.trim()
    return palavra
}

