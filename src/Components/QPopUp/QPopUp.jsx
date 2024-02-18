import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import './QPopUp.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { userContextProvider } from '../../Contexts/UserContext';
import { loginDataContextProvider } from '../../Contexts/LoginDataContext';
import { diceContextProvider } from '../../Contexts/DiceContext';
const QPopUp = (props) => {
    const { formData } = useContext(loginDataContextProvider);
    const regNo = formData.username;
    const { giveUp, from, difficulty, pawn, setPawn, changePositionOnSuccess } = props;
    const [code, setCode] = useState(``);
    const [openCompiler, setOpenCompiler] = useState(false);
    const { user } = useContext(userContextProvider);
    const { setDiceRoll } = useContext(diceContextProvider);
    const [question, setQuestion] = useState();
    const [questionHeading, setQuestionHeading] = useState();
    const changeCode = (e) => {
        const { value } = e.target;
        setCode(value);
    }
    const pushCode = async (e) => {
        e.preventDefault();
        try {
            // replace hard values with qId and etc after frontend
            const submissionId = await user + new Date().getTime();
            
            const response = await axios.post('http://localhost:3001/api/codes/run-code', {
                code: code,
                submissionId: submissionId,
                qId: question.qId,
                difficulty: difficulty
            });
            const data = response.data;
            if (data.status) {
                changePositionOnSuccess(from);
                toast.success(`${data.message}!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            else {
                giveUp(from);
                toast.error("Code failed!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
        catch (err) {
            console.log("Error");
        }
    }
    const reset = (type) => {
        setPawn((prev) => {
            return { ...prev, questions: { ...prev.questions, [type]: [] } }
        })
    }
    const fetchQuestion = async (difficulty) => {
        try {
            const response = await axios.post('http://localhost:3001/api/details/getQuestion', { difficulty: difficulty, regNo: regNo });
            const data = response.data;
            if (data.status === true) {
                setQuestion(data.question);
                setPawn((prev) => {
                    return { ...prev, questions: { ...prev.questions, [difficulty]: [...(prev.questions[difficulty] || []), data.question.qId] } };
                });
            }
            else {
                console.log(data.message);
            }
        }
        catch (err) {
            console.log('Error Occured');
        }
    }
    const changeQuestionHeading = (difficulty) => {
        //This is causing the unexpected behaviour,
        // setDiceRoll((prev) => {
        //     return { ...prev, state: true }
        // });
        if (difficulty === 'easy') {
            setQuestionHeading("Correct the syntax and rewrite the code in the box below:");
        }
        else if (difficulty === 'medium') {
            setQuestionHeading("Fill the missing Code to get the desired output:");
        }
        else {
            setQuestionHeading('Solve the problem:');
        }
    }
    useState(() => {
        fetchQuestion(difficulty);
        changeQuestionHeading(difficulty);
        if (pawn?.questions?.easy?.length === 10) {
            reset('easy');
        }
        if (pawn?.questions?.medium?.length === 7) {
            reset('medium');
        }
        if (pawn?.questions?.hard?.length === 7) {
            reset('hard');
        }
    }, []);
    return (
        <div className='pop-up-block' id = {openCompiler ? 'pop-up-block-hard' : undefined}>
            {!openCompiler && <div className='pop-up-question-block' >
                <p>Solve the Problem.</p>
                    {difficulty === 'medium' ? (
                        <img id = ' question-image' src={`http://localhost:3001/${question?.question}`} alt="" />
                        ) : (
                        <div className='question-block'><p>{question?.question}</p></div>
                    )}
            </div>}
            {(difficulty === 'hard' && openCompiler === true) &&
                <div className='pop-up-compiler-block'>
                    <div data-pym-src="https://www.jdoodle.com/a/7fRG"></div>
                    <Helmet>
                        <script src="https://www.jdoodle.com/assets/jdoodle-pym.min.js" type="text/javascript" />
                    </Helmet>
                </div>
            }
            {difficulty === 'hard' && <div style = {{display:'flex', justifyContent:'center',alignItems:'center'}}>
                <button id = "compiler-dynamic-button" onClick={() => {
                    setOpenCompiler(!openCompiler);
                }}>{openCompiler ? "Close Compiler" : "Open Compiler"}</button></div>}
            
            <div className='pop-up-code-block' id = {difficulty === 'medium' ? 'pop-up-code-block-img' : undefined} >
                <textarea onChange={changeCode} name="code" id="code" style={{ width: difficulty === 'medium' ? '18em' : (difficulty === "hard" && openCompiler) ? '30em' : 'auto' }} 
                        rows={difficulty === 'medium' ? '15' : (difficulty === "hard" && openCompiler) ? '20' : '3'} placeholder='Paste the code here to submit.'></textarea>
                <div className='pop-up-bottom-block'>
                    <button onClick={pushCode}>Submit</button>
                    <button onClick={() => {
                        giveUp(from);
                    }}>Give Up</button>
                </div>
            </div>
        </div>
    )
}

export default QPopUp;