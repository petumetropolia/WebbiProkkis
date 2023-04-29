'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

let tinderContainer = document.querySelector('.tinder');
let allCards = document.querySelectorAll('.tinder--card');
let nope = document.getElementById('nope');
let love = document.getElementById('love');


const createUserCards = (users) => {
    console.log(users);
    const ul = document.querySelector('.tinder--cards');

    users.forEach((user) => {
        // create li with DOM methods
        const li = document.createElement('li');
        li.classList.add('tinder--card');

        const img = document.createElement('img');
        img.src = url + '/uploads/' + user.filename;
        img.alt = user.etunimi;
        img.classList.add('resp');

        const h3 = document.createElement('h3');
        h3.innerHTML = user.etunimi;


        const p = document.createElement('p');
        p.innerHTML = user.kuvaus;


        li.appendChild(img);
        li.appendChild(h3);
        li.appendChild(p);
        ul.appendChild(li);

        // Add swipe listeners to the card
        let hammertime = new Hammer(li);

        hammertime.on('pan', function (event){
            li.classList.add('moving');
        });

        hammertime.on('pan', function (event){
            if (event.deltaX === 0) return;
            if (event.center.x === 0 && event.center.y === 0) return;

            tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
            tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

            let xMulti = event.deltaX * 0.03;
            let yMulti = event.deltaY / 80;
            let rotate = xMulti * yMulti;

            event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate (' + rotate + 'deg)';
        });

        hammertime.on('panend', function (event){
            li.classList.remove('moving');
            tinderContainer.classList.remove('tinder_love');
            tinderContainer.classList.remove('tinder_nope');

            let moveOutWidth = document.body.clientWidth;
            let keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

            li.classList.toggle('removed', !keep);

            if (keep){
                event.target.style.transform = '';
            } else {
                let endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
                let toX = event.deltaX > 0 ? endX : -endX;
                let endY = Math.abs(event.velocityY) * moveOutWidth;
                let toY = event.deltaY > 0 ? endY : -endY;
                let xMulti = event.deltaX * 0.03;
                let yMulti = event.deltaY / 80;
                let rotate = xMulti * yMulti;

                event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
                initCards();
            }
        });
    });
};
// AJAX call
const token = localStorage.getItem('token'); // retrieve token from local storage or wherever it is stored

const getUser = async () => {
    try {
        const response = await fetch(url + '/user/token', {
            headers: {
                'Authorization': 'Bearer ' + token // include token in headers
            }
        });
        const users = await response.json();
        console.log(users);
        createUserCards(users);
    } catch (e) {
        console.log(e.message);
    }
};
getUser();



function initCards(card, index) {

        let newCards = document.querySelectorAll('.tinder--card:not(.removed)');
//console.log(users.length);
        newCards.forEach(function (card, index) {


            card.style.zIndex = allCards.length - index;
            card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
            card.style.opacity = (10 - index) / 10;


        });

        tinderContainer.classList.add('loaded');
    }


initCards();

allCards.forEach(function (el){

    let hammertime = new Hammer(el);

    hammertime.on('pan', function (event){
        el.classList.add('moving');
    });

    hammertime.on('pan', function (event){
        if (event.deltaX === 0) return;
        if (event.center.x === 0 && event.center.y === 0) return;

        tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
        tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

        let xMulti = event.deltaX * 0.03;
        let yMulti = event.deltaY / 80;
        let rotate = xMulti * yMulti;

        event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate (' + rotate + 'deg)';
    });

    hammertime.on('panend', function (event){
        el.classList.remove('moving');
        tinderContainer.classList.remove('tinder_love');
        tinderContainer.classList.remove('tinder_nope');

        let moveOutWidth = document.body.clientWidth;
        let keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

        event.target.classList.toggle('removed', !keep);

        if (keep){
            event.target.style.transform = '';
        } else {
            let endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
            let toX = event.deltaX > 0 ? endX : -endX;
            let endY = Math.abs(event.velocityY) * moveOutWidth;
            let toY = event.deltaY > 0 ? endY : -endY;
            let xMulti = event.deltaX * 0.03;
            let yMulti = event.deltaY / 80;
            let rotate = xMulti * yMulti;

            event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
            initCards();
         }
    });
});

function createButtonListener(love){
    return function (event) {
        let cards = document.querySelectorAll('.tinder--card:not(.removed)');
        let moveOutWidth = document.body.clientWidth * 1.5;

        if (!cards.length) return false;

        let card = cards[0];

        card.classList.add('removed');

        if (love){
            card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';

        } else {
            card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';

        }

        initCards();

        event.preventDefault();
    };
}

let nopeListener = createButtonListener(false);
let loveListener = createButtonListener(true);

nope.addEventListener('click', nopeListener);
love.addEventListener('click', loveListener);

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-x');
    navbar.classList.toggle('open');
}
