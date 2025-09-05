import React, { useEffect, useState } from 'react';
import { fetchTrendingTopics } from '../services/api';

const TrendingTopics = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const getTrendingTopics = async () => {
            try {
                const data = await fetchTrendingTopics();
                setTopics(data);
            } catch (error) {
                console.error('Error fetching trending topics:', error);
            }
        };

        getTrendingTopics();
    }, []);

    return (
        <div className="trending-topics">
            <h2>Trending Topics</h2>
            <ul>
                {topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                ))}
            </ul>
        </div>
    );
};

export default TrendingTopics;