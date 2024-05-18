const fetch = require('node-fetch');

class FlightAPI {
    static async searchFlights(fromId, toId, departDate) {
        const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=${fromId}&toId=${toId}&departDate=${departDate}`;
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
            return data;
        } catch (error) {
            console.error('Error fetching flight data:', error);
            throw error;
        }
    }
}

module.exports = FlightAPI;
