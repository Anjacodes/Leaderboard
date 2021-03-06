// import _ from 'lodash';
import './style.css';
import DummyLogo from '../assets/images/DummyLogo.png';
import Facebook from '../assets/images/facebook.png';
import Twitter from '../assets/images/twitter.png';
import Instagram from '../assets/images/instagram.png';

const btnRefresh = document.querySelector('.btnRefresh');
const btnForm = document.querySelector('.btnForm');
const alert = document.querySelector('.alert');
const table = document.querySelector('.table');
const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const logo = document.querySelectorAll('.logo');
const contact = document.querySelector('.contact');
const mainTitle = document.querySelector('.mainTitle');
const scoreCont = document.querySelectorAll('.scoreCont');
const scores = document.querySelector('.scores');
const contactCont = document.querySelector('.contactCont');
const socialIcon = document.querySelectorAll('.socialIcon');

window.addEventListener('load', () => {
  logo[0].setAttribute('src', DummyLogo);
  logo[1].setAttribute('src', DummyLogo);
  socialIcon[0].setAttribute('src', Facebook);
  socialIcon[1].setAttribute('src', Twitter);
  socialIcon[2].setAttribute('src', Instagram);
});

btnForm.addEventListener('click', () => {
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/1/scores/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: nameInput.value, score: scoreInput.value }),
  })
    .then(async (response) => {
      // status 404 or 500 will set ok to false
      if (response.ok) {
        // Success:
        await response.json();
        alert.classList.add('green');
        alert.textContent = '✅ Score added successfully!';
        alert.style.backgroundColor = 'white';
        setTimeout(() => {
          alert.classList.remove('green');
          alert.textContent = '';
        }, 3000);
        nameInput.value = '';
        scoreInput.value = '';
      } else {
        alert.classList.add('red');
        alert.textContent = '❌ Failed to add score';
        alert.style.backgroundColor = 'white';
        throw new Error(`${response.status} Failed Fetch`);
      }
    }).catch((e) => console.error('EXCEPTION: ', e));
});

btnRefresh.addEventListener('click', () => {
  (async () => {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/1/scores/');
    const data = await response.json();
    const scores = data.result;
    if (table.innerHTML !== '') {
      table.innerHTML = '';
      scores.forEach((score) => {
        const newRow = document.createElement('tr');
        const newTd = document.createElement('td');
        newRow.appendChild(newTd);
        table.appendChild(newRow);
        newTd.textContent = `${score.user}: ${score.score}`;
      });
    }
  })();
});

contact.addEventListener('click', () => {
  mainTitle.textContent = 'CONTACT';
  scoreCont[0].style.display = 'none';
  scoreCont[1].style.display = 'none';
  contactCont.style.display = 'block';
});

scores.addEventListener('click', () => {
  mainTitle.textContent = 'LEADERBOARD';
  contactCont.style.display = 'none';
  scoreCont[0].style.display = 'block';
  scoreCont[1].style.display = 'block';
});