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

chrome.runtime.onMessage.addListener (function(response, sender, sendResponse){
  alert(response);
  console.log("message!!")
  alert(document.querySelectorAll('h4').length).length;
});
