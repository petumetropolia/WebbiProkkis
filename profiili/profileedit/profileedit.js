'use strict';

// Haetaan hmtlstä id avulla ja tallennetaan ne muuttujiin.
const kuva = document.getElementById('profile-pic');
const sessionkuva = document.getElementById('sessionInput')
const etunimi = document.getElementById('etunimi');
const sukunimi = document.getElementById('sukunimi');
const sahkoposti = document.getElementById('sahkoposti');
const ammatti = document.getElementById('ammatti');
const aboutme = document.getElementById('aboutme');
const userId = document.getElementById('userId');
const fileInput = document.getElementById('input-file');
const deleteUserId = document.getElementById("idForDelete")
const deleteButton = document.getElementById('deleteButton');
const url = 'http://localhost:3000';

// Haetaan kirjautuneen henkilön tiedot sessionStoragesta
const kirjautunut = JSON.parse(sessionStorage.getItem('user'));

// Liitetään kirjautuneen tiedot formiin

kuva.src = "/uploads/" + kirjautunut.filename;
sessionkuva.value = kirjautunut.filename;
etunimi.value = kirjautunut.etunimi;
sukunimi.value = kirjautunut.sukunimi;
sahkoposti.value = kirjautunut.sähköposti;
ammatti.value = kirjautunut.ammatti;
aboutme.value= kirjautunut.kuvaus;
userId.value = kirjautunut.tyontekija_id;
deleteUserId.value = kirjautunut.tyontekija_id;


// jos kuva vaihdetaan niin vaihdetaan sourcen value
fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', function() {
        kuva.src = reader.result;
    });

    reader.readAsDataURL(file);
});
function serializeJson(form) {
    // Create a new FormData object
    let formData = new FormData(form);

    // Loop through each input field and append the data to the formData object
    for (let i = 0; i < form.elements.length; i++) {
        let field = form.elements[i];
        if (field.type !== "file" && field.name) {
            formData.append(field.name, field.value);
        }
    }

    // Return the formData object
    return formData;
}

const modifyForm = document.getElementById("modifyUserForm");
const deleteForm = document.getElementById("deletUserForm");
const token = sessionStorage.getItem('token');
console.log("TOKEN: ", token);

// event listener user modifylle
modifyForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(modifyForm);

    fetch(url + '/user', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        body: formData
    })

        .then(response => response.json())
        .then(data => {
            // Handle the response data here
            console.log(data);
            // redirect back to swipe.html
            window.location.href = '/swipe/swipe.html';
        })
        .catch(error => {
            // Handle any errors here
            console.error(error);
        });
});
// event listener user deletelle
deleteForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const userId = deleteUserId.value;

    fetch(`${url}/user/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response data here
            console.log(data);

            alert("User Deleted");
            // poistetaan tiedot sessionstoragesta
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            window.location.href = '/home.html';
        })
        .catch(error => {
            // Handle any errors here
            console.error(error);
        });
});



