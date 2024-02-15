import React, { useContext, useEffect, useState } from 'react';
import { snakes, ladders } from '../../Constants/MapConstants';
import QPopUp from '../QPopUp/QPopUp.jsx';
import ladder from '../../Assets/Ladder1.png';
import './RBP.css';
import Pawn from './Pawn';
import { diceContext } from '../../Contexts/DiceContext.jsx';
const Block = (props) => {
    const { setDiceRoll } = useContext(diceContext);
    const { blockId, pawn, updatePawn } = props;
    const [block, setBlock] = useState({
        isPawn: blockId === pawn.blockId ? true : false,
        blockId: blockId,
        isSnake: snakes[blockId] ? snakes[blockId] : false,
        isLadder: ladders[blockId] ? ladders[blockId] : false,
        noOfUsers: 0,
    });
    const changeBlock = () => {
        setBlock((prev) => {
            return { ...prev, isPawn: blockId === pawn.blockId }
        });
    }
    const giveUp = (from) => {
        setBlock((prev) => {
            return { ...prev, isPawn: false }
        });
        const value = from === 'snake' ? block.isSnake.end : block.isLadder.start + 1;
        updatePawn(value, 'ladder-or-snake');
    }
    useEffect(() => {
        changeBlock();
    }, [pawn]);
    return (
        <div id={'block-id-names' + block.blockId} className='block-head'>
            {block.isSnake && <img className={'snake-id-' + block.isSnake.start} src={block.isSnake.snake} alt='snake'></img>}
            {block.isLadder && <img className={'block-id-' + block.blockId} src={ladder} alt='ladder'></img>}
            <span className='no-of-users-count'>
                {block.noOfUsers}
            </span>
            {block.isPawn ? <Pawn pawn={pawn} /> : <p className='block-number'>{block.blockId}</p>}
            {(block.isPawn && block.isSnake) ? <QPopUp from='snake' giveUp={giveUp} /> : null}
            {(block.isPawn && block.isLadder) ? <QPopUp from='ladder' giveUp={giveUp} /> : null}
        </div>
    )
}

export default Block