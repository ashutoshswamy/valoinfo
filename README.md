# VALO.INFO

Complete Valorant encyclopedia — agents, weapons, maps, skins, sprays, player cards, buddies, player titles, flex items, and ranks. Data powered by [valorant-api.com](https://valorant-api.com).

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data:** valorant-api.com public REST API (no auth required)
- **Deployment:** Vercel

## Pages

| Route                 | Content                                                      |
| --------------------- | ------------------------------------------------------------ |
| `/agents`             | All playable agents with role, abilities, portraits          |
| `/agents/[uuid]`      | Agent detail — abilities, lore, gradient art                 |
| `/weapons`            | All weapons with stats and skins                             |
| `/weapons/[uuid]`     | Weapon detail — damage tables, fire stats, all skins         |
| `/maps`               | All maps with callouts                                       |
| `/maps/[uuid]`        | Map detail — callout overlay, tactical info                  |
| `/skins`              | All weapon skins — searchable, filterable by tier and weapon |
| `/skins/[uuid]`       | Skin detail — all chromas and levels                         |
| `/sprays`             | All sprays — searchable                                      |
| `/sprays/[uuid]`      | Spray detail — animated variants, levels                     |
| `/playercards`        | All player cards — searchable                                |
| `/playercards/[uuid]` | Card detail — wide, large, and icon art                      |
| `/buddies`            | All gun charms — searchable                                  |
| `/buddies/[uuid]`     | Buddy detail — all charm levels                              |
| `/playertitles`       | All 393+ player titles — searchable                          |
| `/flex`               | All flex cosmetic items — searchable                         |
| `/flex/[uuid]`        | Flex item detail                                             |
| `/ranks`              | Current competitive tier icons grouped by division           |

## Data

All data fetched from `https://valorant-api.com/v1` with 1-hour ISR revalidation. No API key required.
