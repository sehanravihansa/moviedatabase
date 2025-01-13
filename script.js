const apiKey = 'ac52b62c'; // Replace with your OMDb API key
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const movieContainer = document.getElementById('movie-container');
const modal = document.getElementById('movie-modal');
const modalDetails = document.getElementById('modal-details');
const closeModal = document.getElementById('close-modal');
const themeToggle = document.getElementById('theme-toggle'); // Add theme toggle button
const body = document.body;

// Check for saved 'darkMode' in localStorage
const darkMode = localStorage.getItem('darkMode');

if (darkMode === 'enabled') {
    body.classList.add('dark-mode'); // Add dark mode class if previously enabled
}

// Event listener for the theme toggle button
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode'); // Toggle dark mode class
    
    // Save the current preference to localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});

// CORS proxy URL (for handling CORS issues in browser)
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

// Fetch movie data
async function fetchMovies(query) {
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
    try {
        const response = await fetch(proxyUrl + url);
        const data = await response.json();
        if (data.Response === "True") {
            return data.Search;
        } else {
            alert(data.Error); // Show API error
            return [];
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("An error occurred while fetching movie data.");
        return [];
    }
}

// Fetch detailed movie data
async function fetchMovieDetails(imdbID) {
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
    try {
        const response = await fetch(proxyUrl + url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        alert("An error occurred while fetching detailed movie data.");
        return null;
    }
}

// Render movie cards
function renderMovies(movies) {
    movieContainer.innerHTML = '';
    movies.forEach((movie) => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie';
        movieCard.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'assets/placeholder.jpg'}" alt="${movie.Title}">
            <h2>${movie.Title}</h2>
            <p>Year: ${movie.Year}</p>
        `;
        movieCard.addEventListener('click', async () => {
            const details = await fetchMovieDetails(movie.imdbID);
            if (details) {
                displayModal(details);
            }
        });
        movieContainer.appendChild(movieCard);
    });
}

// Display the modal with detailed movie info
function displayModal(details) {
    modalDetails.innerHTML = `
        <h2>${details.Title}</h2>
        <p><strong>Year:</strong> ${details.Year}</p>
        <p><strong>Genre:</strong> ${details.Genre}</p>
        <p><strong>Director:</strong> ${details.Director}</p>
        <p><strong>Actors:</strong> ${details.Actors}</p>
        <p><strong>Plot:</strong> ${details.Plot}</p>
        <p><strong>Runtime:</strong> ${details.Runtime}</p>
        <p><strong>IMDB Rating:</strong> ${details.imdbRating}</p>
        <img src="${details.Poster !== 'N/A' ? details.Poster : 'assets/placeholder.jpg'}" alt="${details.Title}">
    `;
    modal.style.display = 'block';
}

// Close the modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Event listener for search
searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query) {
        const movies = await fetchMovies(query);
        renderMovies(movies);
    }
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
