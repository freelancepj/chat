/*
 * Dependency-free conversion metrics for digital product creators.
 * Use consistent reporting windows and unique counts where possible.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FunnelMetrics = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const FIELDS = ['landingVisits', 'optIns', 'checkoutVisits', 'sales'];

  function validateCounts(input) {
    if (!input || typeof input !== 'object') throw new TypeError('Provide funnel counts as an object.');
    const counts = {};
    for (const field of FIELDS) {
      const value = input[field];
      if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0) {
        throw new RangeError(`${field} must be a non-negative safe integer.`);
      }
      counts[field] = value;
    }
    return counts;
  }

  function rate(numerator, denominator) {
    return denominator === 0 ? null : (numerator / denominator) * 100;
  }

  function calculate(input) {
    const counts = validateCounts(input);
    const { landingVisits, optIns, checkoutVisits, sales } = counts;
    const warnings = [];
    if (optIns > landingVisits) warnings.push('Opt-ins exceed unique landing page visits. Check the reporting period and counting method.');
    if (checkoutVisits > optIns) warnings.push('Checkout visits exceed opt-ins. Alternate paths may make this rate misleading.');
    if (sales > checkoutVisits) warnings.push('Sales exceed checkout visits. Check attribution windows or tracking.');
    return {
      counts,
      rates: {
        landingToOptIn: rate(optIns, landingVisits),
        optInToCheckout: rate(checkoutVisits, optIns),
        checkoutToSale: rate(sales, checkoutVisits),
        landingToCheckout: rate(checkoutVisits, landingVisits),
        landingToSale: rate(sales, landingVisits)
      },
      gaps: {
        beforeOptIn: Math.max(landingVisits - optIns, 0),
        beforeCheckout: Math.max(optIns - checkoutVisits, 0),
        beforeSale: Math.max(checkoutVisits - sales, 0)
      },
      warnings
    };
  }

  function compare(previous, current) {
    const a = calculate(previous);
    const b = calculate(current);
    const percentagePointChange = {};
    for (const key of Object.keys(b.rates)) {
      percentagePointChange[key] = a.rates[key] === null || b.rates[key] === null
        ? null : b.rates[key] - a.rates[key];
    }
    return { previous: a, current: b, percentagePointChange };
  }

  function formatPercent(value) {
    return value === null ? 'N/A' : `${value.toFixed(2)}%`;
  }
  return { calculate, compare, formatPercent, validateCounts };
});