chrome.extension.onMessage.addListener(
  function (req, sender, callback) {
    // console.log(req)
    // console.log(sender)
    // console.log(callback, callback.name)
    if (req.type === "config") {
      callback();
    } else if (req.type === "smartlink-inline") {
      if (req.text && req.text.length > 0) {
        var el = document.createElement('div');
        const linkText = `
          <a
            href="${req.href}"
            title="${req.title}" 
            id="${req.id}"
            type="smartlink-inline"
            data-target-id="${req.href}"
            data-target-type="webs"
            data-target-origin-text="${req.text}">${req.text}</a>
          `
        el.innerHTML = linkText
        el.contentEditable = "true";
        document.body.appendChild(el);
        el.unselectable = "off";
        el.focus();
        document.execCommand("selectAll");
        document.execCommand("copy");
        document.body.removeChild(el);
      }
    }
  }
);
