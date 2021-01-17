var search_actor = document.getElementById('searchActor');
var actor_name = document.getElementById('actorName');
var actor_other_movies = document.getElementById('actorOtherMovies');
var image = '';
var returnedName = "";

search_actor.onclick = function() {
  //chrome.runtime.sendMessage("hi!");
/*
  var foundName = "Famous Person";
  var foundOtherMovies = "Cool Movies"
  document.getElementById("actorName").innerHTML = (
    "Actor Name: " + foundName);
  document.getElementById("actorOtherMovies").innerHTML = (
    "Also in: " + foundOtherMovies);
*/

//  var results = chrome.tabs.executeScript(null, {file: 'content.js'});
  /*  chrome.tabs.executeScript(null, {
        code: "alert(document.querySelector('h4').textContent)"
    }); */
    chrome.tabs.executeScript(null, {file: 'getShowInfo.js'},
      recieveText);

    console.log(returnedName);

  //});
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "hello")
      console.log("YES");

    chrome.tabs.executeScript(null, {file: 'getShowInfo.js'},
        recieveText);

});


function recieveText (resultsArray){
  var res = resultsArray[0].split("*");
  var nameToSearch = res[0];
  var showToSearch = res[1];

  if (showToSearch != undefined){
    console.log("emptyField!");
    showToSearch = "";
  }
  //alert(showToSearch);
  chrome.tabs.captureVisibleTab(null, {} , function(image) {
    //console.log(image);
  });

var fetchResponse;
  fetch("https://northamerica-northeast1-shehacks21.cloudfunctions.net/getActorInfo") //+ ("?name=MEC"))
    .then(response => response.json())
    .then((data) => {

      var numObjects = (Object.keys(data['Actors']).length);
      alert(numObjects);
      var pos;
      for (pos = 0; pos < numObjects; pos++ ){

      } 

      document.getElementById("actorName").innerHTML = (
        "Actor Name: " + data['Actors'][0]["Name"]);
      addToHistory(data['Actors'][0]["Name"]);

      var img = document.createElement('img');
      img.src = (data['Actors'][0]["Image"]);
      document.getElementById("actorPhoto").append(img);

      document.getElementById("born").innerHTML = (
        "Born: " + data['Actors'][0]['Born']);

      document.getElementById("actorOtherMovies").innerHTML = (
        "May have seen them in: " + data['Actors'][0]['Known For']);


      console.log(data);
    })
  //console.log(fetchResponse);

/*  document.getElementById("actorName").innerHTML = (

  let returnedName = "";
  fetch("https://northamerica-northeast1-shehacks21.cloudfunctions.net/getSchoolInfo" + ("?name=MEC"))
    .then(response => response.json())
    .then(result => console.log(result));


  alert(returnedData.name);


  /*document.getElementById("actorName").innerHTML = (

    "Actor Name: " + foundName);
  document.getElementById("actorOtherMovies").innerHTML = (
    "Also in: " + foundOtherMovies);*/


}

function addToHistory (pastName){
  var ul = document.getElementById("pastSearches");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(pastName));
  ul.appendChild(li);
  console.log("history added!");
}
