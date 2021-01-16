function getShowName(){
  alert ("Getting name!")
  return ("hi");
}


chrome.runtime.onMessage.addListener(
  (request, _, sendResponse) => {
    if (request.action == "getName") {  // Delete All Notes on the Page
      getShowName();
      sendResponse({showName: "BLAH"});
    }
    else {
      sendResponse({status: "error"});
    }
  }
);
