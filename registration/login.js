'use strict';
const url = 'bcwt-server-emil.northeurope.cloudapp.azure.com/app'; // change url when uploading to server

// select existing html elements
const loginForm = document.getElementById('login-form');
const addUserForm = document.getElementById('addUserForm');

// login
loginForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    // Serialize form data into JSON format
    const data = serializeJson(loginForm);
    // Prepare fetch options for the login request
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    // Send login request to the server
    const response = await fetch(url + '/auth/login', fetchOptions);
    const json = await response.json();
    console.log('login response', json);
    // Check if the login was successful
    if (!json.user) {
        alert(json.message);
    } else {
        // Save token and user information in session storage
        sessionStorage.setItem('token', json.token);
        sessionStorage.setItem('user', JSON.stringify(json.user));
        window.location.href = '/swipe/swipe.html'; // redirect to swipe page
    }
});

// same as above but with register
// submit register form
addUserForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(addUserForm);
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    const response = await fetch(url + '/auth/register', fetchOptions);
    const json = await response.json();
    alert(json.message);
    if (response.ok) {

        window.location.href = "/"; // redirect to sign in page
    }
});
