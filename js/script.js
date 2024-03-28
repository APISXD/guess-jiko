const inputs = document.querySelector(".inputs"),
  hintTag = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess-left span"),
  wrongLetter = document.querySelector(".wrong-letter span"),
  resetBtn = document.querySelector(".reset-btn"),
  scoreDisplay = document.getElementById("score"),
  typingInput = document.querySelector(".typing-input");

let word, maxGuesses, incorrectLetters = [], score = 0, correctLetters = [];

// Fungsi untuk menampilkan bantuan
function showHelp() {
    const helpMessage = "Welcome to Guess the Member!\n\n" +
                        "Instructions:\n" +
                        "- Tebak member berdasarkan jiko.\n" +
                        "- You have limited guesses.\n" +
                        "- Each correct guess earns you points.\n" +
                        "- Have fun and good luck!\n\n" +
                        "Enjoy playing!";
    alert(helpMessage);
  }
  
  // Mengambil tombol bantuan dan menambahkan event listener untuk menampilkan bantuan saat diklik
  const helpBtn = document.querySelector(".help-btn");
  helpBtn.addEventListener("click", showHelp);

function randomWord() {
  let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranItem.word;
  maxGuesses = word.length >= 5 ? 8 : 6;
  correctLetters = []; 
  incorrectLetters = [];
  hintTag.innerText = ranItem.hint;
  guessLeft.innerText = maxGuesses;
  scoreDisplay.textContent = score; // Perbarui skor di tampilan
  wrongLetter.innerText = incorrectLetters;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
  }
  inputs.innerHTML = html;

}
randomWord();

function showAlertWithCustomTitle(message) {
  alert(message);
}

function initGame(e) {
  let key = e.target.value.toLowerCase();
  if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
    if(word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if(word[i] == key) {
          correctLetters.push(key);
          // Tambah skor jika jawaban benar
          score++;
          scoreDisplay.textContent = score; // Perbarui skor di tampilan
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      maxGuesses--;
      // Kurangi skor jika huruf ditebak salah
      score = Math.max(0, score - 1);
      scoreDisplay.textContent = score; // Perbarui skor di tampilan
      incorrectLetters.push(` ${key}`);
    }
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
  }
  typingInput.value = "";

  setTimeout(() => {
    if(correctLetters.length === word.length) {
      showAlertWithCustomTitle(`Congrats! You found the word ${word.toUpperCase()}\nYour score is ${score}`);
      return randomWord();
    } else if(maxGuesses < 1) {
      showAlertWithCustomTitle(`Game over! You don't have remaining guesses\nYour score is ${score}`);
      for(let i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  }, 100);
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
