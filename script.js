// open a websocket connection with my api key
const socket = new WebSocket('wss://ws.finnhub.io?token=cl2ku79r01qq10c2d84gcl2ku79r01qq10c2d850');

// global definition of "symbol" (which stockticker to get price from)
document.getElementById('submitButton').addEventListener('click', () => {
    symbol = document.getElementById('tickerInput').value;
});

// Function to subscribe to a stock symbol  (GPT)
function subscribeToSymbol(symbol) {
    socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': symbol }));
}

// Function to unsubscribe from a stock symbol (GPT)
function unsubscribeFromSymbol(symbol) {
    socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': symbol }));
}

// Function to display the stock ticker and price  (GPT)
function displayStockInfo(symbol, price) {
    const priceDisplay = document.getElementById('priceDisplay');
    priceDisplay.innerHTML = `Stock Ticker: ${symbol}<br>Current Price: $${price}`;
}

// start recieving price updates from inputted ticker
document.getElementById('submitButton').addEventListener('click', function() {
    console.log('Recieving price updates from: ' + symbol)
    subscribeToSymbol(symbol);
});


// Listen for messages from the server (GPT) + log in console when price is updated
socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    if (data.type === 'trade') {
        const price = data.data[0].p;
        console.log('Price update recieved for: ' + symbol)
        displayStockInfo(symbol, price);
    }
});

// Add an event listener to the input element (GPT)
document.getElementById('tickerInput').addEventListener('input', function() {
    this.value = this.value.toUpperCase();
});

// stop recieving price updates when stop button is pressed
document.getElementById('unsubButton').addEventListener('click', () => {
    console.log('Stopping price updates for: ' + symbol);
    unsubscribeFromSymbol(symbol);
});