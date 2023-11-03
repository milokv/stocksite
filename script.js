// Websocket connection
const socket = new WebSocket('wss://ws.finnhub.io?token=cl2ku79r01qq10c2d84gcl2ku79r01qq10c2d850');

// Function to subscribe to a stock symbol
function subscribeToSymbol(symbol) {
    socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': symbol }));
}

// Function to display the stock price
function displayStockPrice(price) {
    document.getElementById('priceDisplay').innerText = `Current Price: $${price}`;
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
        displayStockPrice(price);
    }
});
