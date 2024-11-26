import Navbar from '../components/Navbar';
import React, { useEffect, useState } from "react";

function NewsPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/weather-articles")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setArticles(data.articles || []);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    return(
        <div className="p-2 py-8 flex flex-col align-items-center bg-white dark:bg-[#0f172a]">
            <Navbar />
            <h1>Weather Articles</h1>
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title}
                        </a>
                        <p>{article.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default NewsPage;