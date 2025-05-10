const emojis = ['🧶','🧵','🪡','🪢','👗','🧥','🧤','🎁'];
let cards = [...emojis, ...emojis]; // duplicate for matching
let flippedCards = [];
let matched = 0;

const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');

// Shuffle function
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Create game board
function createBoard() {
  shuffle(cards);
  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (this.classList.contains('flipped') || flippedCards.length === 2) return;

  this.textContent = this.dataset.emoji;
  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    matched += 1;
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);
    message.textContent = "Stitched a pair! 🧵";

    if (matched === emojis.length) {
      message.textContent = "🎉 You finished Mom's gift! Happy Mother's Day!";
    }
  } else {
    card1.textContent = '';
    card2.textContent = '';
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    message.textContent = "Try again!";
  }
  flippedCards = [];
}

createBoard();
