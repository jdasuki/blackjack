//import express
const express = require('express');
const axios = require('axios');
const fetch = require("node-fetch");
const cors = require('cors');

const app = express();
const deckId = [];
const deckTotal = 312;
const baseUrl = 'https://deckofcardsapi.com/api/deck/';
const getOptions = {
    method: `GET`,
    headers: {
        "Content-Type": "application/json"
    }};

// Routes which should handle request
app.use(cors());

app.get("/draw/:count", async (req, res, next) => {

    if (req.params.count > deckTotal){
        res.status(400);
        res.json({
            error: {
                message: `Total deck count is ${deckTotal}. Please enter a number below that.`
            }
        })
        return;
    }

    let cards;

    try {
        await updateDeckId();
        cards = (await drawCards(req.params.count)).cards;
        console.log("Returned card");
        
    } catch (error) {
        res.status(error.status || 500 );
        res.json({
            error: {
                message: error.message
            }
        })
    }
    
    res.json(cards);
});

async function drawCards(count) {
    const res = await fetch(`${baseUrl}${deckId[0]}/draw/?count=${count}`, getOptions);
    
    if (res.status != 200) {
        throw new cardApiError(
            "Server error with card api."
        )
    }

    let responseBody = await res.json();

    // If deck is out of cards
    if (responseBody.success === false) {
        deckId.pop();
        await updateDeckId();
        responseBody = await drawCards(count);
    }
    
    return responseBody;
}

async function updateDeckId() {
    if (deckId.length == 0){
        const res = await fetch(`${baseUrl}new/shuffle/?deck_count=6`, getOptions);
        let resBody = await res.json();
        deckId.push(await resBody.deck_id);
        console.log("Deck id: " + deckId[0]);
    }
}

class cardApiError extends Error {
}

//export app
module.exports = app;