function getWord(name,url) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function titleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var url = window.location.href;
var word = getWord('q',url);
console.log(word);
var rawResult, result, output;
result = {}
var searchTerm = "https://api.urbandictionary.com/v0/define?term=" + word;

// Word: list.0.word
// Defination: list.0.defination
// Example: list.0.example
// Reference: tags[0,1,2]
// Link: list.0.permalink

$.getJSON(searchTerm, function(data) {
    console.log(data);
    result.word = data.list[0].word;
    console.log(result.word);
    result.defination = data.list[0].definition;
    console.log(result.defination);
    result.example = data.list[0].example;
    console.log(result.example);
    result.reference = titleCase(data.tags[0]) + ", " + titleCase(data.tags[1]) + ", " + titleCase(data.tags[2]);
    console.log(result.reference);
    result.link = data.list[0].permalink;
    console.log(result.link);
    output = '<div class="demo-card-event mdl-card mdl-shadow--2dp"> <div class="mdl-card__title mdl-card--expand"> <h4><b>' + titleCase(result.word) + '</b></h4><p class="card-body"><b>Urban Defination</b></br>' + result.defination + '</br><b>Example</b></br>' + result.example + '</br><b>Referenced with</b></br>' + result.reference + '</p> </div> <div class="mdl-card__actions mdl-card--border"> <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="'+ result.link + '">More results</a> </div>';
    $(output).insertBefore("#taw");
    
});