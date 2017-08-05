function getWord(name,url) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var url = window.location.href;
var word = getWord('q',url);
console.log(word);
var rawResult, result, output;
result = {}
var searchTerm = "https://api.urbandictionary.com/v0/define?term=" + word;


$.getJSON(searchTerm, function(data) {
    console.log(data);

    result.word = data.list[0].word;
    console.log(result.word);
    result.defination = data.list[0].definition;
    console.log(result.defination);
    result.example = data.list[0].example;
    console.log(result.example);
    result.reference = [data.tags[0], data.tags[1], data.tags[2]];
    result.reference = result.reference.join();
    console.log(result.reference);
    result.link = data.list[0].permalink;
    console.log(result.link);

    output = '<div class="cardc3"> <div class="containerc3"><h3 class="card-header">Urban word: ' + result.word + '</h5> <p class="card-body"><b>Defination</b></br>' + result.defination + '</br><b>Example</b></br>' + result.example + '</br><b>Referenced with</b></br>' + result.reference + '</p> <div class="card-footer center text-center"><p><a href="' + result.link + '">More results</a></p></div> </div></div>';

    $(output).insertAfter("#extabar");
    
});

// Word: list.0.word
// Defination: list.0.defination
// Example: list.0.example
// Reference: tags[0,1,2]
// Link: list.0.permalink




