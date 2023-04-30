'use strict';
const logOut = document.getElementById('logout');

const logoutUser = async () => {
    try {
        const response = await fetch(url + '/auth/logout');
        const json = await response.json();
        console.log(json);
        // remove token
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        alert('You have logged out');
        location.href = '/home.html';
    } catch (e) {
        console.log(e.message);
        // handle error, e.g. show error message to user
    }
};

logOut.addEventListener('click', () => {
    logoutUser();
});