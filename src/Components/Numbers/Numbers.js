import "./Numbers.scss";
import ProgressBar20 from "../ProgressBar20/ProgressBar20";
import { useEffect, useState } from "react";
import axios from "axios";
import BNumbersPicture from "../BNumbersPicture/BNumbersPicture";
import BBox from "../BBox/BBox";
import BNext from "../BNext/BNext";
import BNumbersPictureGreen from "../BNumbersPictureGreen/BNumbersPictureGreen";

import { useNavigate } from "react-router-dom";
import LogoBlack3 from "../../Assests/icons/logoBlack3.png";
import CategoriesLogo from "../../Assests/icons/CategoriesLogo.png";
import { Link } from "react-router-dom";
import BNumbersPictureRed from "../BNumbersPictureRed/BNumbersPictureRed";

export default function Numbers() {
  const [anatomyList, setAnatomyList] = useState([]);
  const [showCorrect, setShowCorrect] = useState(false);
  // const [showInCorrect, setShowInCorrect] = useState(true);
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const [currentQuestions, setCurrentQuestion] = useState(0);
  const [error, setError] = useState(false);
  // ............................................................
  const getAnatomy = async () => {
    try {
      const anatomyResponse = await axios.get("http://localhost:5050/numbers");
      setAnatomyList(anatomyResponse.data);
      console.log(anatomyResponse.data);
    } catch (error) {
      console.error("this is an error", error);
    }
  };
  useEffect(() => {
    getAnatomy();
  }, []);

  // CORRECT
  // ............................................................
  const correctAnswer = () => {
    setShowCorrect(true);
    setError(false);
    setScore((prevCount) => prevCount + 1);
  };

  const nextQuestion = () => {
    if (currentQuestions === anatomyList.length - 1) {
      navigate("/Categories/TotalScore", { state: { score: score } });
    } else {
      setCurrentQuestion(currentQuestions + 1);
      setShowCorrect(false);
      setShowNext(false);
    }
  };
  // Function to handle button click
  const handleClick = () => {
    setShowNext(true);
    setError(true);
    // setShowNight(true);
  };
  // ............................................................
  //RIGHT = GREEN
  if (showCorrect) {
    return (
      <div className="anatomy">
        <div className="categories__container ">
          <div className="home__logoContainer">
            <Link className="home__link1" to="/">
              <img className="home__logo" src={LogoBlack3} alt="Logo"></img>
            </Link>
            <ProgressBar20 />
            <Link className="home__link1" to="/categories">
              <img className="home__logo" src={CategoriesLogo} alt="Logo"></img>
            </Link>
          </div>
          <div className="alphabets__box">
            <p className="alphabets__title">NUMBERS</p>
          </div>

          <BNumbersPictureGreen src={anatomyList[currentQuestions]?.image} />
          <section className="anatomy__content">
            <div className="anatomy__communication">
              <p className="anatomy__thokNaath">
                {anatomyList[currentQuestions]?.thokNaath}
                <p className="anatomy__thokNaathPronunciation">
                  {anatomyList[currentQuestions]?.thokNaath_pronunciation}
                </p>
              </p>
            </div>
            <section className="anatomy__ScoreNext">
              {!showNext && (
                <span className="anatomy__next1">
                  <div className="anatomy__next">
                    <BNext text="NEXT" onClick={nextQuestion} />
                  </div>
                </span>
              )}

              <div className="numbers__tools">
                <div className="numbers__score">{score}/21</div>
              </div>
            </section>
          </section>
          <div className="anatomy__AllBox">
            <BBox
              text={anatomyList[currentQuestions]?.English_correct}
              className="box__squares box__squares--correct"
              onClick={correctAnswer}
            />
            <BBox
              className="box__squares "
              text={anatomyList[currentQuestions]?.english_one}
            />
            <BBox
              className="box__squares"
              text={anatomyList[currentQuestions]?.english_two}
            />
            <BBox
              className="box__squares"
              text={anatomyList[currentQuestions]?.english_three}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="anatomy">
      <div className="categories__container ">
        <div className="home__logoContainer">
          <Link className="home__link1" to="/categories">
            <img className="home__logo" src={LogoBlack3} alt="Logo"></img>
          </Link>
          <ProgressBar20 />
          <Link className="home__link1" to="/categories">
            <img className="home__logo" src={CategoriesLogo} alt="Logo"></img>
          </Link>
        </div>

        <div className="alphabets__box">
          <p className="alphabets__title">NUMBERS</p>
          {/* <p className="alphabets__alpT"> ALPHABET</p> */}
        </div>

        <BNumbersPicture
          src={anatomyList[currentQuestions]?.image}
          className={
            error ? "numpictures__npicture--incorrect" : "numpictures__npicture"
          }
        />
        <section className="anatomy__content">
          <div className="anatomy__communication">
            <p className="anatomy__thokNaath">
              {anatomyList[currentQuestions]?.thokNaath}
              <p className="anatomy__thokNaathPronunciation">
                {anatomyList[currentQuestions]?.thokNaath_pronunciation}
              </p>
            </p>
          </div>
          <section className="anatomy__ScoreNext">
            {showNext && (
              <span className="anatomy__next1">
                <div className="anatomy__next">
                  <BNext text="NEXT" onClick={nextQuestion} />
                </div>
              </span>
            )}
            <div className="anatomy__tools">
              <div className="anatomy__score">{score}/21</div>
            </div>
          </section>
        </section>
        <div className="anatomy__allBox">
          <BBox
            className="box__squares"
            text={anatomyList[currentQuestions]?.English_correct}
            onClick={correctAnswer}
          />
          <BBox
            className={error ? "box__squares--incorrect" : "box__squares"}
            text={anatomyList[currentQuestions]?.english_one}
            onClick={handleClick}
          />
          <BBox
            className={error ? "box__squares--incorrect" : "box__squares"}
            text={anatomyList[currentQuestions]?.english_two}
            onClick={handleClick}
          />
          <BBox
            className={error ? "box__squares--incorrect" : "box__squares"}
            text={anatomyList[currentQuestions]?.english_three}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}
