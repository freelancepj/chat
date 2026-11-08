# Creator Moonshots: an open-source research lab

Two **long-term projects** at the intersection of expertise, AI, digital products, creator-owned commerce and funnel analytics. The intent is to build useful open tools, not to claim that full platforms already exist.

| Project | Big bet | Working v0.1 |
|---|---|---|
| **[ExpertOS](expertos/README.md)** | An open, evidence-first operating system that helps subject experts turn what they know into tested digital products and a creator-owned business | Transparent opportunity scoring, validation plan, fictional input and unit tests, local browser demo |
| **[SignalStack](signalstack/README.md)** | A privacy-first growth intelligence layer that connects creator traffic, forms, payments and experiments without platform lock-in | Event deduplication, LPCR and funnel analytics, ad-spend comparisons, tracking warnings, local browser demo |

## Core philosophy

**Expertise > random AI output. Evidence > hype. Creator ownership > platform dependency.**

The bigger vision is a connected loop: **discover a painful problem → validate an offer → build a useful product → sell → measure → improve**, with evidence and human approval at every step. Both repos are intentionally early-stage, and the examples are synthetic.

### Run the demos

Node.js 20+ is required for tests. No installs or API keys are needed.

```bash
cd expertos && npm run demo && npm test
cd ../signalstack && npm run demo && npm test
```

Open each project's `index.html` for a local browser demo. Read each `docs/architecture.md` and `docs/roadmap.md` for the much bigger, still-unbuilt plan.

## Getting involved

To contribute, open an issue describing a specific user problem, a minimal change, how you'd test it, and potential risks. No sales claims or unverified customer stories. Source code is MIT licensed in [LICENSE](LICENSE).