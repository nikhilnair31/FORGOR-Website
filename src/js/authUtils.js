// src/js/authUtils.js
export function checkAuthAndRedirect() {
    // Ensure this function only runs in the browser environment
    if (typeof window === 'undefined') {
        return; // Don't execute on the server
    }
    
    const accessToken = localStorage.getItem('access_token'); // Use 'access_token' as per your login.js
    console.log(`accessToken: ${accessToken}`);
    const currentPage = window.location.pathname;
    console.log(`currentPage: ${currentPage}`);

    const protectedPages = [
        '/app',
        '/user',
        // Add any other protected paths here
    ];

    if (protectedPages.includes(currentPage) && !accessToken) {
        window.location.href = '/login';
    } else if (accessToken && currentPage === '/login') {
        window.location.href = '/app';
    }
}