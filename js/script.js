/*eslint-env browser*/

var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

var total;
var correct = [];

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


function isValidInput(pattern, id, text) {
	"use strict";
	var result = pattern.test($(id).value);

	//This condition was created to avoid a problem with an alining elements in the delivery section
	if (id === 'city' || id === 'state' || id === 'zip' || id === 'cityBilling' || id === 'stateBilling' || id === 'zipBilling') {
		if (result == false) {
			$(id).style.border = "2px solid #ED5040";
			$(id).style.borderLeft = "7px solid red";
			$(id).style.color = "#c10f0f";
			$('triple').nextElementSibling.firstChild.nodeValue = text;
			$('bill').nextElementSibling.firstChild.nodeValue = text;
			$(id).focus();
			return correct[id] = false;
		} else {
			$(id).style.border = "2px solid green";
			$(id).style.borderLeft = "7px solid green";
			$(id).style.color = "black";
			$('triple').nextElementSibling.firstChild.nodeValue = ' ';
			$('bill').nextElementSibling.firstChild.nodeValue = ' ';
			return correct[id] = true;
		}
	}

	if (id !== 'city' || id !== 'state' || id !== 'zip') {
		if (result == false || $(id).value === '') {
			$(id).style.border = "2px solid #ED5040";
			$(id).style.borderLeft = "7px solid red";
			$(id).style.color = "#c10f0f";
			$(id).nextElementSibling.firstChild.nodeValue = text;
			$(id).focus();
			return correct[id] = false;
		} else {
			$(id).style.border = "2px solid green";
			$(id).style.borderLeft = "7px solid green";
			$(id).style.color = "black";
			$(id).nextElementSibling.firstChild.nodeValue = ' ';
			return correct[id] = true;
		}
	}
}

function isValidValue(id, id_2, n) {
	var input = $(id).getElementsByTagName('input');

	var count = 0;

	for (var i = 0; i<input.length; i++) {
		if (input[i].value == '') {
			//This condition was created to avoid a problem with an alining elements in the delivery section
			if (id === 'city' || id === 'state' || id === 'zip' || id === 'cityBilling' || id === 'stateBilling' || id === 'zipBilling') {
				$('triple').nextElementSibling.firstChild.nodeValue = 'This is required field.';
				$('bill').nextElementSibling.firstChild.nodeValue = 'This is required field.';
			} else {
				input[i].nextElementSibling.firstChild.nodeValue = 'This is required field.';
			}
			input[i].focus();
			break;
		}
	}

	for (var item in correct) {

		if (correct[item] === true) {
			count++;
		}
	}

	if (count === n) {
		toggleBlock(id, 'none');
		toggleBlock(id_2, 'block');
	}
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

function checkExpData() {
	if ($('cardMonth').value === 'text' || $('cardYear').value === 'text') {
		$('cardYear').nextElementSibling.firstChild.nodeValue = 'Choose expiration date.';
		//return correct['cardMonth'] = false;
		return correct['cardYear'] = false;
	} else {
		var today, someday;
		var expMonth = $("cardMonth").value;
		var expYear = $("cardYear").value;
		today = new Date();
		someday = new Date();
		someday.setFullYear(expYear, expMonth, 1);

		if (someday < today) {
			$('cardYear').nextElementSibling.firstChild.nodeValue = "The expiry date is before today's date. Please select a valid expiry date.";
			//return correct['cardMonth'] = false;
			return correct['cardYear'] = false;
		}
		$('cardYear').nextElementSibling.firstChild.nodeValue = ' ';
		//return correct['cardMonth'] = true;
		return correct['cardYear'] = true;
	}
}

function checkCard (value) {
	"use strict";
	
	if (/[^0-9-\s]+/.test(value)) return false;

	// The Luhn Algorithm. It's so pretty.
	var nCheck = 0, nDigit = 0, bEven = false;
	value = value.replace(/\D/g, "");

	for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n),
			nDigit = parseInt(cDigit, 10);

		if (bEven) {
			if ((nDigit *= 2) > 9) nDigit -= 9;
		}

		nCheck += nDigit;
		bEven = !bEven;
	}
	checkExpData();
	return (nCheck % 10) == 0;
}

// ----- REMOVE FIRST NODE OF SELECT TAG IN THE BUILD ORDER SECTION -------
function removeSelectNode(id) {
	"use strict";
	if ($(id).childNodes[0].value === 'text') {
		$(id).remove(0);
	}
}


