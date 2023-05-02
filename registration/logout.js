'use strict';
const logOut = document.getElementById('logout');

const logoutUser = async () => {
    try {
        const response = await fetch(url + '/auth/logout');
        // Parse the response from the server as JSON.
        const json = await response.json();
        console.log(json);
        // Remove the token and user data from the session storage.
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        // Display an alert to the user confirming that they have been logged out.
        alert('You have logged out');
        // Redirect the user to the home page.
        location.href = '/home.html';
    } catch (e) {
        console.log(e.message);
        // handle error, e.g. show error message to user
    }
};

logOut.addEventListener('click', () => {
    logoutUser();
});