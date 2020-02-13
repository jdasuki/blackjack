import React, {useEffect} from "react";
import Grid from '@material-ui/core/Grid';
import IntegrationLayer from '../../integration/IntegrationLayer';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Typography from '@material-ui/core/Typography';
import PlayerHand from '../PlayerHand/PlayerHand';
import DealerHand from '../DealerHand/DealerHand';
import { connect } from "react-redux";
import { updatePlayerStandStatus } from '../../redux/action';
import BlackjackLogic from "../../BlackjackLogic";
import './Table.css';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        updatePlayerStandStatus: boolean => dispatch(updatePlayerStandStatus(boolean))
    }
}

const mapStateToProps = state => {
    return { 
        playerHandTotal: state.playerHandTotal,
        dealerHandTotal: state.dealerHandTotal,
        playerStandStatus: state.playerStandStatus
    };
}

function ConnectedTable({playerHandTotal, dealerHandTotal, playerStandStatus, updatePlayerStandStatus}) {
    const [playerHand, setPlayerHand] = React.useState();
    const [dealerHand, setDealerHand] = React.useState();
    const [isVictory, setIsVictory] = React.useState(false);
    const [gameOver, setGameOver] = React.useState(false);

    useEffect(() => {
        if (playerStandStatus && dealerHandTotal > 0) {
            let victoryStatus = BlackjackLogic.isVictory(playerHandTotal, dealerHandTotal);
            console.log(victoryStatus)
            victoryStatus ? setIsVictory(true) : setIsVictory(false);
            setGameOver(true);
        }
    }, [dealerHandTotal])

    async function deal() {
        setGameOver(false);
        updatePlayerStandStatus(false);

        const playerCards = await IntegrationLayer.getCards(2);
        setPlayerHand(await playerCards);

        const dealerCards = await IntegrationLayer.getCards(2);
        setDealerHand(await dealerCards);
    }

    return (
        <div className="value-text">
            {gameOver && 
                (isVictory ? 
                    (`You Win! Your hand total: ${playerHandTotal}. Dealer hand total: ${dealerHandTotal}`) 
                    : 
                    (`You lose :(. Your hand total: ${playerHandTotal}. Dealer hand total: ${dealerHandTotal}`) 
            )}

            <DealerHand startingHand={dealerHand}/>

            <div className="flex-center">
                <ButtonToolbar className="buttons">
                    <Button className="deal-button" onClick={() => deal()}>DEAL</Button>
                </ButtonToolbar>
            </div>

            <PlayerHand startingHand={playerHand}/>
        </div>
    );
}

const Table = connect(mapStateToProps, mapDispatchToProps) (ConnectedTable)
export default Table;