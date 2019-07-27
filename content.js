function getWord(name, url) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(url);
  return results == null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function titleCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var url = window.location.href;
var word = getWord("q", url).split(" ")[1];
console.log(word);
var rawResult, result, output;
result = {};
var searchTerm = "https://urban--jajoosam.repl.co/api?word=" + word;

// Word: list.0.word
// Defination: list.0.defination
// Example: list.0.example
// Reference: tags[0,1,2]
// Link: list.0.permalink
if (getWord("q", url).includes("define")) {
  if (document.querySelector(".vmod")) {
    fetch(searchTerm)
      .then(j => j.json())
      .then(data => {
        console.log(data);
        result.word = data.list[0].word;
        console.log(result.word);
        result.defination = data.list[0].definition;
        console.log(result.defination);
        result.example = data.list[0].example;
        console.log(result.example);
        result.reference = data.tags
          ? data.tags.join(", ")
          : "Nothing we know of 😕";
        console.log(result.reference);
        result.link = data.list[0].permalink;
        console.log(result.link);
        output = `<div>
      <div>
        <div>
          <i><span style="font-size:14px">urban</span></i>
        </div>
        <div class="xpdxpnd vk_gy">
          <span>💩 view on <a href="${result.link}">urban dictionary</a></span>
        </div>
      </div>
      <ol class="lr_dct_sf_sens">
        <li>
          <div class="vmod">
            <div class="lr_dct_sf_sen Uekwlc XpoqFe">
              <div style="float:left"><span>1</span>.</div>
              <div style="margin-left:20px">
                <div class="PNlCoe XpoqFe">
                  <div style="display:inline" data-dobid="dfn">
                    <span>${result.defination}</span>
                  </div>
                  <span class="vmod"
                    ><div class="vk_gy">${result.example.replace(
                      /(?:\r\n|\r|\n)/g,
                      "<br>"
                    )}</div></span
                  >
                </div>
              </div>
            </div>
          </div>
        </li>
      </ol>
    </div>
    `;
        let elem = document.createElement("span");
        elem.innerHTML = output;
        let par = document.querySelector(`.vmod`);
        par.insertBefore(elem, document.querySelectorAll(".vmod")[1]);
      });
  } else {
    fetch(searchTerm)
      .then(j => j.json())
      .then(data => {
        if (data.list[0].word.toLowerCase() == word.toLowerCase()) {
          console.log(`inewsaz`);
          console.log(data);
          result.word = data.list[0].word;
          console.log(result.word);
          result.defination = data.list[0].definition;
          console.log(result.defination);
          result.example = data.list[0].example;
          console.log(result.example);
          result.reference = data.tags
            ? data.tags.join(", ")
            : "Nothing we know of 😕";
          console.log(result.reference);
          result.link = data.list[0].permalink;
          console.log(result.link);
          output =
            '<div class="demo-card-event mdl-card mdl-shadow--2dp"> <div class="mdl-card__title mdl-card--expand"> <h4><b>' +
            titleCase(result.word) +
            '</b></h4><p class="card-body"><b>Urban Defination</b></br>' +
            result.defination +
            "</br><b>Example</b></br>" +
            result.example.replace(/(?:\r\n|\r|\n)/g, "<br>") +
            '</br></p> </div> <div class="mdl-card__actions mdl-card--border"> <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="' +
            result.link +
            '">More results</a> </div>';
          let elem = document.createElement("span");
          elem.innerHTML = output;
          let par = document.querySelector(`#taw`);
          $(output).insertBefore("#taw");
        }
      });
  }
}
