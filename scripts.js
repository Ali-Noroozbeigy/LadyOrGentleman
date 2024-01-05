function submitHandler(event){
    event.preventDefault();
    var name = document.getElementById("name").value;
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
    var savedGender = localStorage.getItem(name);
    if (savedGender){
        document.getElementById("saved-answer").style.display = "block";
        document.getElementById("saved-answer").textContent = "Saved Answer: " + savedGender;
        document.getElementById("clear-button").style.display = "block";
    }else{
        document.getElementById("saved-answer").style.display = "none";
        document.getElementById("clear-button").style.display = "none"
    }
}

function saveHandler(event){
    event.preventDefault();
    var name = document.getElementById("name").value;
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
      if (gender.toLowerCase() !== "gender" && gender.toLowerCase() !== "unknown"){
          localStorage.setItem(name, gender);
          alert("Data saved successfully with prediction!");
          document.getElementById("saved-answer").style.display = "block";
          document.getElementById("saved-answer").textContent = "Saved Answer: " + gender;
          document.getElementById("clear-button").style.display = "block";
          return;
      }
      alert("There is no data to save!");
      return;
    }

    localStorage.setItem(name, selectedGender);
    alert("Data saved successfully with user knowledge!");
    document.getElementById("saved-answer").style.display = "block";
    document.getElementById("saved-answer").textContent = "Saved Answer: " + selectedGender;
    document.getElementById("clear-button").style.display = "block";
}

function clearHandler(event){
    event.preventDefault();
    var name = document.getElementById("name").value;
    if (!name){
        alert("No name to clear!");
        return;
    }
    localStorage.removeItem(name);
    document.getElementById("saved-answer").style.display = "none";
    document.getElementById("clear-button").style.display = "none"
    alert("Data removed successfully!")
}
