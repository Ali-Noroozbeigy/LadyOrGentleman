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

function makeVisible(savedGender){
    document.getElementById("saved-answer").style.display = "block";
    document.getElementById("saved-answer").textContent = "Saved Answer: " + savedGender;
    document.getElementById("clear-button").style.display = "block";
}

function makeInvisible(){
    document.getElementById("saved-answer").style.display = "none";
    document.getElementById("clear-button").style.display = "none";
}

function showSavedAnswer(name){
    var savedGender = localStorage.getItem(name);
    if (savedGender){
        makeVisible(savedGender);
    }else{
        makeInvisible();
    }
}
function submitHandler(event){
    event.preventDefault();
    var name = document.getElementById("name").value;
    showPrediction(name);
    showSavedAnswer(name);
}

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
