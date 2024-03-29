import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const Weather = () => {
  const [reportData, setReportData] = useState(); //main data
  const [city, setCity] = useState("Zug"); // choosing city
  const [country, setCountry] = useState("CH"); // choosing country
  const [show, setGoster] = useState(0); // showing report
  const [temp, setTemp] = useState(); //getting temp
  const [reportTime, setReportTime] = useState(); //getting report Time
  const [icon, setIcon] = useState();
  const [description, setDescription] = useState();
  const [clouds, setClouds] = useState();
  const [wind, setWind] = useState();

  //making europa date format
  let time = new Date(reportTime);
  let hours = time.getHours() + 2;
  let minutes = time.getMinutes();

  useEffect(() => {
    const getReport = async () => {
      //getting data
      try {
        const response = await fetch(
          "https://api.weatherbit.io/v2.0/current?&city=" +
            city +
            "&country=" +
            country +
            "&key=077ee4f3e79f488c837d01b1ed2532aa&include=minutely"
        );
        const dataJson = await response.json();
        setIcon(dataJson.data[0].weather.icon);
        setDescription(dataJson.data[0].weather.description);
        setClouds(dataJson.data[0].clouds);
        setWind(dataJson.data[0].wind_spd);

        dataJson.data.map((city) => {
          setReportData(city.city_name);
          setTemp(city.temp);
          setReportTime(city.ob_time);
          return city;
        });
      } catch (e) {
        console.log("that failed", e);
      }
    };
    getReport();
  }, [show, city, country]);

  return (
    <div className="container">
      <div>
        <h1 className="mb-5">Weather Reports</h1>
        <div className="temperature">
          {temp} °C
          <img
            alt="icon"
            src={`https://www.weatherbit.io/static/img/icons/${icon}.png`}
          ></img>{" "}
          {description}
        </div>
        <InputGroup className="mb-3">
          {/*texting city name */}
          <FormControl
            onChange={(event) => setCity(event.target.value)}
            placeholder="city name"
          />
          <FormControl
            onChange={(event) => setCountry(event.target.value)}
            placeholder="country code"
          />
          {/* button for showing */}
          <InputGroup.Append>
            <Button onClick={() => setGoster(show + 1)} variant="dark">
              Show
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
      {/* showing report information */}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>City Name</th>
            <th>Wind Speed</th>
            <th>Clouds</th>
            <th>Report Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{reportData}</td>
            <td>{wind} km/s</td>
            <td>%{clouds}</td>
            <td>
              {hours}:{minutes}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Weather;
