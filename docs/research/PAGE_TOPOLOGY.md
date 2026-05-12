# Page Topology — upfrontcosmetics.ca

## Overall Layout
- Single scroll page, no scroll snapping
- No smooth scroll library (standard browser scroll)
- No Lenis
- Body background: #ffffff
- Global font: Montserrat, sans-serif
- Page height: ~5024px at 1440px wide

## Sections (top to bottom)

| # | Name | Component | Height | Notes |
|---|------|-----------|--------|-------|
| 0 | Announcement Bar | `AnnouncementBar` | ~33px | Black bg, white text, fixed-position sticky |
| 1 | Navigation Header | `SiteHeader` | ~120px | White bg, logo + nav links + icons |
| 2 | Hero Slideshow | `HeroSlider` | 550px | 3 slides, auto-advance 7s, slick dots |
| 3 | Stats Bar | `StatsBar` | ~80px | "590 Stores" + "1,500,762 Bottles" |
| 4 | Customer Favs | `CustomerFavs` | ~600px | "SHOP CUSTOMER FAVS" + 5 product cards |
| 5 | Shampoo Bars | `ProductGrid` | ~600px | "shop shampoo bars" + 5 cards |
| 6 | Conditioner Bars | `ProductGrid` | ~600px | "shop conditioner bars" + 4+ cards |
| 7 | Promo Grid | `PromoGrid` | ~500px | 3 image tiles with links |
| 8 | Testimonials | `Testimonials` | ~400px | "WHAT OUR GUESTS ARE SAYING..." |
| 9 | Blog Posts | `BlogSection` | ~400px | "From the blog" + post cards |
| 10 | Footer | `Footer` | ~300px | Dark bg #0f0f0f, white text |

## Design Tokens
- Primary font: `Montserrat, sans-serif`
- Header font size: 38px, weight 400
- Body font size: 16px, weight 400, letter-spacing 0.025em, line-height 1.6
- Btn primary bg: #111111, text: #ffffff, radius: 0px
- Body bg: #ffffff
- Border color: #e8e8e1
- Footer bg: #0f0f0f, text: #ffffff
- Nav bg: #ffffff
- Announcement bg: #0f0f0f, text: #ffffff
- Cart dot: #ff4f33
- Savings text: #ff4e4e

## Interaction Models
- **HeroSlider**: time-driven (auto-advance) + click-driven (dot navigation). Slick.js slider.
- **SiteHeader**: static (no scroll-triggered changes)
- **ProductGrid**: static (no interactivity beyond hover states)
- **All sections**: static layout
