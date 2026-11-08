const test = require('node:test');
const assert = require('node:assert/strict');
const { calculate, compare, formatPercent } = require('../metrics.js');
const sample = { landingVisits: 1000, optIns: 300, checkoutVisits: 180, sales: 45 };

test('calculates five funnel rates correctly', () => {
  const result = calculate(sample);
  assert.deepEqual(result.rates, {
    landingToOptIn: 30, optInToCheckout: 60, checkoutToSale: 25,
    landingToCheckout: 18, landingToSale: 4.5
  });
  assert.deepEqual(result.gaps, { beforeOptIn: 700, beforeCheckout: 120, beforeSale: 135 });
});

test('zero denominators return N/A, not misleading zero rates', () => {
  const result = calculate({ landingVisits: 0, optIns: 0, checkoutVisits: 0, sales: 0 });
  assert.equal(result.rates.landingToSale, null);
  assert.equal(formatPercent(result.rates.landingToSale), 'N/A');
});

test('zero sales with visits gives a true 0% LP conversion', () => {
  const result = calculate({ landingVisits: 100, optIns: 0, checkoutVisits: 0, sales: 0 });
  assert.equal(result.rates.landingToSale, 0);
});

test('comparison shows percentage points rather than relative percentage', () => {
  const previous = { landingVisits: 1000, optIns: 200, checkoutVisits: 100, sales: 20 };
  const result = compare(previous, sample);
  assert.equal(result.percentagePointChange.landingToSale, 2.5);
  assert.equal(result.percentagePointChange.landingToOptIn, 10);
});

test('invalid funnel counts are rejected', () => {
  for (const invalid of [-1, 1.2, '3', undefined, NaN, Infinity]) {
    assert.throws(() => calculate({ ...sample, sales: invalid }), RangeError);
  }
});

test('mixed tracking stages emit warnings', () => {
  const result = calculate({ landingVisits: 100, optIns: 20, checkoutVisits: 30, sales: 40 });
  assert.equal(result.warnings.length, 2);
  assert.equal(result.gaps.beforeCheckout, 0);
});
