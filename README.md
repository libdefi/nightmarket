# NightMarket Protocol V0

![OGP_night_market](https://github.com/libdefi/nightmarket/assets/8872443/d0c65886-4300-44a3-a776-e5ecc64d322e)

## Idea

NightMarket is a prediction market protocol that focuses on fully onchain games.

## MVP: Primodium v0.11 Prediction Market

### Prediction Market

**Market Question:** Which alliance will win the 1st spot on Primodium v0.11?

### Hypothesis

Integrating a betting/prediction feature enhances the experience and engagement of fully onchain games.

### Validation

- **Market Activity Metrics:**
  - Number of participants betting on the market.
  - Total amount bet on the market.
  - Increase in in-game battle activities:
    - Change in number of transactions.
    - Change in number of battles.
    - Change in number of fleets destroyed.
    - Change in number of new players.
  - Public discussions and mentions of the market.

### Rules

- **Betting Period:**
  - Betting closes on [X DAY].

- **Market Resolution:**
  - The market outcome depends on alliance standings at the conclusion of round v0.11. 
  - If an alliance (WASD, WASDx, BOYS, ORDEN, QUEBEC, POOP, FOG, KONG, FUN) secures the 1st spot on the alliance leaderboard [final], the market will resolve accordingly.
  - If any other alliance claims the 1st position, the market will resolve to "OTHERS".

- **Resolution Authority:**
  - The admin (address: ) will resolve the market based on the official statement from the Primodium X account ([Primodium Game](https://x.com/primodiumgame)).
  - A consensus of credible reporting may also be used.

## High-Level Specification

### Components

- **Wallet Connect:**
  - Integrate wallet connection for users.

- **Betting Options:**
  - Display betting options for each alliance.
  - Show % chance and price for "Yes" and "No" options for each alliance.
    - Alliances: WASD, WASDx, BOYS, ORDEN, QUEBEC, POOP, FOG, KONG, FUN, OTHERS.
- **Market Information:**
  - Detailed description of the rules.
  - Activity log: show which wallet bought/sold which outcome and for how much.
  - User positions: show user's current bets and outcomes.
  - Notifications (risk, fees, etc.).

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** TailwindCSS
- **UI Components:** Shadcn
- **Wallet Integration:** ConnectKit
- **Chain:** Redstone (https://redstone.xyz/ )

