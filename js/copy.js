var hotkeys = [];
chrome.extension.sendMessage(
  { "type" : "config" },
  function () {
    document.addEventListener('copy', async function (event) {
      var clipboardData = event.clipboardData || window.clipboardData;
      if (!clipboardData) return
      var copyText = window.getSelection().toString();
      var pageUrl = window.location.href
      let encodedUrl = encodeURI(pageUrl.split('#')[0])
      if (copyText) {
        encodedUrl += '#:~:text=' + copyText
      }

      if (!copyText) return
      event.preventDefault();
      var cliboardHTMLData = new Blob([`
          <a
          href="${encodedUrl}"
          title="${document.title}" 
          id="${guid()}"
          type="smartlink-inline"
          data-target-id="${encodedUrl}"
          data-target-type="webs"
          data-target-origin-text="${copyText}">${copyText}</a>
        `], { type: 'text/html' })
      var cliboardTextData = new Blob([copyText], { type: 'text/plain' })
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': cliboardHTMLData,
          'text/plain': cliboardTextData
        })
      ]);
    });
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