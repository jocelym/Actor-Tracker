/*function getShowName(){
  alert ("Getting name!")
  return ("hi");
}


chrome.runtime.onMessage.addListener(
  (request, _, sendResponse) => {
    if (request.action == "getShowName") {  // Delete All Notes on the Page
      getShowName();
      sendResponse({showName: "BLAH"});
    }
    else {
      sendResponse({status: "error"});
    }
  }
); */

//chrome.runtime.sendMessage("HI!");

/*chrome.runtime.onMessage.addListener (function(response, sender, sendResponse){
  alert(response);
  console.log("message!!")
  alert(document.querySelectorAll('h4').length).length;
});*/

if (window == top) {
  window.addEventListener('keyup', doKeyPress, false); //add the keyboard handler
    console.log("Hello");
  }
  
  trigger_key = 71; // g key
  function doKeyPress(e){
    if (e.shiftKey && e.keyCode == trigger_key){ // if e.shiftKey is not provided then script will run at all instances of typing "G"
      console.log('Hi!');
      console.log("Hello again");

      chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
        console.log(response.farewell);
      });

    }

  }


//(document.querySelector('h4').textContent + "-" + document.querySelector('span').textContent );


//alert (document.querySelector('h4').textContent + document.querySelector('span').textContent );
//alert (document.querySelector('span').textContent);

