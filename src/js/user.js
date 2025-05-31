// src/js/user.js
import { CONFIG } from './config.js'; // Ensure path is correct from src/js/

document.addEventListener('DOMContentLoaded', () => {
    // Redirect if not logged in (redundant due to AuthRedirect, but good as a fallback)
    const token = localStorage.getItem('access_token');
    if (!token) {
        window.location.href = '/login';
        return; // Stop execution if not logged in
    }

    // Display username
    document.getElementById('username').textContent = localStorage.getItem('username') || 'User';

    // Bulk download handler
    document.getElementById('bulk-download-button')?.addEventListener('click', () => {
        bulkDownloadAll();
    });
    async function bulkDownloadAll() {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            console.error("No access token found for download.");
            return;
        }

        try {
            const response = await fetch(`${CONFIG.API_BASE}/api/bulk_download_all`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'User-Agent': CONFIG.USER_AGENT,
                    'X-App-Key': CONFIG.APP_KEY,
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'FORGOR_backup.zip';
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
                console.log("Bulk download initiated successfully!");
            } else {
                const errorText = await response.text();
                console.error(`API request failed with status ${response.status}: ${errorText}`);
                if (response.status === 401 || response.status === 403) {
                    alert("Authentication failed. Please log in again.");
                    localStorage.clear(); // Clear all tokens
                    window.location.href = '/login'; // Redirect
                }
            }
        } catch (error) {
            console.error('Error downloading ZIP:', error);
            alert("Network error during download. Please try again.");
        }
    }

    // Logout handler
    document.getElementById('logout-button')?.addEventListener('click', () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');
        window.location.href = '/'; // Redirect to home/landing page
    });
}); // End DOMContentLoaded