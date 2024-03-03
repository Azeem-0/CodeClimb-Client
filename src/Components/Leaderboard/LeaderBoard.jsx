import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion components
import "./LeaderBoard.css";
import { leaderBoardContextProvider } from '../../Contexts/LeaderBoardContext';
import { pawnContextProvider } from '../../Contexts/PawnContext';
export default function LeaderBoard() {
    const { leaderBoard, getLeaderBoard } = useContext(leaderBoardContextProvider);
    const {pawn} = useContext(pawnContextProvider); 
    useEffect(() => {
        getLeaderBoard();
    }, [pawn]);

    return (
        <motion.div
            id='leader-board-div'
            initial={{ opacity: 0, y: -50 }} // Initial animation properties
            animate={{ opacity: 1, y: 0 }} // Animation properties when component is mounted
            transition={{ duration: 0.5 }} // Animation duration
        >
            <h2><u>LeaderBoard</u></h2>
            <motion.ol
                className='leader-board-list'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }} // Add delay for stagger effect
            >
                {(leaderBoard && leaderBoard.length) ?
                    leaderBoard.map((seeding, i) => (
                        <motion.li
                            key={i}
                            className='leader-board-seeding'
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }} // Staggered animation delay
                        >
                            <h4>{i + 1}.{seeding?.regNo}</h4>
                            <p> -{seeding?.score}pts</p>
                        </motion.li>
                    )) : <></>}
            </motion.ol>
        </motion.div>
    )
}
