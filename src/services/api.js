// src/services/api.js

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

export const fetchTrendingTopics = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/trending`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching trending topics:', error);
        throw error;
    }
};

export const submitQuote = async (quote) => {
    try {
        const response = await fetch(`${API_BASE_URL}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quote }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error submitting quote:', error);
        throw error;
    }
};