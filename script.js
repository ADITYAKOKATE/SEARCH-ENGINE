const apiKey = 'DCEWYQfP_YD-HqNs-0VDRCBNVy-EjHOJ-isi-cNM_UE'; // Replace with your Unsplash API Key
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const resultsContainer = document.getElementById('results');
const loader = document.getElementById('loader');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');

let currentPage = 1;
let currentQuery = '';

// Fetch Images Function
async function fetchImages(query, page = 1) {
    const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=15&client_id=${apiKey}`;
    toggleLoader(true);
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayImages(data.results);
        togglePaginationButtons(data.total_pages);
    } catch (error) {
        console.error('Error fetching images:', error);
        resultsContainer.innerHTML = '<p>Error loading images. Please try again later.</p>';
    } finally {
        toggleLoader(false);
    }
}

// Display Images Function
function displayImages(images) {
    resultsContainer.innerHTML = '';
    if (images.length === 0) {
        resultsContainer.innerHTML = '<p>No images found. Try a different search term.</p>';
        return;
    }
    images.forEach((image) => {
        const card = document.createElement('div');
        card.classList.add('image-card');

        const img = document.createElement('img');
        img.src = image.urls.small;
        img.alt = image.alt_description || 'Image';
        img.title = image.alt_description || 'Image';

        const downloadBtn = document.createElement('button');
        downloadBtn.classList.add('download-btn');
        downloadBtn.textContent = 'Download';
        downloadBtn.onclick = () => window.open(image.links.download, '_blank');

        card.appendChild(img);
        card.appendChild(downloadBtn);
        resultsContainer.appendChild(card);
    });
}

// Toggle Loader
function toggleLoader(show) {
    loader.style.display = show ? 'block' : 'none';
}

// Toggle Pagination Buttons
function togglePaginationButtons(totalPages) {
    prevButton.disabled = currentPage <= 1;
    nextButton.disabled = currentPage >= totalPages;
}

// Event Listeners
searchButton.addEventListener('click', () => {
    currentQuery = searchInput.value.trim();
    if (currentQuery) {
        currentPage = 1;
        fetchImages(currentQuery, currentPage);
    } else {
        alert('Please enter a search term.');
    }
});

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchImages(currentQuery, currentPage);
    }
});

nextButton.addEventListener('click', () => {
    currentPage++;
    fetchImages(currentQuery, currentPage);
});
