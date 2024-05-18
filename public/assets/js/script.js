document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-btn');
    
    searchButton.addEventListener('click', async function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        
        const fromId = document.getElementById('from').value;
        const toId = document.getElementById('to').value;
        const departDate = document.getElementById('depart-date').value;

        try {
            const response = await fetch(`/api/flights/search?fromId=${fromId}&toId=${toId}&departDate=${departDate}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const results = await response.json();
            updateResultsDisplay(results);
        } catch (error) {
            console.error('Error fetching flight data:', error);
            alert('There was an error fetching the flight data. Please try again later.');
        }
    });
});

function updateResultsDisplay(results) {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = ''; // Clear previous results
    
    results.forEach(flight => {
        const element = document.createElement('div');
        element.textContent = `Flight from ${flight.from} to ${flight.to} - Price: $${flight.price}`;
        container.appendChild(element);
    });
}