function main() {
	"use strict";
	toggleBlock ('order', 'none');
	toggleBlock ('billingInfo', 'none');
	toggleBlock ('complete', 'none');
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
			

			$('name').addEventListener("input", function() {
				isValidInput(/^[A-Za-z]+$/,'name', 'Enter only letters.');
			});
			
			
			$("addressType").addEventListener("change", addOtherInput);

			$('phone').addEventListener('input', function (e) {
				$('phone').setAttribute('maxlength', '14');
				isValidInput (/^\(?([0-9]{3})\)?[) ]?([0-9]{3})[- ]?([0-9]{4})$/, 'phone', '');
				var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
				e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
			});
			
			$('address').addEventListener("input", function () {
				isValidInput (/^[a-z0-9\s,'-]*$/i, 'address', 'Alphanumeric characters only.');
			});

			$('city').addEventListener("input", function() {
				isValidInput (/^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/,'city', 'The city must be written by only letters.');
			});
			
			$('state').addEventListener("input", function() {
				$('state').setAttribute('maxlength', '2');
				isValidInput (/(AK|AL|AR|AZ|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NB|NC|ND|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)$/i,'state', 'Wrong state');
			});
			
			$('zip').addEventListener("input", function() {
				$('zip').setAttribute('maxlength', '5');
				isValidInput (/^\d{5}?$/,'zip', 'Zip code must be 5 digits.');
			});
			
			$('email').addEventListener("input", function() {
				isValidInput (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'email', 'E-mail must be kind of example@example.com');
			});

			$("next").addEventListener("click", function () {
				isValidValue('delivery', 'order', 7);
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
				correct = [];

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
				isValidInput (/^[a-zA-Z]+\s[a-zA-Z]+\s?$/,'nameBilling', 'Enter your name and surname. It should be only letters');
			});

			$('addressBilling').addEventListener("input", function () {
				isValidInput (/^[a-z0-9\s,'-]*$/i, 'addressBilling', 'Alphanumeric characters only.');
			});
			
			$('cityBilling').addEventListener("input", function() {
				isValidInput (/^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/,'cityBilling', 'The city must be written by only letters.');
			});
			
			$('stateBilling').addEventListener("input", function() {
				$('stateBilling').setAttribute('maxlength', '2');
				isValidInput (/(AK|AL|AR|AZ|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NB|NC|ND|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)$/i,'stateBilling', 'Wrong state');
			});
			
			$('zipBilling').addEventListener("input", function() {
				$('zipBilling').setAttribute('maxlength', '5');
				isValidInput (/^\d{5}?$/,'zipBilling', 'Zip code must be 5 digits.');
			});
			
			
			$('cardNumber').addEventListener("input", function (e) {
				var x;
				
				if (e.target.value[0] === '4') {
					x = e.target.value.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
					e.target.value = !x[2] ? x[1] : '' + x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '') + (x[4] ? ' ' + x[4] : '');
					$('cardIcon').style.background = "url('/images/visa.svg') center no-repeat";
					$('cardNumber').nextElementSibling.firstChild.nodeValue = ' ';
					isValidInput(/[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4}/, 'cardNumber', "Enter 13 or 16 digits for Visa card");
				} else if ((e.target.value[0] === '5' && e.target.value[1] === '1') || (e.target.value[0] === '5' && e.target.value[1] === '2') || (e.target.value[0] === '5' && e.target.value[1] === '3') || (e.target.value[0] === '5' && e.target.value[1] === '4') || (e.target.value[0] === '5' && e.target.value[1] === '5'))  {
					x = e.target.value.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
					e.target.value = !x[2] ? x[1] : '' + x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '') + (x[4] ? ' ' + x[4] : '');
					$('cardIcon').style.background = "url('images/mastercard.svg') center no-repeat";
					$('cardNumber').nextElementSibling.firstChild.nodeValue = ' ';
					isValidInput(/[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4}/, 'cardNumber', "Enter 16 digits for Mastercard");
				} else if (e.target.value[0] === '3' && e.target.value[1] === '7') {

					x = e.target.value.replace(/\D/g, '').match(/(\d{0,4})(\d{0,6})(\d{0,5})/);
					e.target.value = !x[2] ? x[1] : '' + x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '');
					$('cardIcon').style.background = "url('/images/amex.svg') center no-repeat";
					$('cardNumber').nextElementSibling.firstChild.nodeValue = ' ';
					isValidInput(/[0-9]{4} {0,1}[0-9]{6} {0,1}[0-9]{5}/, 'cardNumber', "Enter 15 digits for Amex card.");
				} else {
					$('cardNumber').nextElementSibling.firstChild.nodeValue = 'This number is not valid.';
					x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})/);
					e.target.value = !x[2] ? x[1] : '';
					return correct['cardNumber'] = false;
				}

			});

			$('cardMonth').addEventListener("change", function () {
				checkExpData();
			});

			$('cardYear').addEventListener("change", function () {
				checkExpData();
			});


			$('cardCvc').addEventListener("input", function (e) {
				var x;
				x = e.target.value.replace(/\D/g, '').match(/(\d{0,4})/);
				e.target.value = !x[2] ? x[1] : '' + x[1] + ' ' + x[2];
				isValidInput(/^[0-9]{3,4}$/, 'cardCvc', "Enter 3 digits for Mastercard or Visa cards. And 4 digits for Amex card.");

			});

			$("placeOrder").addEventListener("click", function () {
				var valueCard = $('cardNumber').value;
				if (!checkCard(valueCard)) {
					$('cardNumber').nextElementSibling.firstChild.nodeValue = 'This number is not valid.'
				}

				if ($('sameDelivery').checked) {
					isValidValue('billingInfo', 'complete', 3);
				} else {
					isValidValue('billingInfo', 'complete', 8);
				}
			});
		}); // --- END OF EVENT LISTENER
}  // --- END OF MAIN()
	
    
 main();   
