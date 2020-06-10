import React from "react";
import logo from "./logo.svg";
import "./App.css";

// leaving public for demonstration purposes
const accessToken: string =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZWUwZmNjYzNmNDU0ZTAwMTI4MmMwYjAiLCJzYWx0X2hhc2giOiI2MzM1YTVlOWViOGMxMWIzYjhmMWUzNTBlOTliMDBlNCIsInJvbGVzIjoidXNlciIsInBhcnRuZXJfaWRzIjpbXSwib3RwIjpmYWxzZSwiZXhwIjoxNTk2OTg3MDg1LCJpYXQiOjE1OTE4MDMwODUsImF1ZCI6IjVkNDA5OTZlNmU2MDQ5MDAwNzQ5MGZhMiIsImlzcyI6IkdyYXZpdHkiLCJqdGkiOiI1ZWUwZmNjZDc5YTIxZTAwMTFhOTFiZjgifQ.FXBcdKAG3PUyldvDHgdi3mO98RWxyNChh6_lB8120p0";

const userId: string = "5ee0fccc3f454e001282c0b0";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
