function Trim(str)
 { 
  return str.replace(/^\s+|\s+$/gm,''); 
}

function check() {
    var last = document.querySelector("#last").value;
    var first = document.querySelector("#first").value;
    var genderRadio = document.querySelector("input[name='gender']:checked");
    var marriedRadio = document.querySelector("input[name='mariage']:checked");
    var maidename = document.querySelector("#maidename").value;
    last = Trim(last);
    first = Trim(first);
    maidename = Trim(maidename);

    if(last == ""){
    	alert("Last name should not be empty!");
    } else if (first == "") {
        alert("First name should not be empty!");
    } else if (genderRadio == null){
    	alert("Please select gender!");
    } else {
    	if(genderRadio.value == "male")
    		return true;
    	else {
    		if (marriedRadio == null)
    			alert("Please select married or not!");
    		else {
    			if(marriedRadio.value == "no")
    				return true;
    			else{
    				if(maidename=="")
                        alert("Maiden name should not be empty!")
                    else
                        return true;
    			}
    		}
    	}
    }
    //alert(maidename.length);
    return false; // must be changed!
}

function cancel() {
    var married = document.getElementById("married");
    var maiden = document.getElementById("maiden");
    married.setAttribute("class","hide input");
    maiden.setAttribute("class","hide input");
}

function showMariage() {
    var genderRadio = document.querySelector("input[name='gender']:checked");
    var married = document.getElementById("married");
    var maiden = document.getElementById("maiden");
    if (genderRadio.value == "female"){
    	married.setAttribute("class","input");
    }else{
    	married.setAttribute("class","hide input");
        maiden.setAttribute("class","hide input");
    }
}

function showMaiden() {
    var marriedRadio = document.querySelector("input[name='mariage']:checked");
    var maiden = document.getElementById("maiden");
    	if(marriedRadio.value == "yes"){	
    		maiden.setAttribute("class","input");
    	}
    	else{
    		maiden.setAttribute("class","input hide");
    	}
}
