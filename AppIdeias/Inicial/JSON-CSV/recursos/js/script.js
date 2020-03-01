$(document).ready(function(){
    $('.json').click(()=>{
        if(verificaCSV()){
            CSV2JSON()
        }
    })

    $('.csv').click(function(){
        if(verificaJSON()){
            JSOn2CSV()
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
function verificaJSON(){
    var texto=$('#original').val()
    if(texto.length==0){
        alert('JSON vazio')
        return false
    }else if(texto[0]!= '['){
        alert('Verifique se existe as chaves')
        return false
    }
    return true
}
/*Ajuda na identificação do char*/
function isAlpha(ch){
    return typeof ch === "string" && ch.length === 1 
    && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
}
function isNumber(ch){
    return typeof ch === "string" && ch.length === 1 
    && (ch >= "0" && ch <= "9");
}
/*Função que transforma o CSV em Json*/
/*Padronização das palavras, focando nos espaços extras*/
function padronizaPalavra(palavra){
    palavra = palavra.trim()
    return palavra
}
/*Converte o texto CSV para JSON*/
function CSV2JSON(){
/*Arrays que vão guardar infos importantes*/
    var json= [] //Array que vai guardar o texto final
    var identificadores = [] //Guarda os nomes dos campos
    
/*Variáveis que recebem informações dos textos*/
    var texto=$('#original').val().trim() //Recebe o texto a ser transformado
    var tam = texto.length //Pega o tamanho do texto que será usado para percorrer
    
    var i=0 //contador para cada char da lista
    
/*Array que é usada para separar palavras dentro de cada linha*/
    var palavra= []
    
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
}
/*Converte o texto JSON para CSV */
function JSOn2CSV(){
    var i=0
    var primeira = true

/*Variáveis que recebem informações dos textos*/
    var texto=$('#original').val().trim() //Recebe o texto a ser transformado
    var tam = texto.length //Pega o tamanho do texto que será usado para percorrer
    var string=[]

    console.log(tam)
/*Loop que verifica todas as char do texto*/
    while(i<tam){
        var aux=[]
        var linha=[]
    /*Separa linha que será analisado da vez*/
        while(texto[i]!= '\n' && i<tam){
            if(isAlpha(texto[i]) || isNumber(texto[i])){
                aux.push(texto[i])
            }else if(aux != ''){
                linha.push(aux.join(''))
                aux=[]
            }
            i++
        }
        i++
    /*Caso seja a primeira passagem ele separa os identificadores*/
        if(primeira){
            var indentificador=[]
            var info=[]
            for(var j=0; j<linha.length;j++){
                if(j%2==0){
                    indentificador.push(linha[j])
                }else{
                    info.push(linha[j])
                }
            }
            string+=indentificador+'\n'
            string+=info+'\n'
            info=[]
            primeira=false
        }else{     /*Nos outros casos ele só verifica a informação*/
            for(var j=0; j<linha.length;j++){
                if(j%2!=0){
                    info.push(linha[j])
                }
            }
            string+=info+'\n'
            info=[]
        }
    /*Monta a string do teexto*/
        $('#final').val(string)
    }  

    
}