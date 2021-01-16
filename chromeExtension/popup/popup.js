let search_actor = document.getElementById('searchActor');
let actor_name = document.getElementById('actorName');
let actor_other_movies = document.getElementById('actorOtherMovies');
/*chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
}); */

search_actor.onclick = function() {
  var foundName = "Famous Person";
  var foundOtherMovies = "Cool Movies"
  document.getElementById("actorName").innerHTML = (
    "Actor Name: " + foundName);
  document.getElementById("actorOtherMovies").innerHTML = (
    "Also in: " + foundOtherMovies);
  alert("buttonPressed!")


};
