$(document).ready(init);

var currentSection=null;

 function init(){
    llamarComentarios();
    solicitudHistorial(); 
    currentSection=$('#hero'); 
     $('#btn-saludo').click(OnclickLogin);
     
     $('#btn-nombres').click(onClickJuego);
     cargar();
     llamarJugadores()
     $('#btn-play').click(onClickHistorial);
     $('#btn-histo').click(onClickCommit);
//    tweenMax.to('btn_saludo',2, {opacity:0});
 }

function OnclickLogin(){

    gatoSection('nombres');
   
    
}
function onClickHistorial(){
    gatoSection('historial');
    
    
}
function onClickJuego(){
    
     
     var playerA =$('#playera').val();
    var playerB=$('#playerb').val();
    localStorage.setItem('jugadorA',playerA);
    localStorage.setItem('jugadorB',playerB);
    
    
     gatoSection('juego');  
 return false;
    
}
function onClickCommit(evt){
    evt.preventDefault;
    gatoSection('comentario'); 
    llamarComentarios();

}


function gatoSection(_id){
    currentSection.removeClass('visible');
    var nexSection=$('#'+_id);
    nexSection.addClass('visible');
    currentSection=nexSection;
}
function llamarJugadores(){
    var jugadorA=localStorage.getItem("jugadorA");
    var jugadorB=localStorage.getItem("jugadorB");
    $('#playerA').text(jugadorA);
    $('#playerB').text(jugadorB);
}







// llamar comentarios


function llamarComentarios(){
        $.ajax({
        type : 'GET',
        url : 'http://test-ta.herokuapp.com/games/1/comments',
        data : {tipo:'0'},
        dataType : 'json',
        success : function(data) {
           console.log(JSON.stringify(data));
           $.each(data, function(i,item) {
            //console.log(item);
                update(data);
            });
        },
            
    });
    
    function update(_info)
    {
      $('#listCommit').html('<div class="comentarios">'+
                     '<h3>Comentarios</h3>'+
                      '<div class="primercommit">'+
                          '<h4><Span>'+_info[0].name+'</Span> dice:</h4>'+
                          '<span>'+_info[0].content+'</span>'+
                      '</div>'+
                     '<div class="secondcommit">'+
                          '<h4><span>'+_info[1].name+'</span>  dice:</h4>'+
                          '<span>'+_info[1].content+'</span>'+
                      '</div>'+
                  '</div>');
}
}
// jalar historial

 
function solicitudHistorial()
        {
          $.ajax({
        type : 'GET',
        url : 'http://test-ta.herokuapp.com/games',
        data : {tipo:'0'},
        dataType : 'json',
        success : function(data) {
           console.log(JSON.stringify(data));
           $.each(data, function(i,item) {
           // console.log(item);
                update(data);
            });
        },
            
    });
    

function update(_info){
    
   $('.list-player').html('<div class="box">'+
                          
                '<h4> <span id="winner">'+_info[i].winner_player+'</span> le gano a <span id="losser">'+_info[i].loser_player+'</span> en <span id="number">'+_info[i].number_of_turns_to_win+'</span> movimientos</h4>'+
                
               
              '</div>') ;
   //console.log(_info[3].winner_player);
    
            }
}
function postComentario()
        {
        
          $.ajax({
          type:'POST',    
          url:'http://test-ta.herokuapp.com/games/1/comments', 
          data:{ 
                'id': "3",
                'name': $('#name').val(),
                'content': $('#commit').val()}
        }).success(function(_data){
              $.each(_data,function(i,item){
                  //console.log(item);
                  update(_data);
              })
            
             
          });
        }
    

function update(_info){
   //console.log(_info[78].winner_player);
    //$('#playerb').html(_info.loser_player);
    

}

/*
//enviar jugadores
function envio()
        {
        
          $.ajax({
          type:'POST',    
          url:'http://test-ta.herokuapp.com/games', 
          data:{ 
                'id': "78",
                'winner_player': $('#playera').val(),
                'loser_player': $('#playerb').val()}
        }).success(function(_data){
              $.each(_data,function(i,item){
                  //console.log(item);
                  update(_data);
              })
            
             
          });
        }
    

function update(_info){
   //console.log(_info[78].winner_player);
    //$('#playerb').html(_info.loser_player);
    
}
*/




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
            $('#ganador').append('<h3> Gano'+''+letra+'</h3');
            alert("juagador"+" "+letra + " "+"Gana");
          
        }
}
 function setMessage(msg){
            document.getElementById("jugador").innerText = msg;
        }
        function switchTurn(){
            if(ganador(document.turn)){
                setMessage("Felicitaciones , << " + document.turn + " >> fue el ganador!");
                document.patty = document.turn;
            }else if (document.turn == "X") {
                document.turn = "O";
                setMessage("Es el turno de << " + document.turn +" >>");
            } else {
                document.turn = "X";
                setMessage("Es el turno de << " + document.turn +" >>" );
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

    if(turno==9)
        {
            alert('empate!!');
           
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



