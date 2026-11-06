// =====================================
// PARENT CLASS
// =====================================

class Mymovie {

    constructor(
        Title,
        Year,
        Genre,
        Runtime,
        Rating,
        Plot,
        Poster,
        Director
    ) {

        this.Title = Title;
        this.Year = Year;
        this.Genre = Genre;
        this.Runtime = Runtime;
        this.Rating = Rating;
        this.Plot = Plot;
        this.Poster = Poster;
        this.Director = Director;

    }


    // Display movie information in console
    displayInfo() {

        console.log("Title : " + this.Title);
        console.log("Year : " + this.Year);
        console.log("Genre : " + this.Genre);
        console.log("Runtime : " + this.Runtime);
        console.log("Rating : " + this.Rating);
        console.log("Director : " + this.Director);
        console.log("Plot : " + this.Plot);

    }


    // Student-written suggestion logic
    getSuggestion() {

        let rating = parseFloat(this.Rating);


        if (
            this.Genre.includes("Horror") &&
            rating >= 7
        ) {

            return "Highly recommended for horror fans because it has a strong IMDb rating.";

        }


        else if (
            this.Genre.includes("Comedy") &&
            rating >= 7
        ) {

            return "A highly rated choice for viewers who enjoy comedy movies.";

        }


        else if (
            this.Genre.includes("Crime") &&
            rating >= 7
        ) {

            return "Highly recommended for viewers who enjoy crime movies.";

        }


        else if (
            this.Genre.includes("Action") &&
            rating >= 7
        ) {

            return "A highly rated action movie worth adding to your watchlist.";

        }


        else if (
            this.Genre.includes("Sci-Fi") &&
            rating >= 7
        ) {

            return "Highly recommended for viewers who enjoy science fiction movies.";

        }


        else if (rating >= 8) {

            return "Highly recommended because of its excellent IMDb rating.";

        }


        else if (rating >= 6) {

            return "A good movie choice worth considering.";

        }


        else {

            return "This movie may suit viewers with specific movie preferences.";

        }

    }
}



// =====================================
// CHILD CLASS
// =====================================

class WatchListMovie extends Mymovie {

    constructor(
        Title,
        Year,
        Genre,
        Runtime,
        Rating,
        Plot,
        Poster,
        Director,
        Status
    ) {

        // Inherit properties from parent class
        super(
            Title,
            Year,
            Genre,
            Runtime,
            Rating,
            Plot,
            Poster,
            Director
        );

        // Property specific to WatchListMovie
        this.Status = Status;

    }


    // Method overriding
    displayInfo() {

        console.log("Title : " + this.Title);
        console.log("Year : " + this.Year);
        console.log("Genre : " + this.Genre);
        console.log("Runtime : " + this.Runtime);
        console.log("Rating : " + this.Rating);
        console.log("Status : " + this.Status);

    }

}



// =====================================
// WATCHLIST ARRAY
// =====================================

// Get previous data from Local Storage.
// If no data exists, create an empty array.

let watchlist =
    JSON.parse(localStorage.getItem("watchlist")) || [];



// =====================================
// DOM ELEMENTS
// =====================================

const movieInput =
    document.getElementById("movieInput");

const searchBtn =
    document.getElementById("searchBtn");

const movieResult =
    document.getElementById("movieResult");

const message =
    document.getElementById("message");



// =====================================
// API KEY
// =====================================

// Put your NEW OMDb API key here.

const API_KEY = "f17cffab";



// =====================================
// EVENT 1 - SEARCH BUTTON
// =====================================

searchBtn.addEventListener("click", function () {

    let movieName = movieInput.value.trim();


    // Input validation
    if (movieName == "") {

        message.textContent =
            "Please enter a movie title.";

        movieResult.innerHTML = "";

    }

    else {

        searchMovie(movieName);

    }

});



// =====================================
// EVENT 2 - ENTER KEY
// =====================================

movieInput.addEventListener("keypress", function (event) {

    if (event.key == "Enter") {

        searchBtn.click();

    }

});



