// src/js/login.js
import { CONFIG } from './config.js'; // Ensure path is correct from src/js/

// Helper for showing messages
function showMessage(msg, type = 'error') {
    const messageElement = document.getElementById('auth-message');
    if (messageElement) {
        messageElement.textContent = msg;
        messageElement.className = `text-center mt-4 ${type === 'success' ? 'text-green-400' : 'text-red-400'}`;
    }
}

// === Form Tab Switching ===
// Use DOMContentLoaded to ensure elements are available
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => {
                t.classList.remove('active', 'border-neonGreen', 'text-neonGreen');
                t.classList.add('text-gray-400');
            });
            tab.classList.add('active', 'border-neonGreen', 'text-neonGreen');
            tab.classList.remove('text-gray-400');

            const target = tab.getAttribute('data-target');
            document.querySelectorAll('.form').forEach(f => {
                f.classList.remove('active');
                f.classList.add('hidden');
            });
            document.getElementById(target)?.classList.remove('hidden');
            document.getElementById(target)?.classList.add('active');

            showMessage(''); // Clear messages on tab switch
        });
    });

    // === Login ===
    document.getElementById('login-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        showMessage('');

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        loginUser(username, password).then(response => {
            if (response.status === 'success') {
                showMessage("Logged in successfully!", 'success');
                localStorage.setItem('username', username);
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                window.location.href = '/app';
            } 
            else {
                showMessage(response.message);
            }
        });
    });

    // === Register ===
    document.getElementById('register-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        showMessage('');

        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        registerUser(username, password).then(response => {
            if (response.status === 'success') {
                showMessage("Registered successfully! Logging in...", 'success');
                loginUser(username, password).then(loginResponse => {
                    if (loginResponse.status === 'success') {
                        showMessage("Logged in successfully!", 'success');
                        localStorage.setItem('username', username);
                        localStorage.setItem('access_token', loginResponse.data.access_token);
                        localStorage.setItem('refresh_token', loginResponse.data.refresh_token);
                        window.location.href = '/app';
                    } 
                    else {
                        showMessage(loginResponse.message || 'Login after registration failed.');
                    }
                });
            } 
            else {
                showMessage(response.message || 'Registration failed.');
            }
        });
    });
}); // End DOMContentLoaded

async function loginUser(username, password) {
    try {
        const res = await fetch(`${CONFIG.API_BASE}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': CONFIG.USER_AGENT,
                'X-App-Key': CONFIG.APP_KEY,
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (res.status === 200) {
            return { status: 'success', data: data };
        } 
        else {
            return { status: 'error', message: data.message || 'Login failed.' };
        }
    } 
    catch (err) {
        console.error('Login network error:', err);
        return { status: 'error', message: 'Network error or API unreachable.' };
    }
}

async function registerUser(username, password) {
    try {
        const res = await fetch(`${CONFIG.API_BASE}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': CONFIG.USER_AGENT,
                'X-App-Key': CONFIG.APP_KEY,
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (res.ok) {
            return { status: 'success' };
        } 
        else {
            return { status: 'error', message: data.message || 'Registration failed on server.' };
        }
    } 
    catch (err) {
        console.error('Register network error:', err);
        return { status: 'error', message: 'Network error or API unreachable.' };
    }
}