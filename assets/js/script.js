
var animals = ["cat", "dog", "bird", "hourse", "bear", "monkey", "lion", "elephant", "frog", "penguin"];
var people = ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Stan Lee", "Tim Burton", "Vicente Fox", "Peña Nieto"];

var queryURL = "";



function fillDropDown(arr, drop) {

    for (let i = 0; i < arr.length; i++) {
        var newA = $('<a href="#">');
        newA.addClass("dropdown-item link");
        newA.text(arr[i]);
        $("#" + drop).append(newA);
    }

}
function addFavorties(text) {
    var newA = $('<a href="#">');
    newA.addClass("dropdown-item link");
    newA.text(text);
    $("#favorites").append(newA);

    $("#favBtn").removeClass("btn-secondary");
    $("#favBtn").addClass("btn-primary");
    //$(".dropdown-toggle").dropdown("toggle");
}
function getInfo(topic) {
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=RmVXogtzPZvYakJ20F6frjz8Gi73Ns3M&q=" + topic + "&limit=10&offset=0&rating=PG&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (res) {
        $("#cardHolder").empty();
        var results = res.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {

            var newCard = $("<div>");
            newCard.addClass("card cardS text-white bg-dark");
            
            var gifImg = results[i].images.downsized.url;
            var stillImg = results[i].images.downsized_still.url;

            var cardImg = $("<img>");
            cardImg.addClass("card-img-top");
            cardImg.attr("src", stillImg);
            cardImg.attr("data-still",stillImg);
            cardImg.attr("data-animate",gifImg);
            cardImg.attr("data-state","still");

            var cardBody = $("<div>");
            cardBody.addClass("card-body");

            var carP1 = $("<p>").text("Ratinf: " + results[i].rating);
            var carP2 = "";
            if (results[i].source_tld === "")
                carP2 = $("<p>").text("Source: Not provided");
            else
                carP2 = $("<p>").text("Source: " + results[i].source_tld);


            cardBody.prepend(carP2);
            cardBody.prepend(carP1);
            newCard.prepend(cardBody);
            newCard.prepend(cardImg);

            $("#cardHolder").append(newCard);
        }
    });
}
$(document).ready(function () {

    fillDropDown(animals, "animals");
    fillDropDown(people, "people");

    $("#add").on("click", function () {
        var value = $("#favTxt").val();
        if (value !== "") {
            addFavorties(value);
            $("#favTxt").val("");
        }
    });
    
    $(document).on("click", ".link", function () {
        var topic = $(this).text();
        getInfo(topic);
    });
    $(document).on ("click", ".card-img-top", function () {
        var state = $(this).attr("data-state");
        if(state==="still"){
            $(this).attr("src",$(this).attr("data-animate"));
            $(this).attr("data-state","animate");
          }else if (state==="animate"){
            $(this).attr("src",$(this).attr("data-still"));
            $(this).attr("data-state","still");
          }
    });
    
});
