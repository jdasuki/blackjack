import React, {useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BlackjackLogic from '../../BlackjackLogic';
import Button from '@material-ui/core/Button';
import IntegrationLayer from '../../integration/IntegrationLayer';
import { connect } from "react-redux";
import { updateDealerHandTotal } from '../../redux/action';
import CardBack from '../../card-back.jpg';
import './DealerHand.css';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }));

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        updateDealerHandTotal: total => dispatch(updateDealerHandTotal(total))
    }
}

const mapStateToProps = state => {
    return { 
        playerStandStatus: state.playerStandStatus
    };
}

function ConnectedDealerHand({playerStandStatus, updateDealerHandTotal, startingHand}) {
    const classes = useStyles();
    const [handValue, setHandValue] = React.useState();
    const [hand, setHand] = React.useState(startingHand);

    let isFirstCardHidden = false;

    useEffect(() => {
        setHand(startingHand);
    }, [startingHand])

    useEffect(() => {
        setHandValue(BlackjackLogic.getHandValue(hand));
    }, [hand])

    useEffect(() => {
        if (playerStandStatus){
            playDealersHand()
        }
    }, [playerStandStatus])

    async function playDealersHand() {
        let dealersFinalHand = await BlackjackLogic.playDealersHand(hand);
        setHand(dealersFinalHand);
        updateDealerHandTotal(BlackjackLogic.getHandValue(dealersFinalHand))
    }

    function FormRow() {
        return (
          <React.Fragment>
            {playerStandStatus ? 
                <React.Fragment>
                    {
                        hand && hand.map(card => 
                        (
                        <Grid container className="card-grid" item xs={12 / hand.length}>
                            <Paper className="card-paper">
                                <img src={card.image} />
                            </Paper>
                        </Grid>
                        ))
                    }
                </React.Fragment>
                :
                <React.Fragment>
                    {
                        hand && hand.map(card => 
                            (
                            <Grid container className="card-grid" item xs={12 / hand.length}>
                                <Paper className="card-paper">
                                    {isFirstCardHidden ? <img src={card.image} /> : (isFirstCardHidden = true, <img className="card-back" src={CardBack} />)}
                                </Paper>
                            </Grid>
                            ))
                    }
                </React.Fragment>
        }
        </React.Fragment>
        );
      }

    return (
        <div>
            {hand && (
                <div>
                    Dealer's Hand
                </div>
            )}
            <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
            </Grid>
        </div>
    )
}

const DealerHand = connect(mapStateToProps, mapDispatchToProps) (ConnectedDealerHand);
export default DealerHand;