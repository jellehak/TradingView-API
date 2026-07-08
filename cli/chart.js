#!/usr/bin/env node

const TradingView = require('../main');

/**
 * This example creates a BTCEUR daily chart
 */

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

const client = new TradingView.Client(); // Creates a websocket client

const chart = new client.Session.Chart(); // Init a Chart session

let previousClose = null;

chart.onError((...err) => { // Listen for errors (can avoid crash)
  console.error('Chart error:', ...err);
  // Do something...
});

chart.onSymbolLoaded(() => { // When the symbol is successfully loaded
  console.log(`${colors.cyan}Market "${chart.infos.description}" loaded !${colors.reset}`);
});

chart.onUpdate(() => { // When price changes
  if (!chart.periods[0]) return;
  
  const close = chart.periods[0].close;
  const direction = previousClose === null ? '→' : (close > previousClose ? `${colors.green}▲${colors.reset}` : close < previousClose ? `${colors.red}▼${colors.reset}` : '→');
  const priceColor = previousClose === null ? colors.cyan : (close > previousClose ? colors.green : close < previousClose ? colors.red : colors.cyan);
  
  console.log(`[${colors.bold}${chart.infos.description}${colors.reset}]: ${direction} ${priceColor}${close}${colors.reset} ${chart.infos.currency_id}`);
  
  previousClose = close;
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
  const change = period.close - period.open;
  const changeColor = change > 0 ? colors.green : change < 0 ? colors.red : colors.cyan;
  const changeSymbol = change > 0 ? '▲' : change < 0 ? '▼' : '→';
  
  return `${colors.bold}Time:${colors.reset} ${new Date(period.time * 1000).toLocaleString()} | ${colors.bold}Open:${colors.reset} ${period.open} | ${colors.bold}High:${colors.reset} ${period.max} | ${colors.bold}Low:${colors.reset} ${period.min} | ${colors.bold}Close:${colors.reset} ${changeColor}${period.close} ${changeSymbol}${colors.reset} | ${colors.bold}Volume:${colors.reset} ${period.volume}`;
}

// Get market from command line argument or use default
const market = process.argv[2] || 'EURONEXT:ASML';
console.log(`\nSetting market to ${market}...`);
chart.setMarket(market, {
    timeframe: 'D',
});
    