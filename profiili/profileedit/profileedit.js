'use strict';
const kuva = document.getElementById('profile-pic');
const etunimi = document.getElementById('etunimi');
const sukunimi = document.getElementById('sukunimi');
const sahkoposti = document.getElementById('sahkoposti');
const ammatti = document.getElementById('ammatti');
const aboutme = document.getElementById('aboutme');
const fileInput = document.getElementById('input-file');


// Haetaan kirjautuneen henkilön tiedot sessionStoragesta
const kirjautunut = JSON.parse(sessionStorage.getItem('user'));

// Liitetään kirjautuneen tiedot formiin
console.log(kirjautunut);
console.log(kirjautunut[4]);
kuva.src = "/uploads/" + kirjautunut.filename;
etunimi.value = kirjautunut.etunimi;
sukunimi.value = kirjautunut.sukunimi;
console.log(kirjautunut.sukunimi);
sahkoposti.value = kirjautunut[3];
console.log(kirjautunut[3]);
ammatti.value = kirjautunut.ammatti;
console.log(kirjautunut.ammatti)
aboutme.value= kirjautunut.kuvaus;
console.log(kirjautunut.kuvaus)


fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', function() {
        kuva.src = reader.result;
    });

    reader.readAsDataURL(file);
});