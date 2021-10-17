chrome.extension.onMessage.addListener(
  function (req, sender, callback) {
    if (req.type === "config") {
      callback();
    }
  }
);
