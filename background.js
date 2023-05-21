// When the browser-action button is clicked...
chrome.action.onClicked.addListener(function (tab) {
  console.log("browser-action clicked");

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });

});
