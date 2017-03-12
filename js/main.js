$(document).ready(init);

var currentSection=null;

 function init(){
    currentSection=$('#hero'); 
     $('#btn-saludo').click(OnclickLogin);
     
     $('#btn-nombres').click(onClickJuego);
     cargar();
//    tweenMax.to('btn_saludo',2, {opacity:0});
 }

function OnclickLogin(){
    gatoSection('nombres');
}
function onClickJuego(){
     gatoSection('juego');
}
//function onClickHisto(){
     //gatoSection('historial');
//}

function gatoSection(_id){
    currentSection.removeClass('visible');
    var nexSection=$('#'+_id);
    nexSection.addClass('visible');
    currentSection=nexSection;
}


// funcionalidad de juego 

var turno=1;
var qturno;
var arregloCat=new Array(9);
var celdas=document.getElementsByClassName('cat');

function ganador(letra){
    if(
        
        (arregloCat[0]==letra && arregloCat[1]==letra && arregloCat[2]==letra)||
        (arregloCat[3]==letra && arregloCat[4]==letra && arregloCat[5]==letra)||
        (arregloCat[6]==letra && arregloCat[7]==letra && arregloCat[8]==letra)||
        (arregloCat[0]==letra && arregloCat[3]==letra && arregloCat[6]==letra)||
        (arregloCat[1]==letra && arregloCat[4]==letra && arregloCat[7]==letra)||
        (arregloCat[2]==letra && arregloCat[5]==letra && arregloCat[8]==letra)||
        (arregloCat[0]==letra && arregloCat[4]==letra && arregloCat[8]==letra)||
        (arregloCat[2]==letra && arregloCat[4]==letra && arregloCat[6]==letra)

    )
        {
            alert("juagador"+" "+letra + " "+"Gana");
            window.location.reload();
        }
}
function gato(evt)
{
//    alert(evt.target.id);
    var idCelda=evt.target.id;
    var celda=evt.target;
    var marcado=idCelda[1]-1;
//    alert(marcado);
    qturno=turno%2;
    if(qturno!=0)
        {
            celda.innerHTML="X"
            celda.style.background='red';
            arregloCat[marcado]='X';
            ganador("X");
        }
    else if(qturno==0)
        {
            celda.innerHTML="O"
            celda.style.background='blue';
            arregloCat[marcado]="O";
            ganador("O");
        }
    console.log(turno,qturno,arregloCat);
    if(turno==9)
        {
            alert('empate!!');
            window.location.reload();
        }
    turno++;

}
function cargar(){
   
//  document.getElementsByClassName('cat')[4].addEventListener('click',gato);
    i=0;
    while(i<celdas.length) 
    {
        celdas[i].addEventListener('click',gato);
        i++;
        
    } 
    
    }
