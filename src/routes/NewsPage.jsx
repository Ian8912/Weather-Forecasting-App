import Navbar from '../components/Navbar';
import React, { useEffect, useState } from "react";

// Utility function for API call
async function fetchArticles(baseUrl) {
    const response = await fetch(`${baseUrl}/weather-articles`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

function NewsPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

    useEffect(() => {
        fetchArticles(apiBaseUrl)
            .then((data) => {
                const filteredArticles = (data.articles || []).filter(
                    (article) =>
                        article.title !== "[Removed]" &&
                        article.description !== "[Removed]"
                );
                setArticles(filteredArticles);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching articles:", error);
                setError(error);
                setLoading(false);
            });
    }, [apiBaseUrl]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-center text-blue-500 text-xl">Loading...</p>
            </div>
        );

    if (error)
        return (
            <p className="text-center text-red-500 text-xl">
                {error.message.includes("Failed to fetch")
                    ? "Unable to connect to the server. Please check your internet connection or try again later."
                    : `Error: ${error.message}`}
            </p>
        );

    if (!loading && articles.length === 0)
        return (
            <p className="text-center text-gray-600 text-xl">
                No articles available at the moment.
            </p>
        );

    return (
        <div className="bg-white dark:bg-[#0f172a]">
            <Navbar />
            {/* Adjusted padding-top for more spacing */}
            <div className="max-w-4xl mx-auto p-4 pt-20">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                    Weather Articles
                </h1>
                <ul className="space-y-6">
                    {articles.map((article, index) => (
                        <li
                            key={index}
                            className="p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300 bg-gray-50 dark:bg-gray-800"
                        >
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl font-semibold text-blue-600 hover:underline dark:text-blue-400"
                            >
                                {article.title}
                            </a>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                {article.description}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default NewsPage;

