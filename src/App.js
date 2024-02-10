import React from "react";
import { useState } from "react";
import monkey from "./transparent_monkey.png";
import loveMonkey from "./transparentLoveMonkey.png";
import emailjs from "@emailjs/browser";
import "./App.css";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

function App() {
  const serviceId = "service_gz3rcsg";
  const templateId = "template_6h58ht9";
  const publicKey = "IWyz9Une8q0KMboQ5";
  const phrases = [
    "No",
    "are you sure",
    "rethink it",
    "is this your final answer?",
  ];
  const [noCount, setNoCount] = useState(0);
  const [yesButtonDimensions, setYesButtonDimensions] = useState({
    width: 60,
    height: 30,
    fontSize: 20,
  });
  const [isYesClicked, setIsYesClicked] = useState(false);

  const handleNoButton = (event) => {
    setYesButtonDimensions((prevDimensions) => ({
      width: prevDimensions.width + 20, // add 10 to the old width
      height: prevDimensions.height + 10, // add 5 to the old height
      fontSize: prevDimensions.fontSize + 10,
    }));
    setNoCount(noCount < phrases.length - 1 ? noCount + 1 : noCount);
    console.log(noCount);
  };

  const styles = {
    button: {
      width: noCount >= 1 ? "auto" : "60px",
      height: 30,
      fontSize: 20,
    },
  };

  const templateParams = {
    message: "User Said Yes",
  };
  const handleYesButton = (event) => {
    setIsYesClicked(true);
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("email sent successfully", response);
      })
      .catch((error) => {
        console.log("Error sending email", error);
      });
  };

  return isYesClicked ? (
    <div className="successPage">
      <h1 style={{ fontSize: 100 }}>YAYYYYYY!!!</h1>
      <img src={loveMonkey} alt="loveMonkey" />
    </div>
  ) : (
    <div className="app">
      <img src={monkey} className="monkey-logo" alt="logo" />
      <p>Will You Be My Valentine?</p>

      <div className="buttonContainer">
        <button
          className="buttons"
          style={yesButtonDimensions}
          onClick={handleYesButton}
        >
          Yes
        </button>
        <button
          onClick={handleNoButton}
          className="buttons"
          style={styles.button}
        >
          {phrases[noCount]}
        </button>
      </div>
    </div>
  );
}

export default App;
