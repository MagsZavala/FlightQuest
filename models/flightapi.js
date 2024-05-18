const fetch = require('node-fetch');
require('dotenv').config();  

class FlightAPI {
    // Method to fetch airport IDs based on city name
    static async getAirportIDFromCity(city) {
        const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query=${encodeURIComponent(city)}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,  // Ensure your API key is stored in .env for security
                'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
            }
        };
        console.log("Fetching airport ID for city:", city);
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log("Fetched data for airport ID:", data);  // Added console.log to inspect fetched data
            if (data.data && data.data.length > 0) {
                return data.data[0].id;  // Assuming the API returns data in this structure
            } else {
                throw new Error('No airport ID found');
            }
        } catch (error) {
            console.error('Error fetching airport ID:', error);
            throw error;
        }
    }

    // Existing method to search flights
    static async searchFlights(fromId, toId, departDate) {
        console.log("From ID:", fromId, "To ID:", toId, "Depart Date:", departDate);  
        const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=${fromId}&toId=${toId}&departDate=${departDate}`;
        console.log("Request URL:", url);
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log("Fetched data for flight search:", data);  // Added console.log to inspect fetched data
            return data;
        } catch (error) {
            console.error('Error fetching flight data:', error);
            throw error;
        }
    }
}

module.exports = FlightAPI;
