/*eslint-env browser*/

var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

var total;
var pizza = {
    handTossed: {
				Small: 9.99,
				Medium: 12.99,
				Large: 14.99
				},
    thinCrust: {
				Medium: 11.99,
				Large: 13.99
				},
    newYorkStyle: {
				Large: 16.99,
				"Extra Large": 19.99
				},
    glutenFree: {Small: 10.99},
    cheese:     {
                Light: "no charge",
                "Normal (default)": "no charge",
                Extra: 2.99,
                Double: 3.99
                },
    sauce:      {
                "Regular Tomato": "no charge",
                "Hearty Tomato": 0.99,
                "BBQ Sauce": 1.99
                }
};


// ------- ADD INPUT FIELD FOR ADDRESS TYPE -------------

var addOtherInput = function () {
	"use strict";
	if (this.value === "other") {
		$('other').style.display = 'block';
		$('other').hidden = false;
	} else {
		$('other').style.display = 'none';
	}
};

// ----- END OF ADD INPUT FIELD FOR ADDRESS TYPE -------

// ----- TOGGLE OPTIONS FUNCTION ----------

function toggleOptions(id, boolean) {
    "use strict";
    if (id !== "toppings") {
        $(id).disabled = boolean;
	} else {
        var toppings =  $(id).getElementsByTagName("input");
        for (var j=0; j <  toppings.length; j++) {
            toppings[j].disabled = boolean;
        }  
    } 
}
// --------------END OF TOGGLE FUNCTION --------------------

// ------------------- HIDING BLOCKS ------------------- //

function toggleBlock (id, status) {
	"use strict";
	$(id).style.display = status;
}

// ------------------- END OF HIDING BLOCKS ------------------- //


//---------------- VALIDATION FORM ---------------------


function isValid(pattern, id, text) {
	"use strict";
	var result = pattern.test($(id).value.trim());
	if (result == false) {
		$(id).style.border = "2px solid #ED5040";
		$(id).style.borderLeft = "7px solid red";
		$(id).style.color = "#c10f0f";
		$(id).nextElementSibling.firstChild.nodeValue = text;
		$(id).focus();
	} else {
		$(id).style.border = "2px solid green";
		$(id).style.borderLeft = "7px solid green";
		$(id).style.color = "black";
	}
}

function isEmptyFields(id) {
	
}

// ----------------- CHOOSE A SIZE OF PIZZA ----------------

var createMenuSize = function (item) {
	"use strict";
	var select = $('sizePizza');
	var option = document.createElement('option');
	var optString;
	optString = "<option value = 'text'>--choose a size of pizza--</option>";
	
	Object.keys(pizza[item]).forEach(function(key) {
		optString += "<option value = " + pizza[item][key] + ">" + key + " - $" + pizza[item][key] + "</option>";
	});
	
	select.appendChild(option);
	$("sizePizza").innerHTML = optString;
	
};

// --------------- END OF CHOOSE A SIZE OF PIZZA --------

// -------------------- CHOOSE CHEESE -------------------

var createMenuCheese = function () {
	"use strict";
    var select = $('cheese');
	var option = document.createElement('option');
	var optString;
	optString = "<option value = 'text'>--choose cheese--</option>";
	
	Object.keys(pizza['cheese']).forEach(function(key) {
        if (isNaN(pizza['cheese'][key])) {
            var valueOpt = 0;
            optString += "<option value = " + valueOpt + ">" + key + " - " + pizza['cheese'][key] + "</option>";
        } else {
            optString += "<option value = " + pizza['cheese'][key] + ">" + key + " - +$" + pizza['cheese'][key] + "</option>";
        }
	});
	
	select.appendChild(option);
	$("cheese").innerHTML = optString;
    
};

// ----------------- END OF CHOOSE CHEESE ----------------

// -------------------- CHOOSE A SAUCE -------------------

var createMenuSauce = function () {
	"use strict";
    var select = $('sauce');
	var option = document.createElement('option');
	var optString;
	optString = "<option value = 'text'>--choose a sauce--</option>";
	
	Object.keys(pizza['sauce']).forEach(function(key) {
        if (isNaN(pizza['sauce'][key])) {
            var valueOpt = 0;
            optString += "<option value = " + valueOpt + ">" + key + " - " + pizza['sauce'][key] + "</option>";
        } else {
            optString += "<option value = " + pizza['sauce'][key] + ">" + key + " - +$" + pizza['sauce'][key] + "</option>";
        }
	});
	
	select.appendChild(option);
	$("sauce").innerHTML = optString;
	
};

// ----------------- END OF CHOOSE A SAUCE ----------------

// ----------------- BILLING INFORMATION FORM -------------
function displaySameDelivery () {
	"use strict";
	if ($('sameDelivery').checked) {
		$('nameBilling').value = $('name').value;
		$('addressBilling').value = $('address').value;
		$('roomBilling').value = $('room').value;
		$('cityBilling').value = $('city').value;
		$('stateBilling').value = $('state').value;
		$('zipBilling').value = $('zip').value;
	} else {
		$('billingAddressForm').reset();
	}
}

