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
