var hotkeys = [];
var copyCommand = 'Control,Shift,C'
chrome.extension.sendMessage(
  { "type" : "config" },
  function () {
    // Tips: 两种方法都不支持 http
    // 1. 往剪贴板写入多种格式
    // document.body.addEventListener('copy', async function (event) {
    //   event.preventDefault()
    //   var pageUrl = window.location.href
    //   var encodedUrl = encodeURI(pageUrl.split('#')[0])
    //   var copyText = window.getSelection().toString();
    //   encodedUrl += '#:~:text=' + copyText

    //   var cliboardHTMLData = new Blob([`<a
    //     href="${encodedUrl}"
    //     title="${document.title}" 
    //     id="${guid()}"
    //     type="smartlink-inline"
    //     data-target-id="${encodedUrl}"
    //     data-target-type="webs"
    //     data-target-origin-text="${copyText}">${copyText}</a>`], { type: 'text/html' })
    //   var cliboardTextData = new Blob([copyText], { type: 'text/plain' })
    //   await navigator.clipboard.write([
    //     new ClipboardItem({
    //       'text/html': cliboardHTMLData,
    //       'text/plain': cliboardTextData
    //     })
    //   ]).then(() => {
    //     console.info('write successfully')
    //   }).catch(error => {
    //     console.error(error)
    //   });
    // })
    // 2. 发请求传递原始数据
    document.body.addEventListener('keydown', function (event) {
      if ((event.metaKey && event.keyCode === 67) || (event.ctrlKey && event.keyCode === 67)) {
        var copyText = window.getSelection().toString();
        var pageUrl = window.location.href
        var encodedUrl = encodeURI(pageUrl.split('#')[0])
        if (copyText) {
          encodedUrl += '#:~:text=' + copyText
          const linkData = {
            "text": copyText,
            "href": encodedUrl,
            "title": document.title,
            "id": guid(),
            "type": 'smartlink-inline',
            "data-target-id": encodedUrl,
            "data-target-type": 'webs',
            "data-target-origin-text": copyText
          }
          fetch(`http://127.0.0.1:7398`, {
            method: 'POST',
            body: JSON.stringify(linkData),
            mode: 'no-cors',
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          }).catch(error => {
            console.log(error)
          })
          // fetch(`http://127.0.0.1:7398?data=${JSON.stringify(linkData)}`, { mode: 'no-cors' })
          //   .catch(error => {
          //     console.error(error)
          //   })
        }
      }
    }, false)
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
