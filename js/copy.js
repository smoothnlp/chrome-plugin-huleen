var hotkeys = [];
var copyCommand = 'Control,Shift,C'
chrome.extension.sendMessage(
  { "type" : "config" },
  function () {
    document.body.addEventListener('keydown', function (event) {
      hotkeys.push(event.key)
      if (hotkeys.length > 3) {
        hotkeys.shift()
      }
      console.log(hotkeys.toString())
      if (hotkeys.toString() === copyCommand) {
        event.preventDefault()
      }
    }, false)
    document.body.addEventListener('keyup', autoCopy, false)
  }
);


function guid(rawid = '') {
  rawid = rawid ? rawid : 'xyxxxxxyx'
  let formatter = rawid + '-xxxyxxx-xxxxxxxx'
  return formatter.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

function autoCopy(event) {
  console.log(hotkeys)
  if (hotkeys.toString() === copyCommand) {
    var copyText = window.getSelection().toString();
    var pageUrl = window.location.href
    var encodedUrl = encodeURI(pageUrl.split('#')[0])
    if (copyText) {
      encodedUrl += '#:~:text=' + copyText
    }
    chrome.extension.sendMessage({
      "text": copyText,
      "href": encodedUrl,
      "title": document.title,
      "id": guid(),
      "type": 'smartlink-inline',
      "data-target-id": encodedUrl,
      "data-target-type": 'webs',
      "data-target-origin-text": copyText
    });
  }
}
