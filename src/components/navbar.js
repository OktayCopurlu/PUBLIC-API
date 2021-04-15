import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Dictionary from "./dictionary";
import Exchange from "./exchange";
import Weather from "./weather";
import ChuckWords from "./chuck-words";

export default function TopNavbar() {

  const [sheet, setSheet] = useState("ChuckWords");
  return (
    <>
      <Navbar className="navbar" bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link className="navbar-link" onClick={() => setSheet("Dictionary")} href="#Dictionary">
            Dictionary
          </Nav.Link>
          <Nav.Link className="navbar-link" onClick={() => setSheet("Exchange")} href="#Exchange">
            Exchange
          </Nav.Link>
          <Nav.Link className="navbar-link" onClick={() => setSheet("Weather")} href="#Weather">
            Weather
          </Nav.Link>
          <Nav.Link className="navbar-link" onClick={() => setSheet("ChuckWords")} href="#ChuckWords">
            ChuckWords
          </Nav.Link>
        </Nav>
      </Navbar>
      {sheet === "Dictionary" ? <Dictionary /> : null}
      {sheet === "Exchange" ? <Exchange /> : null}
      {sheet === "Weather" ? <Weather /> : null}
      {sheet === "ChuckWords" ? <ChuckWords /> : null}
    </>
  );
}
