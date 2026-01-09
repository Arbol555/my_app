$j=jQuery.noConflict();

function computeBottomLeft(elementId,movableElementId) {
	//Get the "anchor" element and store it in variable
	var element = document.getElementById(elementId);

	// get element that moves with the anchor
	var movableElement = document.getElementById(movableElementId);

	// get the length and width of anchor element and store them
	var elementWidth = element["offsetWidth"];
	var elementHeight = element["offsetHeight"];

	// Compute top left of anchor element and add  height
	// to get bottom left position
	var x = getAbsPos(element, "Left");
	var y = getAbsPos(element, "Top") + elementHeight;

	// move the movable element
	if(movableElement.style.pixelLeft){
		//explorer
		movableElement.style.pixelLeft = x;
		movableElement.style.pixelTop = y;}
	else{
		//firefox
		movableElement.style.left=x + 'px';
		movableElement.style.top=y + 'px';	
	}
}

function getAbsPos(element, side) {
	var position = 0;
	while (element != null) {
		position += element["offset" + side];
		element = element.offsetParent;
	}
	return position;
}

function fEscapeDosPuntos(){
	return this.replace(/\:/g,'\\:');
}

//Agrega una scape sequence para los dos puntos en los strings para ser utilizado con jquery
//Esto es por la forma en que richfaces nombra los controles, separandos la jerarquia 
//de nombres por :
String.prototype.escapeDosPuntos=fEscapeDosPuntos;


/*
-n es el largo total. Positivo para padding derecho, negativo para padding izquierdo.
-ch es opcional y el caracter del pad. Por defecto es un espacio 
//cuando str es un string. Cuando str es un número el valor por defecto es 0.
*/
function pad(n,ch) {
	if(arguments.length<2) ch='0';

	var N=Math.abs(n);
	if(this.length>=N) {
		return n>=0 ? this.substr(0, n) : this.substr(this.length-N);
	}
	return (n>=0 ? this : '') + new Array(N-this.length+1).join((ch||' ').charAt(0)) + (n<0 ? this : '');
}

//Se provee el padding como un método del objeto string
String.prototype.pad=pad;


function addMultipartEncType(formIndex){
	var frm;
	if(formIndex)
		frm=document.forms[formIndex];
	else
		frm=document.forms[0];
	frm.setAttribute('enctype' , 'multipart/form-data');
	frm.setAttribute('encoding' , 'multipart/form-data');
	}
	
