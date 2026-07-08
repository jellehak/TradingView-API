const TradingView = require('../main');

/**
 * This example tests the searching functions such
 * as 'searchMarketV3' and 'searchIndicator'
 */

const searchTerm = process.argv[2] || 'ASML';
TradingView.searchMarketV3(searchTerm).then((rs) => {
  console.log('Found Markets:', rs);
});

// TradingView.searchIndicator('RSI').then((rs) => {
//   console.log('Found Indicators:', rs);
// });
