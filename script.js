
$(document).ready(function () {
    $(".slider").slider({ full_width: true });

    //we need to make a btn click event that fires when the searchMovie btn is clicked
    //once btn click works the btn click should fire the ajax call

    $("#searchMovieBtn").on("click", function (event) {
        event.preventDefault();
        console.log("I've been clicked");
        $(".needHide").css("display", "none")
        //search movie should equal to the value entered by the user from the input field with an id of userMovieInput
        var searchMovie = $("#userMovieInput").val().trim();
        console.log(searchMovie);
        //here we build our query url by concating var searchMovie into our hard coded url
        var queryUrl =
            "https://www.googleapis.com/youtube/v3/search?type=video&q=" +
            searchMovie +
            " official trailer&key=AIzaSyBmlD8yeHMFUIHSMRsfrVEevHRq6yR-ZBw";
        console.log(queryUrl);
        // Creating an AJAX call for the specific movie's trailer when serached

        $.ajax({
            url: queryUrl,
            method: "GET",
        }).then(function (response) {
            console.log(response.items[0].id.videoId);
            var youtubeVideoId = response.items[0].id.videoId;
            var trailerUrl = "https://www.youtube.com/watch?v=" + youtubeVideoId;

            console.log(trailerUrl);

            $("#youVid").append(`<video controls width="560" height="315"> <source type="video/mp4" src="${trailerUrl}"> </video>`);


        });

        //Rapid Api Script for Streamer
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${searchMovie}&country=us`,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
                "x-rapidapi-key": "230f5fd612msh4e36283b5d68e1bp179416jsnd53a23333929"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);

            for (var i = 0; i < response.results[0].locations.length; i++) {

                var streamApp = response.results[0].locations[i].display_name;
                console.log(streamApp);

                var streamIcon = response.results[0].locations[i].icon
                console.log(streamIcon);

                var iconEl = $("<img>")

                iconEl.attr("src", streamIcon)

                iconEl.attr("alt", streamApp)

                $("#resStream").append(`<div>${streamApp}</div>`);
                $("#resStream").append(iconEl);


                var card1 = $("<card>");
                card1.addclass()


                $("#resStream").append(`<div>${streamApp}</div>`);
                $("#resStream").append(iconEl);




                ///sytax




            }

        });

    });

});

