$(document).ready();
var currentSection=null;
 function init(){
    currentSection=$('hero'); 
     tweenMax.to('btn_saludo',2, {opacity:0});
 }
function gatoSection(_id){
    currentSection.removeClass('visible');
    var nexSection=$('#'+_id);
    nexSection.addClass('visible');
    currentSection=nexSection;
}