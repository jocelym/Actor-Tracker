let search_actor = document.getElementById('searchActor');
let actor_name = document.getElementById('actorName');
let actor_other_movies = document.getElementById('actorOtherMovies');
let image = '';
/*chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
}); */

search_actor.onclick = function() {
  //chrome.runtime.sendMessage("hi!");

  var foundName = "Famous Person";
  var foundOtherMovies = "Cool Movies"
  document.getElementById("actorName").innerHTML = (
    "Actor Name: " + foundName);
  document.getElementById("actorOtherMovies").innerHTML = (
    "Also in: " + foundOtherMovies);
  alert("buttonPressed!")

//  var results = chrome.tabs.executeScript(null, {file: 'content.js'});
  /*  chrome.tabs.executeScript(null, {
        code: "alert(document.querySelector('h4').textContent)"
    }); */
    chrome.tabs.executeScript(null, {file: 'getShowInfo.js'},
      recieveText);

    console.log("backtoscript");

  //});
}

function recieveText (resultsArray){
  alert(resultsArray[0]);
  var res = resultsArray[0].split("*");
  var nameToSearch = res[0];
  var showToSearch = res[1];
  alert(nameToSearch);
  if (showToSearch != undefined){
    console.log("emptyField!");
    showToSearch = "";

  }
  alert(showToSearch);
  chrome.tabs.captureVisibleTab(null, {} , function(image) {
    console.log(image);
  });

  fetch("https://northamerica-northeast1-shehacks21.cloudfunctions.net/getSchoolInfo" + ("?name=MEC"))
    .then(response => response.json())
    .then(result => console.log(result));

}
