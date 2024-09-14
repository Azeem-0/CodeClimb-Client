import React, { useCallback, useContext, useEffect, useState } from 'react'
import "./LandingPage.css";
import { IoIosInformationCircle } from "react-icons/io";
import Guidelines from '../../Components/Guidelines/Guidelines';
import { loginDataContextProvider } from '../../Contexts/LoginDataContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function LandingPage() {
    const [guidelines, setGuideLines] = useState(false);
    const { formData, gameUp } = useContext(loginDataContextProvider);

    const navigate = useNavigate();

    useEffect(() => {

        if (gameUp === true) {
            navigate('/map');
        }

        if (localStorage.getItem('user') === null) {
            navigate("/");
        }
    }, []);

    const startGame = async () => {
        //just have to make a api hit to start the game and it should contain admin id in it.

        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/metrics/set-contest-time`, { regNo: formData.username });
        console.log(response.data);
    }

    return (
        <div className={'map-page-container'}>
            <div className='score-block'>
                {guidelines && <Guidelines />}
            </div>
            <h3 id='user-welcome'>Welcome {formData.username}🎉</h3>
            <IoIosInformationCircle className='guide-lines-button' onClick={() => {
                setGuideLines(!guidelines);
            }} />
            {guidelines && <Guidelines />}

            {(["AdminAzeem", "AdminSathish", "AdminSathvik"].includes(formData.username)) && <button onClick={startGame}>Start A New Game</button>}


            <div className="about-child">
                <div className="about-description">
                    <h2>About Code and Climb</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum dolorum inventore corporis provident officia laudantium ex, pariatur fuga voluptatem, obcaecati saepe doloribus dolor dicta architecto nesciunt incidunt voluptatum? Ab, enim.</p>
                </div>

                <img src="https://imgs.search.brave.com/GMRuPsHEaEmE9l4oJIkCZ6JqLkCPRw46o45Tvz5qOYM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM4LmFscGhhY29k/ZXJzLmNvbS80NDgv/NDQ4MDEwLmpwZw" alt="" />
            </div>

            <div className="about-child">
                <img src="https://imgs.search.brave.com/GMRuPsHEaEmE9l4oJIkCZ6JqLkCPRw46o45Tvz5qOYM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM4LmFscGhhY29k/ZXJzLmNvbS80NDgv/NDQ4MDEwLmpwZw" alt="" />


                <div className="about-description">
                    <h2>About Code and Climb</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum dolorum inventore corporis provident officia laudantium ex, pariatur fuga voluptatem, obcaecati saepe doloribus dolor dicta architecto nesciunt incidunt voluptatum? Ab, enim.</p>
                </div>

            </div>
        </div >
    )
}
