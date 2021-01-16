
var noteCount = 0;
init_notes();

function clear_notes() {
  document.querySelectorAll('.htn-sticky-note-class').forEach(e => e.remove());
  noteCount = 0;
}

function add_notes(notes) {
  var body = document.getElementsByTagName("body")[0];
  for (let i = 0; i < notes.length; i++) {
    console.log('pls work');
    noteCount += 1;
    var noteNode = document.createElement("div");
    noteNode.setAttribute("id", "htn-sticky-note-" + noteCount);
    noteNode.setAttribute("class", "htn-sticky-note-class");
    noteNode.innerText = notes[i];
    noteNode.setAttribute("size", notes[i].length);
    noteNode.style.left = (noteCount - 1) * 200 + "px";
    noteNode.style.top = 10 + "px";
    body.prepend(noteNode);
    draggable(document.getElementById("htn-sticky-note-" + noteCount));
  }
}

function draggable(DOMelement) {
  var x1 = 0,
    y1 = 0,
    x2 = 0,
    y2 = 0;
  if (document.getElementById("sticky-notes-tut")) {
    document.getElementById("sticky-notes-tut").onmousedown = dragMouseDown;
  } else {
    DOMelement.onmousedown = dragMouseDown;
  }

  function dragMouseDown(event) {
    event = event || window.event;
    event.preventDefault();
    x2 = event.clientX;
    y2 = event.clientY;
    document.onmouseup = function () {
      document.onmouseup = null;
      document.onmousemove = null;
    };
    document.onmousemove = elementDrag;
  }

  function elementDrag(event) {
    event = event || window.event;
    event.preventDefault();
    x1 = x2 - event.clientX;
    y1 = y2 - event.clientY;
    x2 = event.clientX;
    y2 = event.clientY;
    DOMelement.style.top = DOMelement.offsetTop - y1 + "px";
    DOMelement.style.left = DOMelement.offsetLeft - x1 + "px";
  }
}
///// EDIT CODE BELOW THIS LINE
function init_notes() {
  let url = document.URL;
  chrome.storage.local.get(document.URL, notes => {
    if (notes[url]) {
      add_notes(notes[url]);
    }
  });
}

chrome.runtime.onMessage.addListener(
  (request, _, sendResponse) => {
    if (request.action == "clear") {  // Delete All Notes on the Page
      clear_notes();
      sendResponse({status: "complete"});
      console.log('pls work');

    }
    else if (request.action == "add") { // Add New Notes to Page
      add_notes(request.notes);
      sendResponse({status: "complete"});
    } 
    else {
      sendResponse({status: "error"});
    }
  }
);

if (window == top) {
  window.addEventListener('keyup', doKeyPress, false); //add the keyboard handler
    console.log("Hello");
  }
  
  trigger_key = 71; // g key
  function doKeyPress(e){
    if (e.shiftKey && e.keyCode == trigger_key){ // if e.shiftKey is not provided then script will run at all instances of typing "G"
      console.log('Hi!');
      console.log("Hello again");

      chrome.tabs.captureVisibleTab((screenshotUrl) => {
        const string = chrome.extension.getURL('screenshot.html?id=' + id++)
        let targetId = null;
      })
    }
  }






