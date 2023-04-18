import { useContext, useState } from 'react';
import { WordContext } from '../App';
import * as RxIcons from 'react-icons/rx';
import * as MdIcons from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

const Game = () => {
  const [words, setWords] = useContext(WordContext);
  const [guessWord, setGuessWord] = useState([]);
  const [show, setShow] = useState([]);
  const navigate = useNavigate();

  const jumbleWord = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  const jumbledWordArray = (word) => {
    let letters = word.split('');
    jumbleWord(letters);
    while (letters[0] === word[0]) {
      // Reshuffle the letters until the first letter is different
      jumbleWord(letters);
    }

    let jumbledWord = letters.join('');
    return jumbledWord;
  };

  const handleGuess = (e) => {
    if (e.key === 'Enter') {
      setGuessWord([...guessWord, e.target.value]);
    }
  };

  return (
    <section className="px-10">
      <div className=" mb-10 flex flex-row justify-end gap-4">
        <button onClick={() => navigate('/')} className="hover:text-blue-400">
          <MdIcons.MdArrowBack size={40} />
        </button>
        <button
          onClick={() => {
            setShow([]);
          }}
          className="hover:text-blue-400"
        >
          <MdIcons.MdOutlineRefresh size={40} />
        </button>
      </div>
      <div className=" flex flex-col gap-y-5">
        {words.map((word, index) => {
          const jumbledWord = jumbledWordArray(word);

          return (
            <div key={nanoid()} className="grid grid-cols-11 gap-5">
              <div className=" col-span-5 border-4 border-blue-400 px-8 py-4 text-4xl font-bold uppercase">
                {jumbledWord}
              </div>

              <div className=" col-span-1 flex items-center justify-center">
                <button
                  onClick={() => setShow([...show, index])}
                  className="hover:text-blue-400"
                >
                  <RxIcons.RxThickArrowRight size={90} />
                </button>
              </div>

              {show.includes(index) ? (
                <input
                  onKeyDown={handleGuess}
                  type="text"
                  className=" col-span-5 border-4 border-blue-400 px-8 py-4 text-4xl font-bold uppercase"
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Game;

// const jumbledWord = word
//   .split('')
//   .map((letter) => ({ letter, sort: Math.random() }))
//   .sort((a, b) => a.sort - b.sort)
//   .map(({ letter }) => letter)
//   .join('');
