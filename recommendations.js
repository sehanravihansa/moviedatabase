const recommendationsContainer = document.getElementById('recommendations');
const recommendButton = document.getElementById('recommend-button');
const movieInput = document.getElementById('movie-input');
const apiKey = 'ac52b62c'; // Your OMDb API key

// Static mapping of movies to their recommendations
const relatedMovies = {
    "Inception": ["Interstellar", "The Matrix", "Shutter Island"],
    "Titanic": ["The Notebook", "A Walk to Remember", "Pride & Prejudice"],
    "Batman": ["The Dark Knight", "Joker", "Spider-Man"],
    "Forrest Gump": ["The Shawshank Redemption", "Saving Private Ryan", "Cast Away"],
    // Add more mappings as needed
};

// Function to get recommendations based on user input
async function getRecommendations() {
    const movieTitle = movieInput.value.trim();
    
    // Clear previous recommendations
    recommendationsContainer.innerHTML = '';

    if (!movieTitle) {
        recommendationsContainer.innerHTML = '<p>Please enter a movie title.</p>';
        return;
    }

    try {
        // Fetch movie details from OMDb API
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.Response === "True") {
            // Display the found movie
            recommendationsContainer.innerHTML = `<h3>Recommendations based on "${data.Title}":</h3>`;
            
            // Get related movies from the static mapping
            const recommendations = relatedMovies[data.Title] || [];
            
            if (recommendations.length > 0) {
                recommendationsContainer.innerHTML += recommendations.map(movie => `<p>${movie}</p>`).join('');
            } else {
                recommendationsContainer.innerHTML += `<p>No specific recommendations available for "${data.Title}".</p>`;
            }
        } else {
            recommendationsContainer.innerHTML = `<p>No movies found with the title "${movieTitle}".</p>`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        recommendationsContainer.innerHTML = `<p>An error occurred while fetching recommendations: ${error.message}</p>`;
    }
}

// Event listener for the recommendation button
recommendButton.addEventListener('click', getRecommendations);
