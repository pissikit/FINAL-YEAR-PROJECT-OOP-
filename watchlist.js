// =====================================
// DOM ELEMENTS
// =====================================

const watchlistResult =
    document.getElementById("watchlistResult");

const watchlistMessage =
    document.getElementById("watchlistMessage");

const summary =
    document.getElementById("summary");



// =====================================
// READ - DISPLAY WATCHLIST
// =====================================

function displayWatchlist() {

    // Get data from Local Storage
    let watchlist =
        JSON.parse(localStorage.getItem("watchlist")) || [];


    // Clear previous display
    watchlistResult.innerHTML = "";


    // Check if watchlist is empty
    if (watchlist.length == 0) {

        watchlistResult.innerHTML =
            "<p>Your watchlist is empty.</p>";

    }


    // Display every movie
    for (let i = 0; i < watchlist.length; i++) {

        let movie = watchlist[i];


        watchlistResult.innerHTML += `

            <div class="watchlist-card">

                <div class="watchlist-poster">

                    <img
                        src="${movie.Poster}"
                        alt="${movie.Title} Poster">

                </div>


                <div class="watchlist-info">

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
                        <strong>Status:</strong>
                        ${movie.Status}
                    </p>


                    <div class="watchlist-actions">

                        <label>
                            <strong>Change Status:</strong>
                        </label>


                        <select id="status${i}">

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


                        <button onclick="updateStatus(${i})">
                            Update Status
                        </button>


                        <button
                            class="delete-btn"
                            onclick="deleteMovie(${i})">

                            Delete Movie

                        </button>

                    </div>

                </div>

            </div>

        `;


        // Make dropdown display current status
        document.getElementById("status" + i).value =
            movie.Status;

    }


    // Calculate total watch time
    calculateTotalWatchTime();

}



// =====================================
// UPDATE
// =====================================

function updateStatus(index) {

    let watchlist =
        JSON.parse(localStorage.getItem("watchlist")) || [];


    // Get new status selected by user
    let newStatus =
        document.getElementById("status" + index).value;


    // Update object
    watchlist[index].Status = newStatus;


    // Save updated array
    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );


    watchlistMessage.textContent =
        "Movie status successfully updated.";


    // Refresh display
    displayWatchlist();

}



// =====================================
// DELETE
// =====================================

function deleteMovie(index) {

    let watchlist =
        JSON.parse(localStorage.getItem("watchlist")) || [];


    // Ask user for confirmation
    let confirmDelete =
        confirm("Are you sure you want to delete this movie?");


    if (confirmDelete == true) {

        // Remove 1 movie at selected index
        watchlist.splice(index, 1);


        // Save new array
        localStorage.setItem(
            "watchlist",
            JSON.stringify(watchlist)
        );


        watchlistMessage.textContent =
            "Movie successfully deleted.";


        // Refresh GUI
        displayWatchlist();

    }

}



// =====================================
// CALCULATION
// =====================================

function calculateTotalWatchTime() {

    let watchlist =
        JSON.parse(localStorage.getItem("watchlist")) || [];


    let totalMinutes = 0;


    // Add runtime for every movie
    for (let i = 0; i < watchlist.length; i++) {

        let runtime =
            parseInt(watchlist[i].Runtime);


        if (isNaN(runtime) == false) {

            totalMinutes =
                totalMinutes + runtime;

        }

    }


    // Convert minutes to hours
    let totalHours =
        Math.floor(totalMinutes / 60);


    let remainingMinutes =
        totalMinutes % 60;

    let movieLabel = "movies";

    if (watchlist.length == 1) {
        movieLabel = "movie";
    }

    // Display calculation
    summary.innerHTML = `

        <div class="summary-card">

            <h3>Watchlist Summary</h3>

            <p>
                <strong>Total Movies:</strong>
                ${watchlist.length} ${movieLabel}
            </p>

            <p>
                <strong>Total Watch Time:</strong>
                ${totalMinutes} minutes
            </p>

            <p>
                <strong>Equivalent Time:</strong>
                ${totalHours} hours
                ${remainingMinutes} minutes
            </p>

        </div>

    `;

}



// =====================================
// INITIAL DISPLAY
// =====================================

displayWatchlist();