// Websocket connection
const socket = new WebSocket('wss://ws.finnhub.io?token=cl2ku79r01qq10c2d84gcl2ku79r01qq10c2d850');

// Function to subscribe to a stock symbol
function subscribeToSymbol(symbol) {
    socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': symbol }));
}

// Function to unsubscribe from a stock symbol
function unsubscribeFromSymbol(symbol) {
    socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': symbol }));
}

// Function to display the stock ticker and price
function displayStockInfo(symbol, price) {
    const priceDisplay = document.getElementById('priceDisplay');
    priceDisplay.innerHTML = `Stock Ticker: ${symbol}<br>Current Price: $${price}`;
    // After displaying the initial info, unsubscribe from further updates
    unsubscribeFromSymbol(symbol);
}

// Event listener for the submit button
document.getElementById('submitButton').addEventListener('click', () => {
    const ticker = document.getElementById('tickerInput').value;
    subscribeToSymbol(ticker);
});

// Listen for messages from the server
socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    if (data.type === 'trade') {
        const price = data.data[0].p;
        const symbol = document.getElementById('tickerInput').value;
        displayStockInfo(symbol, price);
    }
});

// Add an event listener to the input element
document.getElementById('tickerInput').addEventListener('input', function () {
    this.value = this.value.toUpperCase();
});
