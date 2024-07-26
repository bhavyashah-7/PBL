const API_KEY = '4105a19d';
const API_URL = 'https://www.omdbapi.com/';

document.addEventListener('DOMContentLoaded', () => {
    const latestReviewsSection = document.getElementById('latest-reviews');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    fetchMovies();
    fetchTVShows();

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = searchInput.value;
        if (query) {
            searchMoviesAndTVShows(query);
        }
    });

    function fetchMovies() { // we will first use fetch fn in which we will pass the url of the API and then we will get the response and convert it into json format
        fetch(`${API_URL}?s=movie&type=movie&apikey=${API_KEY}`) // fetch is a built-in function to make HTTP requests in JavaScript
            .then(response => response.json()) // here we are converting the response into json format
            .then(data => {
                const movies = data.Search; // here we are getting the search results from the data
                displayReviews(movies); // we are calling the displayReviews function and passing the movies as an argument
            })
            .catch(error => console.error('Error fetching movies:', error));
    }

    function fetchTVShows() {
        fetch(`${API_URL}?s=tv&type=series&apikey=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const tvshows = data.Search;
                displayReviews(tvshows);
            })
            .catch(error => console.error('Error fetching TV shows:', error));
    }

    function searchMoviesAndTVShows(query) {
        fetch(`${API_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const results = data.Search;
                displaySearchResults(results);
            })
            .catch(error => console.error('Error searching movies and TV shows:', error));
    }

    function displayReviews(items) { // this fn will display the reviews of the movies and tv shows from array of items
        if (!items) return;
        items.forEach(item => {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.innerHTML = `
                <img src="${item.Poster !== "N/A" ? item.Poster : 'no-image-available.png'}" alt="${item.Title} Poster">
                <a href="${item.Type === 'movie' ? 'movie.html' : 'tvshow.html'}?id=${item.imdbID}">${item.Title}</a>
                <p>${item.Year}</p>
            `;
            latestReviewsSection.appendChild(reviewItem);
        });
    }

    function displaySearchResults(results) {
        searchResults.innerHTML = '';
        if (!results) return;
        results.forEach(item => {
            const resultItem = document.createElement('li');
            resultItem.innerHTML = `<a href="${item.Type === 'movie' ? 'movie.html' : 'tvshow.html'}?id=${item.imdbID}">${item.Title}</a> - ${item.Year}`;
            searchResults.appendChild(resultItem);
        });
    }
});
