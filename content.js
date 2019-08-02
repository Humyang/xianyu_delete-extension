// var blockList = [
//     '断翼折...'
// ]

// $('a:contains(断翼折...)').remove()
// alert('content.js')

var blockList = []

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    // console.log('msg',msg)
    blockList = msg.blockList
    removeBlockList()
})
function removeBlockList(){
    console.log('remove')
    for (let index = 0; index < blockList.length; index++) {
        const element = blockList[index];
        $(`.item-info-wrapper:contains(${element})`).remove()
    }
}

$('.item-info-wrapper').append("<span href='#' class='delete'>delete</span>")
$('body').on('click','.delete',function(event){  
    let name = $(this).parents('.item-info-wrapper').find('.seller-nick a.seller-nick-name').text()
    blockList.push(name)
    sendMsg(blockList)
    removeBlockList(blockList)
})
function sendMsg(blockList){
    chrome.runtime.connect().postMessage({blockList});
}