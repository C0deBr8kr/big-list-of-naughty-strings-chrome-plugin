testable_inputs = [];
debug = 1;

function log(str) {
	if(debug)
		console.log(str);
}

function pushTestingField() {
	var selected = document.getElementById('dropdown').selectedIndex;
	console.log(testable_inputs)
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {fieldToBeTested: testable_inputs[selected],type: "pushTestingField"}, function(response) {
   		});
    });
}

function isPageTestable() {
	if(testable_inputs.length==0)
		alert('There are no fields to test on the page');
}

document.addEventListener('DOMContentLoaded', function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "getTestableInputs"}, function(testableInputs) {
	        var dropdown = document.getElementById('dropdown');
			// console.log("Received fields " + testableInputs);
			testable_inputs = testableInputs;
			isPageTestable();
			for(var i=0;i<testableInputs.length;i++) {
				var option = document.createElement("option");
				var obj = JSON.parse(testable_inputs[i]);
				if(obj.name){
					option.text = obj.name;
				} else {
					option.text = obj.id;
				}
				option.value = i;
				dropdown.add(option);
			}
      });
    });

    var newTabButton= document.getElementById('start');
  	newTabButton.addEventListener('click', pushTestingField);
});