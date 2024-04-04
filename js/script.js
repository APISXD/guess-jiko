const inputs = document.querySelector(".inputs"),
  hintTag = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess-left span"),
  wrongLetter = document.querySelector(".wrong-letter span"),
  resetBtn = document.querySelector(".reset-btn"),
  scoreDisplay = document.getElementById("score"),
  additionalScoreDisplay = document.getElementById("additional-score"),
  typingInput = document.querySelector(".typing-input");

let word, maxGuesses, incorrectLetters = [], score = 0, additionalScore = 0, correctLetters = [];

// Fungsi untuk menampilkan bantuan
function showHelp() {
    const helpMessage = "Welcome to Guess the Member!\n\n" +
                        "Instructions:\n" +
                        "- Tebak member berdasarkan jiko.\n" +
                        "- You have limited guesses.\n" +
                        "- 1 Huruf 1 point.\n" +
                        "- Have fun and good luck!\n\n" +
                        "Enjoy playing!";
    alert(helpMessage);
  }
  
  // Mengambil tombol bantuan dan menambahkan event listener untuk menampilkan bantuan saat diklik
  const helpBtn = document.querySelector(".help-btn");
  helpBtn.addEventListener("click", showHelp);

// Menyimpan kata-kata yang sudah ditebak dalam sebuah set
const guessedWords = new Set();

function randomWord() {
  let availableWords = wordList.filter(item => !guessedWords.has(item.word));
  
  if (availableWords.length === 0) {
    // Jika semua kata telah ditebak, kita dapat mengosongkan set kata yang sudah ditebak
    guessedWords.clear();
    // Kemudian, kita ambil semua kata dari wordList lagi
    availableWords = wordList;
  }

  const ranItem = availableWords[Math.floor(Math.random() * availableWords.length)];
  word = ranItem.word;
  maxGuesses = word.length >= 5 ? 8 : 6;
  correctLetters = []; 
  incorrectLetters = [];
  hintTag.innerText = ranItem.hint;
  guessLeft.innerText = maxGuesses;
  scoreDisplay.textContent = score; // Perbarui skor di tampilan
  additionalScoreDisplay.textContent = additionalScore;
  wrongLetter.innerText = incorrectLetters;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
  }
  inputs.innerHTML = html;

  // Tambahkan kata yang baru dipilih ke dalam set kata yang sudah ditebak
  guessedWords.add(word);
  
}

  
randomWord();

function showAlertWithCustomTitle(message) {
  alert(message);
}

function initGame(e) {
  let key = e.target.value.toLowerCase();
  if (key.match(/^[A-Za-z]+$/)) {
    if (word === key) { // Jika kata lengkap ditebak
      correctLetters = word.split(''); // Menambahkan seluruh huruf kata ke correctLetters
      score++; // Tambah skor jika kata benar
      scoreDisplay.textContent = score; // Perbarui skor di tampilan
      additionalScore++; // Tambah skor tambahan jika kata benar
      additionalScoreDisplay.textContent = additionalScore; // Perbarui skor tambahan di tampilan
    } else if (word.includes(key)) { // Jika huruf ditebak benar
      for (let i = 0; i < word.length; i++) {
        if (word[i] == key) {
          correctLetters.push(key);
          // Tambah skor jika jawaban benar
          score++;
          scoreDisplay.textContent = score; // Perbarui skor di tampilan
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else { // Jika huruf ditebak salah
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
    if (correctLetters.length === word.length) { // Jika semua huruf kata telah ditebak
      showAlertWithCustomTitle(`Congrats! You found the word ${word.toUpperCase()}\nYour score is ${score}`);
      additionalScore++; // Tambah skor tambahan karena kata ditemukan
      additionalScoreDisplay.textContent = additionalScore; // Perbarui skor tambahan di tampilan
      return randomWord();
    } else if (maxGuesses < 1) { // Jika tidak ada tebakan yang tersisa
      showAlertWithCustomTitle(`Game over! You don't have remaining guesses\nYour score is ${score}`);
      for (let i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  }, 100);
}


resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
