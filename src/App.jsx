import { useState, createContext, useEffect } from 'react';
import Input from './pages/Input';
import Game from './pages/Game';
import { Routes, Route } from 'react-router-dom';
import img from './assets/towfiqu-barbhuiya-5u6bz2tYhX8-unsplash.jpg';

export const WordContext = createContext({});

function App() {
  const [words, setWords] = useState({ word: [], jumbleWord: [] });
  const [dictionary, setDictionary] = useState([]);

  const fetchWords = async () => {
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/all');
      const json = await response.json();
      setDictionary(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <WordContext.Provider value={[words, setWords]}>
      <main
        style={{ backgroundImage: `url(${img})` }}
        className=" min-h-screen bg-cover"
      >
        <div className="container mx-auto min-h-screen bg-white py-10">
          <div className="mb-10 text-center">
            <h1 className="text-6xl font-bold text-yellow-300">unJumble</h1>
            <h3 className="text-2xl">Anagram Maker</h3>
          </div>
          <Routes>
            <Route path="/" element={<Input dictionary={dictionary} />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </div>
      </main>
    </WordContext.Provider>
  );
}

export default App;
