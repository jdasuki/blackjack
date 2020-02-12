import { UPDATE_PLAYER_HAND_TOTAL, UPDATE_DEALER_HAND_TOTAL, UPDATE_PLAYER_STAND_STATUS } from "./actionTypes";

const initialState = {
    playerHandTotal: 0,
    dealerHandTotal: 0,
    playerStandStatus: false
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_PLAYER_HAND_TOTAL:
            return {
                ...state,
                playerHandTotal: action.payload
            }
        case UPDATE_DEALER_HAND_TOTAL:
            return {
                ...state,
                dealerHandTotal: action.payload
            }
        case UPDATE_PLAYER_STAND_STATUS:
            return {
                ...state, 
                playerStandStatus: action.payload
            }
        default:
                return state;
    }
}

export default rootReducer;