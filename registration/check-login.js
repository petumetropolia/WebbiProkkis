(async () => {
    'use strict';
    const url = 'http://localhost:3000'; // change url when uploading to server

    // Check whether the user is already authenticated by checking whether their token and user data are stored in the session storage.
    if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
        // If the user is not authenticated, redirect them to the registration page.
        location.href = 'registration.html';
        return;
    }
    // Check whether the user's token is still valid by sending a request to the server with the token in the Authorization header.
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/user/token', fetchOptions);
        // If the server returns a non-OK status code, the token is invalid, so redirect the user to the registration page.
        if (!response.ok) {
            location.href = 'registration.html';
        } else {
            // If the server returns an OK status code, store the user data in the session storage.
            const json = await response.json();
            sessionStorage.setItem('user', JSON.stringify(json.user));
        }
    } catch (e) {
        console.log(e.message);
    }
})();