// -------- THE END OF BILLING INFORMATION FORM -----------

// ------------- PRICE CALCULATION ---------------


function calculateTotal() {
    "use strict";
	var count = 0;
	
	var priceSizePizza;
	var priceCheese;
    var priceSauce;
    var priceToppings;
	var toppings = $("toppings").getElementsByTagName("input");
	for (var i=0; i< toppings.length; i++) {       
		if (toppings[i].checked == true){
			count++;
		}
	}
	
	function returnValue(id) {
		if ($(id).value === 'text' || $(id).value === undefined || $(id).value === '') {
			return 0;
		} else {
			return $(id).value;
		}
	}
	
	priceSizePizza = parseFloat(returnValue("sizePizza"));	
    priceCheese = parseFloat(returnValue("cheese"));
    priceSauce = parseFloat(returnValue("sauce"));
    priceToppings = count * 0.99;
    total = Math.round(parseFloat(priceSizePizza + priceCheese + priceSauce + priceToppings)*100)/100;

	$("totalPrice").innerText = "$" + total;
	
}

// ------------- END OF PRICE CALCULATION ---------------


// ------ DISPLAY DELIVERY ADDRESS IN ORDER SETTINGS --------

function displayAddress () {
	"use strict";
	var str = $('address').value + " #" + $('room').value + " \n" + $('city').value + " " + $('state').value + ", " + $('zip').value;
	$('deliveryAddress').innerText = str.toUpperCase();
}

function checkCard (e) {
	"use strict";
	var cardVisa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
	var cardMaster = /^(?:5[1-5][0-9]{14})$/;
	var cardAmex = /^(?:3[47][0-9]{13})$/;
	
	var cardNumber = e.target.value;
	window.console.log(cardNumber);
	
	function splitString(stringToSplit) {
		var arrayOfStrings = stringToSplit.split('');
	}
	
	function formatInput () {
		var $this = $(this);
		var input = $this.val();

		// 2
		input = input.replace(/[\W\s\._\-]+/g, '');

		// 3
		var split = 4;
		var chunk = [];

		for (var i = 0, len = input.length; i < len; i += split) {
		split = ( i >= 8 && i <= 16 ) ? 4 : 8;
		chunk.push( input.substr( i, split ) );
		}

		// 4
		$this.val(function() {
		return chunk.join("-").toUpperCase();
		});
	}
}

// ----- REMOVE FIRST NODE OF SELECT TAG IN THE BUILD ORDER SECTION -------
function removeSelectNode(id) {
	"use strict";
	if ($(id).childNodes[0].value === 'text') {
		$(id).remove(0);
	}
}


	/*
	replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
	e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
			});
	*/
	/*
	if ($('cardNumber').value.replace(/\D/g, '').match(/\d/g)) {
		return true;
	} else {
		window.console.log('put just digits, no letters or specific characters');
		$('cardNumber').focus();
	}
	
	<i class="fab fa-cc-visa"></i>
	<i class="fab fa-cc-mastercard"></i>
	<i class="fab fa-cc-amex"></i>
	*/
	//cardNumber = splitString(eventNumber);
	/*
	if (cardNumber[0] === '4') {
		window.console.log('your card Visa');
		var x = e.target.value.replace(/\d/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
			e.target.value = !x[2] ? x[1] : '-' + x[1] + '-' + x[2] + (x[4] ? '-' + x[4] : '');
		if (cardNumber.match(cardVisa)) {
			
			$('cardNumber').focus();
		}
	} else if (cardNumber.match(cardMaster)) {
		window.console.log('your card MasterCard');
		$('cardNumber').focus();
	} else if (cardNumber.match(cardAmex)) {
		window.console.log('your card AmericanExpress');
		$('cardNumber').focus();
	} else {
		window.console.log('Wrong card number. Try again.');
		$('cardNumber').focus();
	}
	*/


