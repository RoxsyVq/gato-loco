$(document).ready(init);

var currentSection=null;
var currentGameId;
 function init(){
   // llamarComentarios();
    //solicitudHistorial(); 
    currentSection=$('#hero'); 
     $('#btn-saludo').click(OnclickLogin);
     
     $('#btn-nombres').click(onClickJuego);
     cargar();
    
     //$('#btn-play').click(onClickBtnHistorial);
     
     $('#btn-historial').click(onClickBtnHistorial);
     $('#lista-juegos').on('click', 'button', onClickBtnItemJuego);
     $('#btn-play').click(onclickNewGame);
     	
     $('#btn-commit').click(onClickBtnComentar);

     
//    tweenMax.to('btn_saludo',2, {opacity:0});
 }

function OnclickLogin(){

    gatoSection('nombres');
   
    
}
function onclickNewGame(){
    postGames();
}
function onClickBtnItemJuego()
{ 
	var idGame = $(this).parent().data('idgame');
	console.log(idGame);
    gatoSection('comentario');
    getComentarios(idGame);
    currentGameId=idGame;
	getSingleGame(idGame);
}
function onClickBtnComentar()
{
    var name=$('#name');
    var content=$('#commit');
	postComentario(currentGameId, name.val(), content.val());
    console.log(name.val());
    
}
function onclickNewGame()
{
    
	postGames($('#ganador').val(), $('#playerB').val(), $('#commit').val());
    //onClickBtnHistorial();
}

function onClickBtnHistorial(evt){
    evt.preventDefault();
	gatoSection('historial');
	getHistorial();
}

function getHistorial() {
	$.ajax({
		url: 'http://test-ta.herokuapp.com/games'
	}).success(function (_data) {
		dibujarHistorial(_data);
	});
}
function dibujarHistorial(_datos) {
	//console.log(_datos);
	var lista = $('#lista-juegos');

	for (var i in _datos) {
		console.log(_datos[i].winner_player);

		var html = '<li data-idgame="'+ _datos[i].id +'" class="list-group-item box">' + _datos[i].winner_player + ' le gano a <span id="losser">'+_datos[i].loser_player+'</span> en <span id="number">'+_datos[i].number_of_turns_to_win+'</span> movimientos <button class="btn pull-right" >Comentario</button></li>';
		lista.append(html);
	}
}


/***************************/
function onClickHistorial(){
    gatoSection('historial');
}

function onClickJuego()
{
     
    var playerA =$('#playera').val();
    var playerB=$('#playerb').val();
    localStorage.setItem('jugadorA',playerA);
    localStorage.setItem('jugadorB',playerB);
    
    
    gatoSection('juego'); 
   
    llamarJugadores()
    return false;
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

function getComentarios(_idGame)
{
	$.ajax({
		url: 'http://test-ta.herokuapp.com/games/'+_idGame+'/comments',
		type:'GET'
	}).success(function(_data){
		console.log(_data);
		dibujarComentarios(_data);
	});
}

function dibujarComentarios(_datos)
{
	var lista = $('#lista-comentarios');
	lista.empty();
	for(var i in _datos)
	{
		var html = '<li class="list-group-item">'+
                     
                      '<div class="primercommit">'+
                          '<h4><Span>'+_datos[i].name+'</Span> dice:</h4>'+
                          '<span>'+_datos[i].content+'</span>'+
                      '</li>';
        
		lista.append(html);
	}
}


function getSingleGame(_idGame)
{
	$.ajax({
		url: 'http://test-ta.herokuapp.com/games/' + _idGame,
		type:'GET'
	}).success(function(_data){
		console.log(_data);
	});
}
/* llamar comentarios
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
}*/
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
           console.log(item);
                update(data);
            });
        },
            
    });
    
function update(_info)
        {
    
            $('.list-player').html('<div class="box">'+
                          
                    '<h4> <span id="winner">'+_info[i].winner_player+'</span> le gano a <span id="losser">'+_info[i].loser_player+'</span> en <span id="number">'+_info[i].number_of_turns_to_win+'</span> movimientos</h4>'+
                    '</div>') ;
            //console.log(_info[3].winner_player);
    
            }
        }



function postComentario(_idGame,_name,_content)
        {
        $.ajax({
		url:'http://test-ta.herokuapp.com/games/'+_idGame+'/comments',
		type:'POST',
		data:{comment:{ name:_name, content:_content, game_id:_idGame }}
	}).success(function(_data){
		console.log(_data);
		getComentarios(_idGame);
	});
    
}

function postGames(_winner, _loser, _number)
{
  
	$.ajax({
		url:'http://test-ta.herokuapp.com/games',
		type:'POST',
		data:{comment:{ winner_player:_winner, loser_player:_loser, number_of_turns_to_win:_number }}
	}).success(function(_data){
		console.log(_data);
	});
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
            if(letra=="X"){
               $('#ganador').append('<h3> Gano'+" "+ jugadorA +'</h3');
            alert("juagador"+" "+letra + " "+"Gana"); 
            }
            else{
                $('#ganador').append('<h3> Gana'+" "+ jugadorB +'</h3');
            alert("juagador"+" "+letra + " "+"Gana"); 
            }
            
          
        }
}
    var contx=$("#countx");
    var conto=$("#county");
    var jugadorA=localStorage.getItem("jugadorA");
    var jugadorB=localStorage.getItem("jugadorB");
    var x=0;
    var y=0;

function gato(evt)
{
//    alert(evt.target.id);
    var suma;
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
            $("#jugador").text(jugadorA);
            x++;
            contx.html(x);
          
        }
    else if(qturno==0)
        {
            celda.innerHTML="O"
            celda.style.background='blue';
            arregloCat[marcado]="O";
            ganador("O");
             $("#jugador").text(jugadorB);
            y++;
           conto.html(y); 
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



