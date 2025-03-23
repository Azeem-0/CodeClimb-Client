import React, { useCallback, useContext, useEffect, useState } from "react";
import "./LandingPage.css";
import { IoIosInformationCircle } from "react-icons/io";
import Guidelines from "../../Components/Guidelines/Guidelines";
import { loginDataContextProvider } from "../../Contexts/LoginDataContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function LandingPage() {
  const [guidelines, setGuideLines] = useState(false);
  const { formData, gameUp } = useContext(loginDataContextProvider);

  const navigate = useNavigate();

  useEffect(() => {
    if (gameUp === true) {
      navigate("/map");
    }

    if (localStorage.getItem("user") === null) {
      navigate("/");
    }
  }, []);

  const startGame = async () => {
    //just have to make a api hit to start the game and it should contain admin id in it.

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/metrics/set-contest-time`,
      { regNo: formData.username }
    );
    console.log(response.data);
  };

  return (
    <div className={"map-page-container"}>
      <div className="score-block">{guidelines && <Guidelines />}</div>
      <h3 id="user-welcome">Welcome {formData.username}🎉</h3>
      <IoIosInformationCircle
        className="guide-lines-button"
        onClick={() => {
          setGuideLines(!guidelines);
        }}
      />
      {guidelines && <Guidelines />}

      {[
        "AdminAzeem",
        "AdminSathish",
        "AdminSathvik",
        "21331a05g3",
        "21331a05g5",
        "21331A05G3",
        "21331A05G5",
      ].includes(formData.username) && (
        <button
          className="bg-white absolute top-0 right-0 m-2 p-2 rounded-2xl cursor-pointer"
          onClick={startGame}
        >
          Start A New Game
        </button>
      )}

      <div className="about-child">
        <div className="about-description">
          <h2 className="font-bold text-3xl">About Code and Climb</h2>
          <p>
            Code and Climb transforms traditional gaming into an interactive
            learning experience by embedding coding challenges within the
            classic snake and ladder game. Designed to make coding competitions
            more engaging, this platform combines strategy, problem-solving, and
            excitement, ensuring an immersive experience for students. With a
            proven track record of hosting contests for 200-250 participants
            simultaneously, Code and Climb is redefining the way students
            practice and compete in coding. 🚀
          </p>
        </div>

        <img
          src="https://imgs.search.brave.com/GMRuPsHEaEmE9l4oJIkCZ6JqLkCPRw46o45Tvz5qOYM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM4LmFscGhhY29k/ZXJzLmNvbS80NDgv/NDQ4MDEwLmpwZw"
          alt=""
        />
      </div>
    </div>
  );
}
