var search_actor = document.getElementById('searchActor');
var actor_name = document.getElementById('actorName');
var actor_other_movies = document.getElementById('actorOtherMovies');
var image = '';
var returnedName = "";
var clear_history = document.getElementById('clearHistory');

chrome.tabs.query({
  active: true,
  lastFocusedWindow: true
  }, tabs => {
  let url = tabs[0].url;
  let ul = document.getElementById("names");

  // Grab the notes for the page
  chrome.storage.local.get(url, names => {
    if (names[url]) {
      for (var i = 0; i < names[url].length; i++) {
        console.log(names[url]);
        console.log("this is the url array");
        var pastName = names[url][i];
        var ul = document.getElementById("pastSearches");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(pastName));
        ul.appendChild(li);
        console.log("history added!");
      }
    }
  });
});

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
  clearLists();
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
  fetch("https://northamerica-northeast1-shehacks21.cloudfunctions.net/getActorInfoHP") //+ ("?name=MEC"))
    .then(response => response.json())
    .then((data) => {

      var numObjects = (Object.keys(data['Actors']).length);
    //  alert(numObjects);
      var pos;
      for (pos = 0; pos < numObjects; pos++ ){
        document.getElementById("actorName" + pos).innerHTML = (
          "Actor Name: " + data['Actors'][pos]["Name"]);
        addToHistory(data['Actors'][pos]["Name"], data['Actors'][pos]["Link"]);

        var img = document.createElement('img');
        img.src = (data['Actors'][pos]["Image"]);
        document.getElementById("actorPhoto" + pos).append(img);

        document.getElementById("born" + pos).innerHTML = (
          "Born: " + data['Actors'][pos]['Born']);

        var linkText = "More Info Here"
        var result = linkText.link(data['Actors'][pos]['Link'])
        document.getElementById("actorLink" + pos).innerHTML = (result);

          var numMovObjects = (Object.keys(data['Actors'][pos]["Known For"]).length);
        //  alert (numMovObjects);



        document.getElementById("alsoIn" + pos).innerHTML = ("Also In:")
        var ul = document.getElementById("actorOtherMovies"+pos);
          for(movPos = 0; movPos < numMovObjects; movPos++){
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(data['Actors'][pos]['Known For'][movPos]));
            ul.appendChild(li);

          }


      }



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

function clearLists(){
  var num;
  for (num = 0; num < 3; num++){
    var list = document.getElementById("actorOtherMovies" + num);
    while (list.hasChildNodes()){
      list.removeChild(list.firstChild);
    }

    document.getElementById("actorPhoto" + num).innerHTML = "";
  }


}

// Save Note
function addToHistory(pastName, link) {
  var ul = document.getElementById("pastSearches");
  var li = document.createElement("li");

  //var linkText = "More Info Here"
  //var result = linkText.link(data['Actors'][pos]['Link'])
  li.appendChild(document.createTextNode(pastName));
  ul.appendChild(li);
  console.log("history added!");


  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // Something
    let url = tabs[0].url;
    let name = pastName;
    chrome.storage.local.get(url, names => {
      if (names[url])
        names[url].push(name);
      else
        names[url] = [name];
      chrome.tabs.sendMessage(tabs[0].id, {names: [name], action: "add"}, _ => {
        console.log("Added Name: "+ name);
      });
      chrome.storage.local.set(names);
    });
  });
  //location.reload();

};

/*
function addToHistory (pastName){
  var ul = document.getElementById("pastSearches");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(pastName));
  ul.appendChild(li);
  console.log("history added!");
}
*/

// Delete Notes
clear_history.onclick = function () {
  console.log("history button clicked");
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, tabs => {
    let url = tabs[0].url;
    chrome.storage.local.get(url, names => {
      names[url] = []
      chrome.storage.local.set(names);
      chrome.tabs.sendMessage(tabs[0].id, {names: names[url], action: "clear"}, _ => {
        console.log("Cleared page");
        location.reload();
      });
    });
  });
}
