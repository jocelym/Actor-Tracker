if (window == top) {
    window.addEventListener('keyup', doKeyPress, false); //add the keyboard handler
      console.log("Hello");
    }
    
    trigger_key = 71; // g key
    function doKeyPress(e){
      if (e.shiftKey && e.keyCode == trigger_key){ // if e.shiftKey is not provided then script will run at all instances of typing "G"
        alert('Hi!');
        console.log("help");
        chrome.tabs.captureVisibleTab((screenshotUrl) => {
            const string = chrome.extension.getURL('screenshot.html?id=' + id++)
            let targetId = null;
          })
      }
    }

