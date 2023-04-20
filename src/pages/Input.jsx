import { useRef, useState, useContext } from 'react';
import { WordContext } from '../App';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Home = ({ dictionary }) => {
  const [words, setWords] = useContext(WordContext);
  const [btnState, setBtnStat] = useState('Add');
  const [prevWord, setPrevWord] = useState('');
  const inputRef = useRef('');
  const navigate = useNavigate();

  const jumbleArr = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  const jumbledWordArray = (word) => {
    let letters = word.split('');
    jumbleArr(letters);
    while (letters[0] === word[0]) {
      jumbleArr(letters);
    }

    let jumbledWord = letters.join('');
    return jumbledWord;
  };

  const handleGeneratedWord = () => {
    const randomNum = Math.ceil(Math.random() * dictionary.length);
    if (
      words.word.length < 10 &&
      !words.word.includes(inputRef.current.value)
    ) {
      const randomWord = dictionary[randomNum];

      setWords({
        ...words,
        word: [...words.word, randomWord],
        jumbleWord: [...words.jumbleWord, jumbledWordArray(randomWord)],
      });
    }
  };

  const handleAdd = () => {
    if (
      inputRef.current.value !== '' &&
      words.word.length < 10 &&
      !words.word.includes(inputRef.current.value)
    ) {
      setWords({
        ...words,
        word: [...words.word, inputRef.current.value.toLowerCase()],
        jumbleWord: [
          ...words.jumbleWord,
          jumbledWordArray(inputRef.current.value.toLowerCase()),
        ],
      });
      inputRef.current.value = '';
    }
  };

  const handleDelete = (word, index) => {
    const filteredWords = {
      word: words.word.filter((item, i) => i !== index),
      jumbleWord: words.jumbleWord.filter((item, i) => i !== index),
    };
    setWords(filteredWords);
  };

  const handleEdit = (word, index) => {
    inputRef.current.value = word;
    setPrevWord(word);
    setBtnStat('Save');
  };

  const handleChange = () => {
    const index = words.word.indexOf(prevWord);

    const changeWords = {
      word: words.word.map((word, i) => {
        if (i === index) {
          return (word = inputRef.current.value);
        } else {
          return word;
        }
      }),
      jumbleWord: words.jumbleWord.map((word, i) => {
        if (i === index) {
          return (word = jumbledWordArray(inputRef.current.value));
        } else {
          return word;
        }
      }),
    };

    setWords(changeWords);
    inputRef.current.value = '';
    setBtnStat('Add');
  };

  const handleInput = () => {
    if (words.word.length > 0) {
      navigate('/game');
    }
  };

  return (
    <section>
      <div className=" flex flex-col items-center justify-center">
        <p className="mb-4">
          Type in up to 10 pieces of vocabulary, using up to 20 characters:
        </p>

        <div className="mb-10 border-2 border-blue-400">
          <input
            ref={inputRef}
            className="border-none "
            placeholder="Enter a word"
            type="text"
          />
          <button
            onClick={btnState === 'Add' ? handleAdd : handleChange}
            className=" border-l-2 border-blue-400 px-4 py-2 font-semibold hover:bg-blue-400"
          >
            {btnState === 'Add' ? 'Add' : 'Save'}
          </button>

          <button
            disabled={dictionary.length > 1 ? false : true}
            type="button"
            onClick={handleGeneratedWord}
            className=" border-l-2 border-blue-400 px-4 py-2 font-semibold hover:bg-blue-400"
          >
            {dictionary.length > 1 ? 'Generate Word' : 'Loading...'}
          </button>
        </div>

        {words.word.length > 0 ? (
          <div className=" mb-5 flex flex-col gap-y-2">
            {words.word.map((word, index) => {
              return (
                <div
                  key={word}
                  className=" flex flex-row items-center border-2 border-blue-400"
                >
                  <p className="w-[22ch] px-4">{word}</p>

                  <div className="flex flex-row items-center border-l-2 border-blue-400 px-4 py-2">
                    <button
                      onClick={() => handleEdit(word, index)}
                      className="mr-2 hover:text-blue-400"
                    >
                      <BiIcons.BiEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(word, index)}
                      className="hover:text-blue-400"
                    >
                      <MdIcons.MdDeleteOutline size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        <button
          type="button"
          onClick={handleInput}
          className=" border-2 border-blue-400 px-4 py-2 font-semibold hover:bg-blue-400"
        >
          Create
        </button>
      </div>
    </section>
  );
};

export default Home;
