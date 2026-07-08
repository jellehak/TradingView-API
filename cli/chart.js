#!/usr/bin/env node

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
//   console.log(JSON.stringify(chart.infos, null, 2));
//   console.log(chart.periods);
//   console.log(`[${chart.infos.description}]: ${chart.periods[0].close} ${chart.infos.currency_id}`);
  // Do something...
  // Log periods info Pretty like time, open, high, low, close, volume, etc.
//   console.log(chart.periods[0])
  console.log(`[${chart.infos.description}]: ${renderPeriod(chart.periods[0])}`);
});

function renderPeriod(period) {
     /**
   * {
  time: 1783517400,
  open: 364.76,
  close: 359.47,
  max: 367.84,
  min: 358.02,
  volume: 12707919
}
   */
  return `Time: ${new Date(period.time * 1000).toLocaleString()} | Open: ${period.open} | High: ${period.max} | Low: ${period.min} | Close: ${period.close} | Volume: ${period.volume}`;
}

// Get market from command line argument or use default
const market = process.argv[2] || 'EURONEXT:ASML';
console.log(`\nSetting market to ${market}...`);
chart.setMarket(market, {
    timeframe: 'D',
});
    