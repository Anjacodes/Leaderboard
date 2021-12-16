// import _ from 'lodash';
import './style.css';

const btnRefresh = document.querySelector('.btnRefresh');
const btnForm = document.querySelector('.btnForm');
const alert = document.querySelector('.alert');
const table = document.querySelector('.table');
const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');

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
        setTimeout(() => {
          alert.classList.remove('green');
          alert.textContent = '';
        }, 3000);
        nameInput.value = '';
        scoreInput.value = '';
      } else {
        alert.classList.add('red');
        alert.textContent = '❌ Failed to add score';
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