// src/js/authUtils.js
export function checkAuthAndRedirect() {
    const accessToken = localStorage.getItem('access_token'); // Use 'access_token' as per your login.js
    const currentPage = window.location.pathname;

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