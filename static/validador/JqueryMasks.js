//Deben existir referencias previas en las páginas a jquery-xxx.js y jquery.maskedinput-xxx.js

//Evita conflictos con prototype, framework javascript utilizado por richFaces


//Agrega Mascara anio/mes al control con el id recibido. Controlar que el mes sea válido pues solo
//verifica formato.
function AddAnioMesMask(controlId){
	$j('#' + controlId.escapeDosPuntos()).mask('99/9999',{placeholder:' '});
}

//Agrega Mascara de Fecha. Verificar que la fecha sea válida pues sólo controla formato
function AddDateMask(controlId){
		$j('#' + controlId.escapeDosPuntos())
				.mask('99/99/9999',{placeholder:' '});
		
}

//Sólo permite ingresar números en el control con el id recibido y numberOfDigits caracteres
//Si no se pasa, el default es un caracter.
function AddNumberMask(controlId,numberOfDigits,opcionales){
	var stMask;
	if(!numberOfDigits || numberOfDigits==null)
		numberOfDigits=1;
	if(opcionales)
		//?hace opcionales todos los dígitos siguientes al primero
		stMask='?' + '9'.pad(numberOfDigits,'9');
	else
		stMask='9'.pad(numberOfDigits,'9');
	$j('#' + controlId.escapeDosPuntos()).mask(stMask,{placeholder:' '});
	  
	
}


function AddDoubleMask(controlId,numberOfDigits, numberOfDecimals, opcionales){
	var stMask;
	if(!numberOfDigits || numberOfDigits==null)
		numberOfDigits=1;
	if(opcionales)
		//?hace opcionales todos los dígitos siguientes al primero
		stMask='?' + '9'.pad(numberOfDigits,'9') + ',?' + '9'.pad(numberOfDecimals, '9');
	else
		stMask='9'.pad(numberOfDigits,'9') + '9'.pad(numberOfDecimals, '9');
	$j('#' + controlId.escapeDosPuntos()).mask(stMask,{placeholder:' '});
}

//Solo permite escribir numeros y . o , 
//si se ingresa un punto se reemplaza por coma

function setDecimalInput(controlId){
	
	    $j('#' + controlId.escapeDosPuntos())
	    	.unbind('keydown.decimalInput')
	    	.bind('keydown.decimalInput',function(e){
             	switch (e.which){
              	case 3: //DOM_VK_CANCEL:
              	case 8: //DOM_VK_BACK_SPACE: 	
              	case 9: //DOM_VK_TAB:
              	case 12://DOM_VK_CLEAR:
              	case 37://DOM_VK_LEFT: 	
              	case 39://DOM_VK_RIGHT:
              	case 46://DOM_VK_DELETE:
              	case 48://DOM_VK_0: 	
              	case 49://DOM_VK_1: 	
              	case 50://DOM_VK_2: 	
              	case 51://DOM_VK_3: 	
              	case 52://DOM_VK_4: 	
              	case 53://DOM_VK_5: 	
              	case 54://DOM_VK_6: 	
              	case 55://DOM_VK_7: 	
              	case 56://DOM_VK_8: 	
              	case 57://DOM_VK_9: 	
              	case 96://DOM_VK_NUMPAD0: 	
              	case 97://DOM_VK_NUMPAD1: 	
              	case 98://DOM_VK_NUMPAD2: 	
              	case 99://DOM_VK_NUMPAD3: 	
              	case 100://DOM_VK_NUMPAD4: 	
              	case 101://DOM_VK_NUMPAD5: 	
              	case 102://DOM_VK_NUMPAD6: 	
              	case 103://DOM_VK_NUMPAD7: 	
              	case 104://DOM_VK_NUMPAD8: 	
              	case 105://DOM_VK_NUMPAD9:
              	case 35://DOM_VK_END
              	case 36://DOM_VK_HOME
              	case 27://DOM_VK_ESCAPE
              		return true;	
              		break;
              	case 188://DOM_VK_COMMA:
              		var value=e.currentTarget.value;
              		if(value.indexOf(',')!=-1)
              			return false;
              		else
              			return true;
              		break;
              	case 190://DOM_VK_PERIOD:
              	case 110://DOM_VK_DECIMAL:
              		var value=e.currentTarget.value;
              		if(value.indexOf(',')==-1){
              			var txt=$j(e.currentTarget);
              			var pst = txt.caret().begin;
              			var value=e.currentTarget.value;
              			var string_start = value.substring(0,pst); 
              			var string_end = value.substring(pst ,value.length); 
              			e.currentTarget.value = string_start + ',' + string_end; 
              			txt.caret(pst + 1,pst + 1); 
              			e.stopPropagation();
                  	}
          			return false;
              		break;
              	default:
              		return false;
              		break;
              }
	        });
		
}