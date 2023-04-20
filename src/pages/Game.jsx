import { useContext, useState } from 'react';
import { WordContext } from '../App';
import * as RxIcons from 'react-icons/rx';
import * as MdIcons from 'react-icons/md';
import * as TiIcons from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

const Game = () => {
  const [words, setWords] = useContext(WordContext);
  const [guessWord, setGuessWord] = useState([]);
  const [show, setShow] = useState([]);
  const navigate = useNavigate();

  const handleGuess = (e, index) => {
    if (e.key === 'Enter') {
      const guess = e.target.value.toLowerCase();
      if (guess === words.word[index]) {
        e.target.value = words.word[index];
        setGuessWord([...guessWord, guess]);
      } else {
        e.target.value = '';
      }
    }
  };

  return (
    <section className="px-0 sm:px-10">
      <div className=" mb-10 flex flex-row justify-end gap-4">
        <button onClick={() => navigate('/')} className="hover:text-blue-400">
          <MdIcons.MdArrowBack size={40} />
        </button>
        <button
          onClick={() => {
            setShow([]);
            setGuessWord([]);
          }}
          className="hover:text-blue-400"
        >
          <MdIcons.MdOutlineRefresh size={40} />
        </button>
      </div>
      <div className=" flex flex-col gap-y-5">
        {words.jumbleWord.map((word, index) => {
          return (
            <div key={nanoid()} className="grid grid-cols-11 gap-5">
              <div className=" md:text-1xl col-span-5 flex items-center border-4 border-blue-400 px-2 py-2 text-sm  font-bold  uppercase lg:px-8 lg:py-4 lg:text-2xl xl:text-4xl">
                {word}
              </div>

              <div className=" col-span-1 flex items-center justify-center">
                <button
                  onClick={() => setShow([...show, index])}
                  className="hover:text-blue-400"
                >
                  <RxIcons.RxThickArrowRight className=" text-4xl md:text-6xl lg:text-8xl" />
                </button>
              </div>

              {guessWord[index] === words.word[index] ? (
                <div className=" md:text-1xl col-span-5 flex items-center border-4 border-blue-400 px-2 py-2 text-sm  font-bold  uppercase lg:px-8 lg:py-4 lg:text-2xl xl:text-4xl">
                  {guessWord[index]}
                  <span className=" text-xl text-green-400 lg:text-5xl">
                    <TiIcons.TiTick />
                  </span>
                </div>
              ) : show.includes(index) && index === guessWord.length ? (
                <input
                  onKeyDown={(e) => handleGuess(e, index)}
                  type="text"
                  className=" md:text-1xl col-span-5 flex items-center border-4 border-blue-400 px-2 py-2 text-sm  font-bold  uppercase lg:px-8 lg:py-4 lg:text-2xl xl:text-4xl"
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
