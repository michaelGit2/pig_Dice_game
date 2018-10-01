/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls two dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls 1 on one or both dice, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GOLBAL score. After that, it's the next player's turn
- The first player to reach 100 points (or user enetered score) on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gameActive;

resetScores();

function resetScores() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gameActive = true;

  // hide dice image before first rolls
  document.querySelector('#dice-1').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';

  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'block';

  // set score-0, score-1, current-0 and current-1 to 0
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-0').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

// event handler for roll dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gameActive) {
    // 1. generate random number between 1 and 6
    dice1 = Math.floor(Math.random()*7) + 1;
    dice2 = Math.floor(Math.random()*7) + 1;

    // 2. update dice image and current roll value based on dice value
    var dice1DOM = document.querySelector('#dice-1');
    dice1DOM.style.display = 'block';
    dice1DOM.src = 'dice-' + dice1 + '.png';
    var dice2DOM = document.querySelector('#dice-2');
    dice2DOM.style.display = 'block';
    dice2DOM.src = 'dice-' + dice2 + '.png';

    // 3. update round score if dice roll is not 1
    if(dice1 !== 1 && dice2 !== 1) {
      // add score
      roundScore += dice1;
      roundScore += dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      switchPlayers();
    }
  }
});

// event handler for hold score button
document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gameActive) {
    // add current score to global score
    scores[activePlayer] += roundScore;

    // update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // set high score to default value
    // use default value when here is no user input
    var highScore = 100;
    // get user enetred high score
    var userInput = document.querySelector('.high-score').value;
    if (userInput) {
      highScore = userInput;
    }

    // check if player won the game
    if(scores[activePlayer] >= highScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gameActive = false;
    } else {
      // switch players
      switchPlayers();
    }
  }
});

// event handler for new game button
document.querySelector('.btn-new').addEventListener('click', resetScores);

function switchPlayers() {
  // switch activePlayer
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  // reset round score to 0
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // toggle adds active class if not active or removes if already active
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // hide dice after 1 is rolled
  // document.querySelector('#dice-1').style.display = 'none';
  // document.querySelector('#dice-2').style.display = 'none';
}
