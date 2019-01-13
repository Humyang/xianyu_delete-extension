chrome.browserAction.onClicked.addListener(function callback() {
    sendMsg({id:1})
})

function sendMsg(obj){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,obj , function(response) {});  
    });
}