import Navbar from '../components/Navbar';
import React, { useEffect, useState } from "react";

function NewsPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

    useEffect(() => {
        fetch(`${apiBaseUrl}/weather-articles`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
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
        return <p className="text-center text-blue-500 text-xl">Loading...</p>;
    if (error)
        return <p className="text-center text-red-500 text-xl">Error: {error.message}</p>;

    return (
        <div className="p-2 py-8 flex flex-col align-items-center bg-white dark:bg-[#0f172a]">
            <Navbar />
            <div className="max-w-4xl mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Weather Articles</h1>
                <ul className="space-y-6">
                    {articles.map((article, index) => (
                        <li key={index} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-blue-600 hover:underline">
                                {article.title}
                            </a>
                            <p className="mt-2 text-gray-600">{article.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default NewsPage;
