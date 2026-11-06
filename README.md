# MyMovie – Electron Desktop Application

## Project Overview
MyMovie is a desktop-based movie management application developed using Electron, HTML, CSS, and JavaScript for the Object-Oriented Programming (CSC2923) Final Assignment.

The application allows users to search for movies, view movie information, receive movie suggestions, and manage their personal movie watchlist.

## Main Features
- Search movies using the OMDb API
- Display movie details, including title, genre, runtime, IMDb rating, director, plot, and poster
- Generate movie suggestions based on genre and IMDb rating
- Add movies to a personal watchlist
- Update movie watching status
- Delete movies from the watchlist
- Calculate total watch time in minutes and hours
- Save watchlist data using Local Storage

## Technologies Used
- Electron
- HTML
- CSS
- JavaScript
- OMDb API
- JSON
- Local Storage

## How to Run the Application

**1. Download or clone this repository.**

**2. Open the project folder in Visual Studio Code.**

**3. Install the required dependencies:**

```bash
npm install
```

**4. Start the Electron application:**

```bash
npm start
```

## Application Pages

### Movie Explorer
Allows users to search for movies, view information, receive suggestions, and add movies to their watchlist.

### My Watchlist
Allows users to view saved movies, update watching statuses, delete movies, and calculate total watch time.

## CRUD Operations
- **Create:** Add movies to the watchlist.
- **Read:** Display saved movies.
- **Update:** Change movie watching status.
- **Delete:** Remove movies from the watchlist.

## Data Storage
The application uses Local Storage to save movie information and watching statuses so that records remain available after reopening the application.

## Project Information
**Course:** CSC2923 – Object Oriented Programming

**Project:** MyMovie – Movie Plan Application

**Assessment:** Final Assignment