function main() {
	"use strict";
	toggleBlock ('order', 'none');
	toggleBlock ('billingInfo', 'none');
	//PUT 0 IN TOTAL PRICE
	calculateTotal();
	
	//DISABLE FIELDS THAT INSTALLS THE ORDER FOR ENTERING DATA
	toggleOptions("cheese", true);
	toggleOptions("sauce", true);
	toggleOptions("toppings", true);
	
	//CREATE MENUS FROM OBJECT PIZZA
	createMenuCheese();
	createMenuSauce();
	
	
	
	//EVENT LISTENER
		window.addEventListener("load", function () {
			"use strict";
			
			$('name').addEventListener("input", function(e) {
				isValid (/^[a-zA-Z]+\s[a-zA-Z]+\s?$/,'name', 'It should be only letters');
			});
			
			
			$("addressType").addEventListener("change", addOtherInput);

			$('phone').addEventListener('input', function (e) {
				var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
				e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
			});
			
			$('city').addEventListener("input", function() {
				isValid (/(?:[A-Z][a-z.-]+[ ]?)+/i,'city', '');
			});
			
			$('state').addEventListener("input", function() {
				$('state').setAttribute('maxlength', '2');
				isValid (/(AK|AL|AR|AZ|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NB|NC|ND|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)$/i,'state', 'Wrong state');
			});
			
			$('zip').addEventListener("input", function() {
				$('zip').setAttribute('maxlength', '5');
				isValid (/^\d{5}?$/,'zip', '');
			});
			
			$('email').addEventListener("input", function() {
				isValid (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'email', 'E-mail should be example@example.com');
			});

			$("next").addEventListener("click", function () {
				var input = $('delivery').getElementsByTagName('input');
				/*
				do {
					for (var x in input) {
						if (input[x].value === '') {
							window.alert("Fill in the blank fields, please");
							$('delivery').focus();
							return false;
						} else {
							return true;
						}
					}
				} while (false);
				*/
				toggleBlock('delivery', 'none');
				toggleBlock('order', 'block');
				
			});
			
			
			var radioOption = [document.getElementsByName('radioname')[0],document.getElementsByName('radioname')[1], document.getElementsByName('radioname')[2], document.getElementsByName('radioname')[3]];

			radioOption.forEach(function(e) {
				e.addEventListener("click", function() {  
					var item = e.value;
					createMenuSize(item);
					
				});
			});


			$('sizePizza').addEventListener("change", function() {
				toggleOptions("cheese", false);
				window.console.log($('sizePizza').childNodes[0].value);
				removeSelectNode('sizePizza');
				calculateTotal();
				
			});
			$('cheese').addEventListener("change", function() {
				toggleOptions("sauce", false);
				removeSelectNode('cheese');
				calculateTotal();
			});
			$('sauce').addEventListener("change", function() {
				toggleOptions("toppings", false);
				removeSelectNode('sauce');
				calculateTotal();
			});
			$('toppings').addEventListener("click", calculateTotal);
			
			$("back").addEventListener("click", function () {
				toggleBlock('order', 'none');
				toggleBlock('delivery', 'block');
				
			});
			
			$('finishBuild').addEventListener("click", function() {
				var r = confirm('Are you sure?');
				if (r == true) {
					toggleBlock('order', 'none');
					toggleBlock('billingInfo', 'block');
					displayAddress ();
					$('balance_due').innerText = total;
				} 
			});
			
			$('sameDelivery').addEventListener('change', function() {
				displaySameDelivery ();
			});
			
			$('nameBilling').addEventListener("input", function() {
				isValid (/^[a-zA-Z]+\s[a-zA-Z]+\s?$/,'nameBilling', 'It should be only letters');
			});
			
			$('cityBilling').addEventListener("input", function() {
				isValid (/(?:[A-Z][a-z.-]+[ ]?)+/i,'cityBilling', '');
			});
			
			$('stateBilling').addEventListener("input", function() {
				$('stateBilling').setAttribute('maxlength', '2');
				isValid (/(AK|AL|AR|AZ|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NB|NC|ND|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)$/i,'stateBilling', 'Wrong state');
			});
			
			$('zipBilling').addEventListener("input", function() {
				$('zipBilling').setAttribute('maxlength', '5');
				isValid (/^\d{5}?$/,'zipBilling', '');
			});
			
			
			$('cardNumber').addEventListener("input", function (e) {
				var x = e.target.value.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
				e.target.value = !x[2] ? x[1] : '' + x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '') + (x[4] ? ' ' + x[4] : '');
				
						
			});

		}); // --- END OF EVENT LISTENER
}
	
    
 main();   
   
	// ---------- TOOLTIP ---------
/*	
var div = $("next");
var a = document.getElementById("a");
var fadeSpeed = 25; // a value between 1 and 1000 where 1000 will take 10
                    // seconds to fade in and out and 1 will take 0.01 sec.
var tipMessage = "The content of the tooltip...";

var showTip = function(){    
    var tip = document.createElement("span");
    tip.className = "tooltip";
    tip.id = "tip";
    tip.innerHTML = tipMessage;
    div.appendChild(tip);
    tip.style.opacity="0"; // to start with...
    var intId = setInterval(function(){
        newOpacity = parseFloat(tip.style.opacity)+0.1;
        tip.style.opacity = newOpacity.toString();
        if(tip.style.opacity == "1"){
            clearInterval(intId);
        }
    }, fadeSpeed);
};
var hideTip = function(){
    var tip = document.getElementById("tip");
    var intId = setInterval(function(){
        newOpacity = parseFloat(tip.style.opacity)-0.1;
        tip.style.opacity = newOpacity.toString();
        if(tip.style.opacity == "0"){
            clearInterval(intId);
            tip.remove();
        }
    }, fadeSpeed);
    tip.remove();
};

$("next").addEventListener("mouseover", showTip, false);
$("next").addEventListener("mouseout", hideTip, false);
*/


// ----------- valid or invalid -----

/*
 $("name").addEventListener("blur", function(e){
        "use strict";
        if(isValidFullName(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
	
*/