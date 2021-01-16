let search_actor = document.getElementById('searchActor');
let actor_name = document.getElementById('actorName');
let actor_other_movies = document.getElementById('actorOtherMovies');
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
  //chrome.tabs.captureVisibleTab(null,{},function(dataUrl){alert(dataUrl);});




  /*chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // Something
    let url = tabs[0].url;
    //let note = notesField.value;
    chrome.tabs.sendMessage(tabs[0].id, "hi" , _ => {
      console.log("Added Note: '");
    });*/
    /*chrome.tabs.executeScript(null, {
        code: "alert(document.querySelector('p').innerText)"
    }); */
    chrome.tabs.executeScript(null, {file: 'content.js'});

  //});
}
