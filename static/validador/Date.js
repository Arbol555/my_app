//Esto es nuevo

//Chequea que el string mesAnio sea un año válido (MM/yyyy)
function validarMesAnio(mesAnio,showAlert){
	var mes;
	var anio;
	var date;
	var msg='El mes/año es inválido.\n';
	if(mesAnio=='' || mesAnio=='  /    ')
		return true;
	try{
		mes=mesAnio.substr(0,2);
		anio=mesAnio.substr(3,4);
		date=new Date(anio, mes-1,1);
		if(date.getMonth()!=mes-1 || date.getFullYear()!=anio || mesAnio==""){
			if(showAlert==undefined || showAlert==null || showAlert)
				alert(msg);
			return false;
		}
		else
			return true;				
	 }
	catch(err){
		if(showAlert==undefined || showAlert==null || showAlert)
			alert(msg);
		return false;
	}
	
}



//Verifica que los string (MM/yyyy) del rango de meses recibido sean meses válidos y que hasta  
// sea mayor o igual que desde. El tercer parámetro indica si se debe mostrar un
// alert o no.
// Default true (muestra el alert)
function validarRangoMeses(valueMesDesde,valueMesHasta,showAlert){
	var msg="";
	var mes;
	var anio;
	var date;
	var anioMesDesde,anioMesHasta;
	if(valueMesDesde=='' || valueMesDesde=='  /    ' || valueMesHasta=='' || valueMesHasta=='  /    ')
		return true;
	try{
		mes=valueMesDesde.substr(0,2);
		anio=valueMesDesde.substr(3,4);
		date=new Date(anio, mes-1,1);
		if(date.getMonth()!=mes-1 || date.getFullYear()!=anio || anioMesDesde=="")
			msg='El mes/año desde es inválido.\n';
		else
			anioMesDesde=parseInt(anio + mes,10);				
	 }
	catch(err){
		msg='El mes/año desde es inválido.\n';
	}
	try{
		mes=valueMesHasta.substr(0,2);
		anio=valueMesHasta.substr(3,4);
		date=new Date(anio, mes-1,1);
		if(date.getMonth()!=mes-1 || date.getFullYear()!=anio || anioMesHasta=="")
			msg+='El mes/año hasta es inválido.\n';
		else
			anioMesHasta=parseInt(anio + mes,10);	 }
	catch(err){
		msg=msg + 'El mes/año hasta es inválido.\n';
	}
	if(msg==""){
		if(anioMesDesde>anioMesHasta){
			msg=msg + 'El Mes/Período Desde no puede ser\nmayor que el Mes/Período Hasta.\n';
			if(showAlert==undefined || showAlert==null || showAlert)
				alert(msg);	
			return false;
		}
		return true;
	}
	else{
		msg += 'Formato válido MM/yyyy, ej: 03/2009\n';
		if(showAlert==undefined || showAlert==null || showAlert)
			alert(msg);
		return false;	
	}

	return true;
}

//Verifica que la fecha sea válida (dd/MM/yyyy). ShowAlert defaults a true (muestra el mensaje)
function validarFecha(fecha,showAlert){
	if(fecha=='' || fecha=='  /  /    ')
		return true;
	var dia,mes, anio;
	var msg='Fecha o formato inválido.\nDebe tener el formato dd/MM/yyyy, por ej: 02/05/2009';
	try{
		dia=fecha.substr(0,2);
		mes=fecha.substr(3,2);
		anio=fecha.substr(6,4);
		date=new Date(anio,mes-1,dia);
		if(date.getDate().toString().pad(-2,'0')+ '/' + (date.getMonth()+1).toString().pad(-2,'0')+ '/' + date.getFullYear() == fecha)
			return true;
		else{
			if(showAlert==undefined || showAlert==null || showAlert)
				alert(msg);
			false;
		}
	}
	catch(err){
		if(showAlert==undefined || showAlert==null || showAlert)
			alert(msg);
		return false;
	}
}


//Version anterior de validación de fechas.



// JavaScript Document


var strSeperator = "/";
// If you are using any Java validation on the back side you will want to use
// the / because
// Java date validations do not recognize the dash as a valid date separator.
var vDateType = 3; // Global value for type of date format
// 1 = mm/dd/yyyy
// 2 = yyyy/dd/mm (Unable to do date check at this time)
// 3 = dd/mm/yyyy
// 4 = mm/yyyy

var vYearType = 4; // Set to 2 or 4 for number of digits in the year for
					// Netscape
var vYearLength = 4; // Set to 4 if you want to force the user to enter 4
						// digits for the year before validating.
var err = 0; // Set the error code to a default of zero

