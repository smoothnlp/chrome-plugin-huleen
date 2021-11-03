var hotkeys = [];
var copyCommand = 'Control,Shift,C'
chrome.extension.sendMessage(
  { "type" : "config" },
  function () {
    document.body.addEventListener('keydown', function (event) {
      if ((event.metaKey && event.keyCode === 67) || (event.ctrlKey && event.keyCode === 67)) {
        var copyText = window.getSelection().toString();
        var pageUrl = window.location.href
        var encodedUrl = encodeURI(pageUrl.split('#')[0])
        if (copyText) {
          encodedUrl += '#:~:text=' + copyText
          const linkData = {
            "text": copyText,
            "href": encodeURIComponent(encodedUrl),
            "title": document.title,
            "id": guid(),
            "type": 'smartlink-inline',
            "data-target-id": encodeURIComponent(encodedUrl),
            "data-target-type": 'webs',
            "data-target-origin-text": copyText
          }
          console.log(linkData)
          // fetch(`http://127.0.0.1:7398`, {
          //   method: 'POST',
          //   body: JSON.stringify(linkData),
          //   mode: 'no-cors',
          //   headers: new Headers({
          //     'Content-Type': 'application/json'
          //   })
          // })
          fetch(`http://127.0.0.1:7398?data=${JSON.stringify(linkData)}`, { mode: 'no-cors' })
          fetch(`https://www.huleen.com/swrite/fs/folder?nid=&merged=true`, { mode: 'no-cors' })
        }
      }
    }, false)

    // document.body.addEventListener('keyup', autoCopy, false)
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

// function autoCopy(event) {
//   // window.webkitRequestFileSystem(window.PERSISTENT, 5 * 1024 * 1024, initFs);
//   // function initFs(fs) {
//   //   console.log(fs)
//   //   fs.root.getFile
//   //     ('log.txt', { create: true, exclusive: true }, function (fileEntry) {
//   //       console.log(fileEntry)
//   //       fileEntry.isFile = true;
//   //       fileEntry.name = 'log.txt';
//   //       fileEntry.fullPath = '/log.txt';
//   //       fileEntry.createWriter(function (fileWriter) {
//   //         console.log('done')
//   //         fileWriter.seek(fileWriter.length);
//   //         var bb = new BlobBuilder();
//   //         bb.append("\n<TimeStamp>" + getTimestamp() + "</TimeStamp><Browser>Chrome</Browser><URL>" + tabURL + "</URL>\n");
//   //         fileWriter.write(bb.getBlob('text/plain'));
//   //       });
//   //     });
//   // }

//   // chrome.fileSystem.chooseEntry(
//   //   {
//   //     type: ' openWritableFile', accepts: [{
//   //       extensions: ['html']
//   //     }]
//   //   },
//   //   function (fileEntry) {
//   //     console.log(fileEntry)
//   //     //... You can call both fileEntry.file() to read or
//   //     //... fileEntry.createWriter() to write
//   //   }
//   // )

//   if (hotkeys.toString() === copyCommand) {
//     var copyText = window.getSelection().toString();
//     var pageUrl = window.location.href
//     var encodedUrl = encodeURI(pageUrl.split('#')[0])
//     if (copyText) {
//       encodedUrl += '#:~:text=' + copyText
//       const linkData = {
//         "text": copyText,
//         "href": encodeURIComponent(encodedUrl),
//         "title": document.title,
//         "id": guid(),
//         "type": 'smartlink-inline',
//         "data-target-id": encodeURIComponent(encodedUrl),
//         "data-target-type": 'webs',
//         "data-target-origin-text": copyText
//       }
//       chrome.extension.sendMessage(linkData);
//     }
//   }
// }
