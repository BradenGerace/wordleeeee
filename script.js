document.addEventListener("DOMContentLoaded", () => {
    const WORD_LIST = [
      "apple",
      "table",
      "green",
      "mouse",
      // Add more 5-letter words to the list
    ];
  
    const TARGET_WORD = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    const guessForm = document.getElementById("guessForm");
    const guessInput = document.getElementById("guessInput");
    const feedbackContainer = document.getElementById("feedbackContainer");
    const attemptsText = document.getElementById("attempts");
  
    let attempts = 0;
  
    guessForm.addEventListener("submit", (event) => {
      event.preventDefault();
      attempts++;
  
      const guess = guessInput.value.toLowerCase().trim();
      if (guess.length === 5) {
        const feedback = getFeedback(guess);
        renderFeedback(feedback);
        guessInput.value = "";
        guessInput.focus();
      } else {
        alert("Please enter a 5-letter word!");
      }
    });
  
    function getFeedback(guess) {
      const feedback = [];
      const usedIndices = new Set();
  
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === TARGET_WORD[i]) {
          feedback[i] = "correct";
          usedIndices.add(i);
        }
      }
  
      for (let i = 0; i < guess.length; i++) {
        if (feedback[i]) continue;
  
        if (!usedIndices.has(i) && TARGET_WORD.includes(guess[i])) {
          feedback[i] = "close";
          usedIndices.add(i);
        }
      }
  
      for (let i = 0; i < guess.length; i++) {
        if (!feedback[i]) {
          feedback[i] = "incorrect";
        }
      }
  
      return feedback;
    }
  
    function renderFeedback(feedback) {
      feedbackContainer.innerHTML = "";
  
      feedback.forEach((value) => {
        const feedbackDiv = document.createElement("div");
        feedbackDiv.classList.add("feedback", value);
        feedbackContainer.appendChild(feedbackDiv);
      });
  
      attemptsText.textContent = `Attempts: ${attempts}`;
    }
  });
  