// =====================================
// SEARCH MOVIE FROM API
// =====================================

async function searchMovie(movieName) {

    try {

        message.textContent = "Searching...";

        movieResult.innerHTML = "";


        // Request movie data from OMDb API
        const response = await fetch(
            `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${API_KEY}`
        );


        // Convert response into JSON
        const data = await response.json();


        console.log(data);


        // Movie not found
        if (data.Response == "False") {

            message.textContent =
                "Movie not found. Please try another title.";

            return;

        }


        // Create Mymovie object using API data
        let movie = new Mymovie(
            data.Title,
            data.Year,
            data.Genre,
            parseInt(data.Runtime),
            data.imdbRating,
            data.Plot,
            data.Poster,
            data.Director
        );


        // Test object in console
        movie.displayInfo();


        message.textContent = "";


        // Display movie on GUI
        displayMovie(movie);

    }

    catch (error) {

        console.log(error);

        movieResult.innerHTML = "";

        message.textContent =
            "Unable to retrieve movie information.";

    }

}



// =====================================
// DISPLAY SEARCH RESULT
// =====================================

function displayMovie(movie) {

    // Call method from Mymovie class
    let suggestion = movie.getSuggestion();


    movieResult.innerHTML = `

        <div class="movie-card">

            <div class="movie-layout">

                <div>

                    <img
                        src="${movie.Poster}"
                        alt="${movie.Title} Poster"
                        class="poster">

                </div>


                <div class="movie-information">

                    <h2>${movie.Title}</h2>

                    <div class="movie-meta">

                        <span>⭐ ${movie.Rating}</span>

                        <span>${movie.Year}</span>

                        <span>${movie.Runtime} min</span>

                    </div>


                    <p>
                        <strong>Genre:</strong>
                        ${movie.Genre}
                    </p>


                    <p>
                        <strong>Director:</strong>
                        ${movie.Director}
                    </p>


                    <p>
                        <strong>Plot</strong>
                    </p>

                    <p>
                        ${movie.Plot}
                    </p>


                    <div class="suggestion-box">

                        <strong>MyMovie Suggestion</strong>

                        <p>${suggestion}</p>

                    </div>


                    <label for="movieStatus">
                        <strong>Watching Status:</strong>
                    </label>

                    <select id="movieStatus">

                        <option value="Plan to Watch">
                            Plan to Watch
                        </option>

                        <option value="Watching">
                            Watching
                        </option>

                        <option value="Completed">
                            Completed
                        </option>

                    </select>


                    <button id="addBtn">
                        + Add to Watchlist
                    </button>

                </div>

            </div>

        </div>

    `;


    // Button only exists after innerHTML is created
    const addBtn =
        document.getElementById("addBtn");


    // EVENT 3 - ADD TO WATCHLIST
    addBtn.addEventListener("click", function () {

        addToWatchlist(movie);

    });

}



// =====================================
// CREATE - ADD MOVIE TO WATCHLIST
// =====================================

function addToWatchlist(movie) {

    // Get selected status
    let status =
        document.getElementById("movieStatus").value;


    // Create child class object
    let savedMovie = new WatchListMovie(
        movie.Title,
        movie.Year,
        movie.Genre,
        movie.Runtime,
        movie.Rating,
        movie.Plot,
        movie.Poster,
        movie.Director,
        status
    );


    // Check duplicate movie
    let duplicate = false;


    for (let i = 0; i < watchlist.length; i++) {

        if (
            watchlist[i].Title == savedMovie.Title &&
            watchlist[i].Year == savedMovie.Year
        ) {

            duplicate = true;

        }

    }


    // If already exists
    if (duplicate == true) {

        message.textContent =
            "This movie is already in your watchlist.";

    }

    // If not duplicate
    else {

        // Add object into array
        watchlist.push(savedMovie);


        // Save array into Local Storage
        localStorage.setItem(
            "watchlist",
            JSON.stringify(watchlist)
        );


        message.textContent =
            "Movie successfully added to your watchlist.";


        console.log(watchlist);

    }

}