/*this function first makes a fetch request to get data, then based on received data updates
the content of html elements*/
function showPrediction(name){
    var apiUrl = "https://api.genderize.io/?name=" + encodeURIComponent(name);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Handle the API response here
        var gender = document.getElementById("gender");
        var prob = document.getElementById("prob");
        if (data.gender && data.probability){
            gender.textContent = data.gender;
            prob.textContent = data.probability;
        }
        else if(data.gender){
            gender.textContent = data.gender;
            prob.textContent = "Unknown";
        }
        else if (data.probability){
            gender.textContent = "Unknown";
            prob.textContent = data.probability;
        }
        else{
            gender.textContent = "Unknown";
            prob.textContent = "Unknown";
        }
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
}

/* this function makes saved answer area visible*/
function makeVisible(savedGender){
    document.getElementById("saved-answer").style.display = "block";
    document.getElementById("saved-answer").textContent = "Saved Answer: " + savedGender;
    document.getElementById("clear-button").style.display = "block";
}

/*this function makes saved answer area invisible*/
function makeInvisible(){
    document.getElementById("saved-answer").style.display = "none";
    document.getElementById("clear-button").style.display = "none";
}

/*this function decides whether to show saved answer or not based on name being saved in storage*/
function showSavedAnswer(name){
    var savedGender = localStorage.getItem(name);
    if (savedGender){
        makeVisible(savedGender);
    }else{
        makeInvisible();
    }
}
/*this function handles submit event when user clicks on submit button
* at first, checks prediction and then shows the saved answer if any*/
function submitHandler(event){
    event.preventDefault();
    var name = document.getElementById("name").value;
    showPrediction(name);
    showSavedAnswer(name);
}

/*in this function, a new gender for a name is being saved.
* first, we check if any of radio buttons are checked or not, if checked, the new gender will be based on radio
* buttons and user knowledge has priority. if no radio button is check, the predicted gender will be saved.
* if predicted is unknown, no data is being saved.*/
function saveGender(name){
    var gender = document.getElementById("gender").textContent;
    var genderRadios = document.getElementsByName("gender");
    var selectedGender = "";

    var isGenderSelected = false;
    for (var i = 0; i < genderRadios.length; i++) {
      if (genderRadios[i].checked) {
        selectedGender = genderRadios[i].value;
        isGenderSelected = true;
        break;
      }
    }

    if (!isGenderSelected) {
      if (gender.toLowerCase() !== "unknown"){
          localStorage.setItem(name, gender);
          showSavedAnswer(name);
          alert("Data saved successfully with prediction!");
          return;
      }
      alert("There is no data to save!");
      return;
    }

    localStorage.setItem(name, selectedGender);
    showSavedAnswer(name);
    alert("Data saved successfully with user knowledge!");
}

/*this function handles click on save button
* first fetches prediction as mentioned in document, then saves the gender based on radio buttons or prediction*/
function saveHandler(event){
    event.preventDefault();
    var name = document.getElementById("name").value;
    if (!name){
        alert("No name to save!");
        return;
    }

    showPrediction(name);
    saveGender(name);
}

/*this function removes saved gender for a name*/
function clearHandler(event){
    event.preventDefault();
    var name = document.getElementById("name").value;
    if (!name){
        alert("No name to clear!");
        return;
    }
    localStorage.removeItem(name);
    makeInvisible();
    alert("Data removed successfully!")
}
