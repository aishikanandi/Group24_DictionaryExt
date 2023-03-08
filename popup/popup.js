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

let wordef,
  word,
  phonetic,
  pos,
  defin,
  example,
  sourceurl,
  index = 0,
  indlimit;

async function dictionary(query) {
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`;
  let response = await fetch(url);
  wordef = await response.json();
  if (wordef && !wordef.title) {
    indlimit = wordef[0].meanings.length;
    word = wordef[0].word;
    phonetic = wordef[0].phonetic ? wordef[0].phonetic : "";
    sourceurl = `https://en.wiktionary.org/wiki/${word}`;
    index = 0;

    setValues();

    if (indlimit > 1) {
      document
        .getElementById("navigatecontainer")
        .classList.remove("hidenavigator");
    }
  } else if (wordef.title) {
    document.getElementById("error").innerHTML = "⚠  " + wordef.title;
  }
}


