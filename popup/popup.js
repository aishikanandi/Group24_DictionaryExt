let query = { active: true, currentWindow: true };

chrome.tabs.query(query, gotTabs);
function gotTabs(tabs) {
  let msg = {
    txt: "hello from popup",
  };

  chrome.tabs.sendMessage(tabs[0].id, msg, function (response) {
    if (!response) {
      document.getElementById("phonetic").innerHTML = "Welcome!";
      document.getElementById("example").innerHTML =
        "Please select a word to find its definition.";
    } else if (response.swor === "_TextNotSelected_") {
      document.getElementById("error").innerHTML = "Please select a word!";
    } else {
      let swo = response.swor;
      swo = swo.replace(/[^a-zA-Z ]/g, "");
      dictionary(swo);
    }
  });
}
