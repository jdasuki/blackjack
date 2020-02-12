import { UPDATE_PLAYER_HAND_TOTAL, UPDATE_DEALER_HAND_TOTAL, UPDATE_PLAYER_STAND_STATUS } from "./actionTypes";

export function updatePlayerHandTotal(payload) {
    return { type: UPDATE_PLAYER_HAND_TOTAL, payload };
}

export function updateDealerHandTotal(payload) {
    return { type: UPDATE_DEALER_HAND_TOTAL, payload };
}

export function updatePlayerStandStatus(payload) {
    return { type: UPDATE_PLAYER_STAND_STATUS, payload };
}