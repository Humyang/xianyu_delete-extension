var a = document.querySelectorAll('.wrap a')

var s1 = document.querySelectorAll('#timeview #s1')[0]
var s2 = document.querySelectorAll('#timeview #s2')[0]
var s3 = document.querySelectorAll('#timeview #s3')[0]

for (var i = a.length - 1; i >= 0; i--) {
    a[i].addEventListener('click', function(event) {
        var t = event.target.getAttribute('data-minute')
        // clock_.clear()
        // s1.textContent = 0
        // s2.textContent = 0
        // s3.textContent = 0
        // clock_.start(t)
        // alert(123)
        chrome.runtime.connect().postMessage({t:t});
    })
}
chrome.runtime.onConnect.addListener(function(port) {
  var tab = port.sender.tab;

  // This will get called by the content script we execute in
  // the tab as a result of the user pressing the browser action.
  port.onMessage.addListener(function(info) {
    // alert(info.type)
    
    
    if(info.type === 'fromBG_End'){
      // alert(info.type)
      
    }
    if(info.type === 'fromBG_perS'){
      s1.textContent = info.rt[0]
      s2.textContent = info.rt[1]
      s3.textContent = info.rt[2]
    }
    
  });
});