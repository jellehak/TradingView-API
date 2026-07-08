const TradingView = require('../main');

/**
 * This example creates a BTCEUR daily chart
 */

const client = new TradingView.Client(); // Creates a websocket client

const chart = new client.Session.Chart(); // Init a Chart session

chart.onError((...err) => { // Listen for errors (can avoid crash)
  console.error('Chart error:', ...err);
  // Do something...
});

chart.onSymbolLoaded(() => { // When the symbol is successfully loaded
  console.log(`Market "${chart.infos.description}" loaded !`);
});

chart.onUpdate(() => { // When price changes
  if (!chart.periods[0]) return;
  console.log(`[${chart.infos.description}]: ${chart.periods[0].close} ${chart.infos.currency_id}`);
  // Do something...
});

// Get market from command line argument or use default
const market = process.argv[2] || 'EURONEXT:ASML';
console.log(`\nSetting market to ${market}...`);
chart.setMarket(market, {
    timeframe: 'D',
});
    