# Digital Product Funnel Calculator

A small, free, **privacy-first calculator** for creators who sell digital products. Enter unique landing page views, opt-ins, checkout visits, and purchases to see where a funnel converts and where it loses people.

No tracking, accounts, analytics SDKs, server, build step, or paid APIs. All calculations run in your browser.

## What it measures

| Metric | Formula | Meaning |
| --- | --- | --- |
| Opt-in rate | Opt-ins ÷ unique landing page visits × 100 | How many visitors become leads |
| Opt-in → checkout | Checkout visits ÷ opt-ins × 100 | How many leads visit checkout |
| Checkout conversion | Purchases ÷ checkout visits × 100 | How many checkout visitors buy |
| Landing → checkout | Checkout visits ÷ unique landing page visits × 100 | How much landing page traffic reaches checkout |
| **LPCR (overall conversion)** | Purchases ÷ unique landing page visits × 100 | The share of landing page visitors who buy |

You can compare two periods. A change in conversion rate is shown in **percentage points (pp)**, not as a relative percent change. Example: 2% to 3% is **+1 pp** (or +50% relative).

## Run it

Open `index.html` in a browser. That's it. The UI loads its calculations from `metrics.js`.

To run automated tests, use Node.js 20 or newer:

```bash
node --test tests/metrics.test.js
```

## Example

For 1,000 unique LP visitors, 300 opt-ins, 180 checkout visits, and 45 sales:

- Opt-in rate: **30%**
- Opt-in → checkout: **60%**
- Checkout conversion: **25%**
- Overall LPCR: **4.5%**

## Data rules

- Use the **same reporting window** for all four inputs.
- Use **unique visits/visitors** where available; if a platform uses sessions instead, say so when sharing results.
- Don't confuse *checkout page visits* with *checkout starts*. They measure different things.
- If customers can skip the opt-in, opt-in → checkout is not a true single-path conversion rate. The tool will warn you if stage counts rise instead of fall.
- A zero denominator is displayed as **N/A**, since a rate cannot be calculated without visits at that step.
- Comparing different traffic sources, campaigns, or attribution windows can mislead. Treat counts and rates as descriptive, not proof of cause.

## Reuse

The library uses CommonJS (`require`) in Node.js and `window.FunnelMetrics` in browsers. The core functions are `calculate(counts)` and `compare(previousCounts, currentCounts)`.

Contributions are welcome: examples, translations, tests, accessibility fixes, and careful enhancements. Please keep the tool dependency-free and don't add analytics trackers.

Released under the MIT License. See `LICENSE`.