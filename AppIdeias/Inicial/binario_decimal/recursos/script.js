$(document).ready(function(){
    $('#binario').keypress(function(e){
        if(e.keyCode == 49 || e.keyCode == 48){
            return true
        }else{
            alert("Deve incluir 0 ou 1");
            return false
        }
    });
    $('#transformar').click(function(){
        var bin = $('#binario').val();
        sum=0;
        for(i=0;i<bin.length;i++){
            x = parseInt(bin[i]);
            sum+= x * 2**i;
        }
        $('#decimal').val(sum);
    });
});