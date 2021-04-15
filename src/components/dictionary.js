import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dictionary() {
  const [word, setWord] = useState("word"); //getting word
  const [show, setShow] = useState(0); //showing mean
  const [mean, setMean] = useState(); // getting mean
  const [group, setGroup] = useState("group"); // getting words group-kind
  const [languageData, setLanguageData] = useState([]); //getting languages data
  const [chooseLanguage, setChooseLanguage] = useState("en-de"); //choosing language

  useEffect(() => {
    const getReport = async () => {
      //getting main data
      const mainData = await fetch(
        "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20210414T221204Z.69e9e75f3a26a0a5.7768451cfc8ed6df3a03c303117b928fb6bbffe6&lang=" +
          chooseLanguage +
          "&text=" +
          word
      );
      const mainDataJson = await mainData.json();
      setMean(mainDataJson.def[0].tr[0].text);
      setGroup(mainDataJson.def[0].tr[0].pos);

      //getting languages data
      const language = await fetch(
        "https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=dict.1.1.20210414T221204Z.69e9e75f3a26a0a5.7768451cfc8ed6df3a03c303117b928fb6bbffe6"
      );
      const languageJson = await language.json();
      setLanguageData(languageJson);
    };
    getReport();
  }, [show]); //when click on the show button, it works again

  return (
    <div className="container">
      <h3 className="mb-5">Welcome to The Dictionary</h3>
      <div className="mb-3">
        {/* write to words here */}
        <input
          onChange={(event) => setWord(event.target.value)}
          placeholder="word"
          className="m-3"
        />

        {/* click this buttun to mean */}
        <button className="btn btn-light p-2" onClick={() => setShow(show + 1)}>
          Show
        </button>
      </div>

      <table className="table mt-4">
        <thead>
          <tr class>
            <th>Language</th>
            <th>Mean</th>
            <th>Kind</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>

              {/* showing languages options */}
              <select
                onChange={(event) => setChooseLanguage(event.target.value)}>
                {languageData.map((element) => {
                  return (
                    <option key={element} value={element}>
                      {element}
                    </option>
                  );
                })}
                <option value="en-de" selected>
                  en-de
                </option>
              </select>
            </td>
            {/* showing mean and word group */}
            <td>{mean}</td>
            <td>{group}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
