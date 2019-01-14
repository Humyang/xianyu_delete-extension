chrome.browserAction.onClicked.addListener(function callback() {
    blockList = JSON.parse(localStorage.getItem('blockList')) || []
    sendMsg({ blockList })
})

function sendMsg(obj) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, obj, function (response) { });
    });
}
chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        localStorage.setItem('blockList',JSON.stringify(msg.blockList))
    });
});