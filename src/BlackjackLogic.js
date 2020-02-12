import IntegrationLayer from './integration/IntegrationLayer';

function isBlackjack(score) {
    return score === 21 ? true : false;
}

function isBust(score) {
    return score > 21 ? true : false;
}

async function hitHand(hand) {
    if (hand) {
        const cards = await IntegrationLayer.getCards(1);
        return [...hand, cards[0]];
    }
}

function isVictory(playerHandTotal, dealerHandTotal) {
    console.log(playerHandTotal)
    console.log(dealerHandTotal)

    let playerBust = playerHandTotal > 21 ? true : false;
    let dealerBust = dealerHandTotal > 21 ? true : false;

    if (dealerBust) {
        console.log("Dealer Bust!")
        return true;
    }

    if ((playerHandTotal > dealerHandTotal) && !playerBust){
        console.log("Player wins!")
        return true;
    }
    console.log("Dealer wins!")
    return false;
}

async function playDealersHand(hand) {
    let newHand = hand;
    if (hand){
        while (getHandValue(newHand) <= 17) {
            newHand = await hitHand(newHand);
        }
    }

    return await newHand;
}

//TODO: DEAL WITH DOUBLE ACE
function getHandValue(cardArray) {
    if (cardArray) {
        let containsAce = false;
        cardArray.map(card => 
            (card.value === "KING" || card.value === "QUEEN" || card.value === "JACK" ) ? card.value = "10" : 
            (card.value === "ACE") ? (containsAce = true, card.value = "11") : "");

        let total = cardArray.reduce((total, card) => total += +card.value, 0);
        return total
    }

    return 0;
}

export default {
    isBlackjack, 
    isBust,
    getHandValue,
    hitHand,
    playDealersHand,
    isVictory
}