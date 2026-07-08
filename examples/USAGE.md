# Examples Usage

## Running Examples with Command Line Arguments

### chart.js
Creates a chart session for a specific market symbol.

Usage:
```bash
node examples/chart.js [MARKET]
```

**Arguments:**
- `MARKET` (optional): The market symbol to load (default: `EURONEXT:ASML`)

**Examples:**
```bash
node examples/chart.js EURONEXT:ASML
node examples/chart.js NASDAQ:AAPL
node examples/chart.js CRYPTO:BTCUSD
```

### Search.js
Searches for markets on TradingView.

Usage:
```bash
node examples/Search.js [SEARCH_TERM]
```

**Arguments:**
- `SEARCH_TERM` (optional): The market symbol to search for (default: `ASML`)

**Examples:**
```bash
node examples/Search.js AAPL
node examples/Search.js GOOGL
node examples/Search.js BTC
```
