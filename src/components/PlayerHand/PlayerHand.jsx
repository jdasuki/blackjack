import React, {useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BlackjackLogic from '../../BlackjackLogic';
import Button from '@material-ui/core/Button';
import IntegrationLayer from '../../integration/IntegrationLayer';
import { connect } from "react-redux";
import { updatePlayerHandTotal, updatePlayerStandStatus } from '../../redux/action';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        updatePlayerHandTotal: total => dispatch(updatePlayerHandTotal(total)),
        updatePlayerStandStatus: boolean => dispatch(updatePlayerStandStatus(boolean))
    }
}

const mapStateToProps = state => {
    return { 
        playerStandStatus: state.playerStandStatus
    };
}

function ConnectedPlayerHand({playerStandStatus, updatePlayerStandStatus, updatePlayerHandTotal, startingHand}) {
    const classes = useStyles();
    const [handValue, setHandValue] = React.useState();
    const [isBlackjack, setIsBlackJack] = React.useState(false);
    const [isBust, setIsBust] = React.useState(false);
    const [hand, setHand] = React.useState(startingHand);

    
    useEffect(() => {
        console.log(startingHand);
        setHand(startingHand);
    }, [startingHand])

    useEffect(() => {
        setHandValue(BlackjackLogic.getHandValue(hand));
    }, [hand])

    useEffect(() => {
        setIsBlackJack(BlackjackLogic.isBlackjack(handValue));
        setIsBust(BlackjackLogic.isBust(handValue));
    }, [handValue])

    async function hitHand() {
        const cards = await IntegrationLayer.getCards(1);
        setHand([...hand, cards[0]])
    }

    function standHand() {
        updatePlayerHandTotal(handValue);
        updatePlayerStandStatus(true);
    }

    function FormRow() {
      return (
        <React.Fragment>
          {
              hand && hand.map(card => (
                <Grid item xs={12 / hand.length}>
                    <Paper className={classes.paper}>
                        <img src={card.image} />
                    </Paper>
                </Grid>
              ))
          }
        </React.Fragment>
      );
    }
  
    return (
      <div className={classes.root}>
        {!isBust && !playerStandStatus ? 
            (hand && 
                <div>
                    <Button varient="primary" onClick={() => hitHand()}>HIT</Button>
                    <Button varient="primary" onClick={() => standHand()}>STAND</Button>
                    <Grid>
                        {isBlackjack && (
                            <div>
                                Blackjack!
                            </div>
                        )}
                    </Grid>
                    <Grid>
                        <div>
                            {handValue}
                        </div>
                    </Grid>
                </div>)
         :
            <div>
                {handValue} Bust!
            </div>
        }
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            <FormRow />
          </Grid>
        </Grid>
      </div>
    );
}

const PlayerHand = connect(mapStateToProps, mapDispatchToProps) (ConnectedPlayerHand);
export default PlayerHand;