function DateFormat(vDateName, vDateValue, e, dateCheck, dateType) {
	
vDateType = dateType;
// vDateName = object name
// vDateValue = value in the field being checked
// e = event
// dateCheck
// True = Verify that the vDateValue is a valid date
// False = Format values being entered into vDateValue only
// vDateType
// 1 = mm/dd/yyyy
// 2 = yyyy/mm/dd
// 3 = dd/mm/yyyy
// 4 = mm/yyyy


var whichCode = (window.Event) ? e.keyCode : e.which;

// alert('keycode ' + whichCode);


if ( (!(whichCode==111 && vDateValue.length==4) && !(whichCode==111 && vDateValue.length==7) ) && (!(whichCode<=58 && whichCode>=48)  && !(whichCode<=105 && whichCode>=95)) &&
whichCode!=9 &&
whichCode!=0 &&
whichCode!=8 &&
whichCode!=13 &&
whichCode!=46 && //SUPRIMIR
whichCode!=35 && //INCIO
whichCode!=36 && //FIN
whichCode!=37 &&
whichCode!=39) {
	//vDateName.value = vDateName.value.substr(0, (vDateValue.length-1));
	e.returnValue=false
	return false;
}

if (whichCode == 8) // Ignore value for backspace.
	return false;
else if (whichCode==37 || whichCode==39) 	// Ignore value for left and right
											// key
	return false;
else if (whichCode == 46) // SUPRIMIR
	return false;
else if (whichCode == 35) // INICIO
	return false;
else if (whichCode == 36) // FIN
	return false;
else if (whichCode==13) { 	//Enter => navigate to next field.
// navigateNextField(vDateName);
	return false;
}
else {

	//Create numeric string values for 0123456789/
	// The codes provided include both keyboard and keypad values
	var strCheck = '45,35,40,34,37,12,39,36,38,33,47,48,49,50,51,52,53,54,55,56,57,58,59,95,96,97,98,99,100,101,102,103,104,105';
	if (strCheck.indexOf(whichCode) != -1) {
		if (true) {
			// Non isNav Check
			if ( (vDateType==4 && ((vDateValue.length < 6 && dateCheck) || (vDateValue.length == 6 && dateCheck)) && (vDateValue.length >=1)) ||
			     (vDateType!=4 && ((vDateValue.length < 8 && dateCheck) || (vDateValue.length == 9 && dateCheck)) && (vDateValue.length >=1))

			    ) {
				return invalidDate(vDateName,dateType);
			}
			// Reformat date to format that can be validated. mm/dd/yyyy
			if (vDateValue.length >= 8 && dateCheck || (vDateValue.length>=4 && vDateType==4 && dateCheck)) {
				// Additional date formats can be entered here and parsed out to
				// a valid date format that the validation routine will
				// recognize.
				if (vDateType == 1) // mm/dd/yyyy
					{
					var mMonth = vDateName.value.substr(0,2);
					var mDay = vDateName.value.substr(3,2);
					var mYear = vDateName.value.substr(6,4)
					}
				if (vDateType == 2) // yyyy/mm/dd
					{
					var mYear = vDateName.value.substr(0,4)
					var mMonth = vDateName.value.substr(5,2);
					var mDay = vDateName.value.substr(8,2);
					}
				if (vDateType == 3) // dd/mm/yyyy
					{
					var mDay = vDateName.value.substr(0,2);
					var mMonth = vDateName.value.substr(3,2);
					var mYear = vDateName.value.substr(6,4)
					}
				if (vDateType == 4) // mm/yyyy
					{
					var mDay = 1;
					var mMonth = vDateName.value.substr(0,2);
					var mYear = vDateName.value.substr(3,4)
					}

				if (vYearLength == 4) {
					if (mYear.length < 4) {
						return invalidDate(vDateName,dateType);
					}
				}
				// Create temp. variable for storing the current vDateType
				var vDateTypeTemp = vDateType;
				// Change vDateType to a 1 for standard date format for
				// validation
				// Type will be changed back when validation is completed.
				vDateType = 1;
				// Store reformatted date to new variable for validation.
				var vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;
				if (mYear.length == 2 && vYearType == 4 && dateCheck) {
					//Turn a two digit year into a 4 digit year
					var mToday = new Date();
					// If the year is greater than 30 years from now use 19,
					// otherwise use 20
					var checkYear = mToday.getFullYear() + 30;
					var mCheckYear = '20' + mYear;
					if (mCheckYear >= checkYear)
						mYear = '19' + mYear;
					else
						mYear = '20' + mYear;
					vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;
					// Store the new value back to the field. This function will
					// not work with date type of 2 since the year is entered
					// first.
					if (vDateTypeTemp == 1) // mm/dd/yyyy
						vDateName.value = mMonth+strSeperator+mDay+strSeperator+mYear;
					if (vDateTypeTemp == 3) // dd/mm/yyyy
						vDateName.value = mDay+strSeperator+mMonth+strSeperator+mYear;
				}
				if (!dateValid(vDateValueCheck)) {
					return invalidDate(vDateName,dateType);
				}
				vDateType = vDateTypeTemp;
				return true;
			}
			else {
				if (vDateType == 1) {
					if (vDateValue.length == 2) {
						vDateName.value = vDateValue+strSeperator;
					}
					if (vDateValue.length == 5) {
						vDateName.value = vDateValue+strSeperator;
					}
				}
				if (vDateType == 2) {
					if (vDateValue.length == 4) {
						vDateName.value = vDateValue+strSeperator;
					}
					if (vDateValue.length == 7) {
						vDateName.value = vDateValue+strSeperator;
				   }
				}
				if (vDateType == 3) {
					if (vDateValue.length == 2) {
						vDateName.value = vDateValue+strSeperator;
					}
					if (vDateValue.length == 5) {
						vDateName.value = vDateValue+strSeperator;
				   }
				}
				if (vDateType == 4) {
					if (vDateValue.length == 2) {
						vDateName.value = vDateValue+strSeperator;
					}
					if (vDateValue.length == 3 && whichCode==111) {
						vDateValue[3]='';
					}
					if (vDateValue.length == 6 && whichCode==111) {
						vDateValue[6]='';
					}
				}
				return true;
			}
		} //if(true)
		if (vDateValue.length == 10&& dateCheck) {
			if (!dateValid(vDateName)) {
				// Un-comment the next line of code for debugging the dateValid() function error messages
				// alert(err);
				return invalidDate(vDateName,dateType);
		   }
		}
		return false;
	}
else { //strCheck.indexOf(whichCode) != -1
	// If the value is not in the string return the string minus the last
	// key entered.
	vDateName.value = vDateName.value.substr(0, (vDateValue.length-1));
	return false;
    }
   }
}
function dateValid(objName) {
var strDate;
var strDateArray;
var strDay;
var strMonth;
var strYear;
var intday;
var intMonth;
var intYear;
var booFound = false;
var datefield = objName;
var strSeparatorArray = new Array("-"," ","/",".");
var intElementNr;
// var err = 0;
var strMonthArray = new Array(12);
strMonthArray[0] = "Jan";
strMonthArray[1] = "Feb";
strMonthArray[2] = "Mar";
strMonthArray[3] = "Apr";
strMonthArray[4] = "May";
strMonthArray[5] = "Jun";
strMonthArray[6] = "Jul";
strMonthArray[7] = "Aug";
strMonthArray[8] = "Sep";
strMonthArray[9] = "Oct";
strMonthArray[10] = "Nov";
strMonthArray[11] = "Dec";
// strDate = datefield.value;
strDate = objName;
if (strDate.length < 1) {
return true;
}
for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) {
if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) {
strDateArray = strDate.split(strSeparatorArray[intElementNr]);
if (strDateArray.length != 3) {
err = 1;
return false;
}
else {
strDay = strDateArray[0];
strMonth = strDateArray[1];
strYear = strDateArray[2];
}
booFound = true;
   }
}
if (booFound == false) {
if (strDate.length>5) {
strDay = strDate.substr(0, 2);
strMonth = strDate.substr(2, 2);
strYear = strDate.substr(4);
   }
}
//Adjustment for short years entered
if (strYear.length == 2) {
strYear = '20' + strYear;
}
strTemp = strDay;
strDay = strMonth;
strMonth = strTemp;
intday = parseInt(strDay, 10);
if (isNaN(intday)) {
err = 2;
return false;
}
intMonth = parseInt(strMonth, 10);
if (isNaN(intMonth)) {
for (i = 0;i<12;i++) {
if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase()) {
intMonth = i+1;
strMonth = strMonthArray[i];
i = 12;
   }
}
if (isNaN(intMonth)) {
err = 3;
return false;
   }
}
intYear = parseInt(strYear, 10);
if (isNaN(intYear)) {
err = 4;
return false;
}
if (intMonth>12 || intMonth<1) {
err = 5;
return false;
}
if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) {
err = 6;
return false;
}
if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) {
err = 7;
return false;
}
if (intMonth == 2) {
if (intday < 1) {
err = 8;
return false;
}
if (LeapYear(intYear) == true) {
if (intday > 29) {
err = 9;
return false;
   }
}
else {
if (intday > 28) {
err = 10;
return false;
      }
   }
}
return true;
}
function LeapYear(intYear) {
if (intYear % 100 == 0) {
if (intYear % 400 == 0) { return true; }
}
else {
if ((intYear % 4) == 0) { return true; }
}
return false;
}

function invalidDate(vDateName,dateType) {
	var ejemplo;
  if (dateType == '3'){
    ejemplo = "29/01/2007";
  }
  else{
    ejemplo = "07/2007";
  }
  if (confirm("Fecha inválida, ejemplo válido: " + ejemplo +". Desea Continuar?")) {
		return true;


	} else {
	vDateName.value = "";
	vDateName.focus();
	vDateName.select();

	return false;

	}
}

function navigateNextField(field) {
				var i;
				for (i = 0; i < field.form.elements.length; i++)
					if (field == field.form.elements[i])
						break;
				i = (i + 1) % field.form.elements.length;
				field.form.elements[i].focus();

	}


//  End -->

