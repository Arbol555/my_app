

function disableElem(elem,blnDisable){
	if(blnDisable)
		elem.disabled='disabled';
	else
		elem.disabled='';
}

//No me quedo claro si por la diferencia de modelo de eventos o que firefox ignora el setfocus luego de un
//onblur. Ie no tiene problemas. El workaround para que funcione en los dos es el de llamar el focus en setTimeout.
function focusCompFirefox(elem){
	setTimeout(function(){elem.focus();}, 5);
}