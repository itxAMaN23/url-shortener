import React, { useState, useEffect } from "react";
import "./Analytics.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/analytics`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch data");
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setAnalyticsData(data);
                } else {
                    console.error("Unexpected data format:", data);
                    setAnalyticsData([]);
                }
            })
            .catch((err) => {
                console.error("Error fetching analytics:", err);
                setError("Failed to load analytics data.");
                setAnalyticsData([]);
            })
            .finally(() => setLoading(false));
    }, []);

    const formatDate = (date) => {
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }).format(new Date(date));
    };

    // Calculate metrics
    const totalClicks = analyticsData.reduce((sum, item) => sum + item.clicks, 0);
    const uniqueUrls = new Set(analyticsData.map(item => item.shortUrl)).size;
    const averageClicks = analyticsData.length ? (totalClicks / analyticsData.length).toFixed(1) : 0;

    return (
        <main className="analytics-container fadeIn">
            <div className="analytics-header">
                <h2>🔍 Link Analytics</h2>
                <p>Track your shortened URL performance</p>
            </div>

            {/* Metrics Summary */}
            <div className="metrics-container">
                <div className="metric-card">
                    <div className="metric-title">Total Clicks</div>
                    <div className="metric-value">{totalClicks}</div>
                </div>
                <div className="metric-card">
                    <div className="metric-title">Active Links</div>
                    <div className="metric-value">{uniqueUrls}</div>
                </div>
                <div className="metric-card">
                    <div className="metric-title">Average Clicks/Link</div>
                    <div className="metric-value">{averageClicks}</div>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Short URL</th>
                            <th>Total Clicks</th>
                            <th>Country</th>
                            <th>Browser</th>
                            <th>Device</th>
                            <th>Last Accessed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6">
                                    <div className="loading-state">Loading analytics data</div>
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="6">
                                    <div className="error-state">{error}</div>
                                </td>
                            </tr>
                        ) : analyticsData.length > 0 ? (
                            analyticsData.map((link) => (
                                <tr key={link._id}>
                                    <td>
                                        <a href={link.shortUrl} target="_blank" rel="noopener noreferrer">
                                            {link.shortURL}
                                        </a>
                                    </td>
                                    <td>{link.clicks}</td>
                                    <td>{link.country && link.country !== "Unknown" ? link.country : "-"}</td>
                                    <td>{link.browser || "-"}</td>
                                    <td>{link.device || "-"}</td>
                                    <td>{link.createdAt ? formatDate(link.createdAt) : "-"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">
                                    <div className="empty-state">No analytics data available</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Analytics;