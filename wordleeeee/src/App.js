import React, { useState } from 'react';

const WORD_LIST = [
  'abandoners',
  'algorithms',
  'basketball',
  // Add more 10-letter words to the list
];

const TARGET_WORD = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

const App = () => {
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState([]);

  const handleGuessChange = (event) => {
    setGuess(event.target.value);
  };

  const handleGuessSubmit = (event) => {
    event.preventDefault();
    setAttempts((prevAttempts) => prevAttempts + 1);

    const currentGuess = guess.toLowerCase().trim();
    if (currentGuess.length === 10) {
      const newFeedback = [...feedback];

      for (let i = 0; i < 10; i++) {
        if (currentGuess[i] === TARGET_WORD[i]) {
          newFeedback[i] = 'correct';
        } else if (TARGET_WORD.includes(currentGuess[i])) {
          newFeedback[i] = 'close';
        } else {
          newFeedback[i] = 'incorrect';
        }
      }

      setFeedback(newFeedback);
      setGuess('');
    } else {
      alert('Please enter a 10-letter word!');
    }
  };

  const renderFeedback = () => {
    return feedback.map((value, index) => (
      <div key={index} className={`feedback ${value}`}></div>
    ));
  };

  return (
    <div className="App">
      <h1>Ten-Letter Wordle</h1>
      <p>Guess a 10-letter word:</p>
      <form onSubmit={handleGuessSubmit}>
        <input
          type="text"
          value={guess}
          onChange={handleGuessChange}
          maxLength={10}
        />
        <button type="submit">Guess</button>
      </form>
      <div className="feedback-container">{renderFeedback()}</div>
      <p>Attempts: {attempts}</p>
    </div>
  );
};

export default App;
