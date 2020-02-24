$(document).ready(function(){
    
    $(".cantos").keyup(function(){
        let C1 = arrumaNumero($("#canto1").val())
        $("#canto1").val(C1)
        let C2 = arrumaNumero($("#canto2").val())
        $("#canto2").val(C2)
        let C3 = arrumaNumero($("#canto3").val())
        $("#canto3").val(C3)
        let C4 = arrumaNumero($("#canto4").val())
        $("#canto4").val(C4)

/*Parte da função que modifica o CSS*/
        var string = C1 +"% "+ C2 +"% "+ C4 +"% "+ C3 +"%"
        $(".caixa").css("border-radius", string)

/*muda o texto a ser copiado*/
        $(".infos-copiar").html("border-radius: " + string)
    })

    $(".copia").on('click', (e)=>{
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(".infos-copiar").html()).select();
        document.execCommand("copy");
        $temp.remove();
    })

});

function arrumaNumero(valor){
    if(valor[0]==0 && valor!=0)
        valor=valor.slice(1)
    if(valor>100){
        valor = 100
    }else if(valor<0){
        valor = 0
    }
    return valor
}
