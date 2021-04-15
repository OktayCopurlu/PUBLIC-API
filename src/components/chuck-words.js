import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ChuckWords = () => {
  const [categories, setCategories] = useState([]); // setting categories
  const [category, setCategory] = useState("random"); // choosing category
  const [wordsFromCategories, setWordsFromCategories] = useState(); // words from categories
  const [nextWord, setNextWord] = useState(0); // next new words.
  const [randomWords, setRandomWords] = useState([]); // words from random

  // setting categories
  useEffect(() => {
    const getCategory = async () => {
      const response = await fetch(
        "https://api.chucknorris.io/jokes/categories"
      );
      const data = await response.json();
      setCategories(data);
    };
    getCategory();
  }, []);

  // words from random
  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await response.json();
      setRandomWords(data);
    };
    loadData();
  }, [nextWord]);

  // words from categories

  useEffect(() => {
    const changeCategory = async () => {
      const response = await fetch(
        "https://api.chucknorris.io/jokes/random?category=" + category
      );
      const data = await response.json();
      setWordsFromCategories(data.value);
    };

    //eğer category === random olduğunda 404 hatası alınıyor. çünkü random diye bir category yok.
    if (category !== "random") {
      changeCategory();
    }
  }, [category, nextWord]);

  return (
    <div className="container-large">
      {/* showing icon */}
      <img alt="avatar" src={randomWords.icon_url} />
      <h1>Chuck Norris Quotes</h1>
      <div className="container mt-3">
        <div>
          <label for="categories">Choose Category</label>

          {/* setting categories */}
          <select
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            id="category"
            className=" ml-3"
          >
            {/* select categories */}
            {categories.map((categori) => {
              return (
                <option key={categori} value={categori}>
                  {categori}
                </option>
              );
            })}
            <option value="random" selected>
              Random
            </option>
          </select>
        </div>
        {/* showing words */}
        <div className="words mt-5">
          {category === "random" ? randomWords.value : wordsFromCategories}
        </div>
        {/* changing next word */}
        <button
          className="mt-5 btn btn-light"
          onClick={() => setNextWord(nextWord + 1)}>
          Change Word
        </button>
      </div>
    </div>
  );
};

export default ChuckWords;
