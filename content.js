// var blockList = [
//     '断翼折...'
// ]

// $('a:contains(断翼折...)').remove()
// alert('content.js')


// setTimeout(function () {
    chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
        $('.item-info-wrapper:contains(断翼折...)').remove()
    })

// }, 1000);