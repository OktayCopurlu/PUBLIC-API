import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Exchange = () => {
  const [amount, setAmount] = useState(1); //getting amount
  const [base, setBase] = useState("EUR"); //getting Base rate
  const [date, setDate] = useState(); //getting  time
  const [rate, setRate] = useState(); //showing oposite amount
  const [rates, setRates] = useState([]); // getting all rates
  const [toRate, setToRate] = useState("AUD"); //getting opposite rate

  useEffect(() => {
    const getReport = async () => {
      //getting main data
      const mainData = await fetch("https://api.frankfurter.app/latest");
      const mainDataJson = await mainData.json();
      setRates(mainDataJson.rates);

    //getting exchange data
      const response = await fetch(
        "https://api.frankfurter.app/latest?amount=" +
          amount +
          "&from=" +
          base +
          "&to=" +
          toRate
      );
      const dataJson = await response.json();
      setBase(dataJson.base);
      setDate(dataJson.date);
      setRate(dataJson.rates[toRate]);
    };
    getReport();
  }, [amount, base, toRate]);

  return (
    <>
      <div className="container">
        {/* date */}
        <h2>{date}</h2>
        <h2 className="mb-5">Exchange Rates</h2>
        <div>
          {/* getting amount */}
          <input
            onChange={(event) => setAmount(event.target.value)}
            placeholder="amount"
            className="mb-3"/>

            {/* choosing Base rate */}
          <select className="ml-4"
            onChange={(event) => setBase(event.target.value)}
            name="rates"
            id="rates">
            {Object.keys(rates).map((element) => (
              <option key={element} value={element}>
                {element}
              </option>
            ))}
            <option value="EUR" selected>
              EUR
            </option>
          </select>
        </div>
        <h1>=</h1>
        <div>
          {/* showing total amount */}
          <span className="total-rate display-4">{rate}</span>
          
          {/* showing oposite rate */}
          <select
            onChange={(event) => setToRate(event.target.value)}
            name="rates"
            id="rates"
            className="ml-4">
            {Object.keys(rates).map((element) => (
              <option key={element} value={element}>
                {element}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Exchange;
