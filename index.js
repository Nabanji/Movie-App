const searchBtn = document.querySelector('#submit-btn');
const searchInput = document.querySelector('#search');
const moviesContainer = document.querySelector('#movies-container');

// Fetch movies from OMDb API based on the search query
async function getMovies(searchValue) {    
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=45a7a9fc&s=${searchValue}&page=1`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (data.Response === "True") {
            displayMovies(data.Search);  // Display movies if found
        } else {
            moviesContainer.innerHTML = '<h3>No movies found</h3>';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to display movie cards
function displayMovies(movies) {
    moviesContainer.innerHTML = '';  // Clear previous results

    movies.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200'}" alt="${movie.Title}">
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <span>Year: ${movie.Year}</span>
            </div>
        `;

        moviesContainer.appendChild(movieEl);
    });
}

// Add event listener to the search button
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();  // Prevent form submission
    const searchValue = searchInput.value.trim();  // Get the current value from the input
    if (searchValue) {
        getMovies(searchValue);  // Call the function with the search term
    } else {
        console.error('Please enter a search term');
    }
});


document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    getMovies('batman');
})