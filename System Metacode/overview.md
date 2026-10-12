# overview.md — Phostack / GAW v2

> The spec, design soul, don't list, and credentials guide in one file.
> Replaces guider, philosophy, restricted, configury.

---

## 0. WHAT THIS IS

**Phostack** — fresh rebuild of the Global Academic Workspace by
**Aphostus**.

Old site (v1, `GAW/`) is archived. Reference only. Never import. Never
copy paste.

- Internal name: **Phostack**. User facing: **GAW**
- Stack: React (JSX) + Vite + Firebase + Supabase + MongoDB
- Firebase + Supabase project: **Phostack** (Production)

---

## 1. THE BRAND

**Aphostus** — the company. Parent org (`aphostus-org-org`).
**GAW** — Global Academic Workspace. User facing.
**Phostack** — internal project and tech platform.
**Natwork** — coordinate network.

**One line pitch:**
> GAW is an academic workspace powered by Natwork — a coordinate network
> where every tool has a permanent address.

**Natwork pitch:**
> The internet is an address book. Natwork is a map.

**Long pitch:**
> GAW is a desk for academic work. Open the tools you need, arrange them
> how you work, and everything syncs. Tools can be shared or published to
> Natwork — Aphostus's coordinate system that gives every resource a
> permanent, un-squattable address.

**Tone:** Calm, direct, no hype. No emojis. No hyphens in user facing copy.

---

## 2. THE FEELING

**Weblike-Applike.**

A website that feels like an app. No loading spinners between pages. No
page refreshes. No URL bars visible. No browser chrome. The user opens it,
and it *is* the workspace. Panels slide. Gestures work. Everything is
already there.

It should feel like something that was installed, not something that was
visited.

---

## 3. THEMES

- **Weblike-Applike** — the web, but it behaves like native software
- **Sleek** — smooth curves, precise alignment, nothing wasted
- **Minimal** — every element earns its place
- **Modern** — current, clean, not nostalgic, not futuristic
- **Professional** — serious enough for academic work, not sterile
- **Mobile Only, for now** — phone widths only
- **Multi viewport, later** — Desktop and Tablet built deliberately, not
  as responsive fallback

---

## 4. STACK

- **Framework:** React
- **Language:** JavaScript + JSX (not TypeScript)
- **Build tool:** Vite (or CDN React if on phone)
- **Routing:** client side, inside the app shell
- **Styling:** Plain CSS with tokens in `:root`. No Tailwind. No
  styled-components. No CSS in JS.
- **Backend:** Firebase (Auth, Firestore, Storage) + Supabase (blocks,
  folders, published_blocks) + MongoDB (`.uwrp` bundles)
- **Auth:** Google sign in via Firebase Auth
- **Deployment:** Firebase Hosting or GitHub Pages

**Not used:** Web fonts, ClashDisplay, old CSS from `GAW/Legacy/`,
multiple `.html` per view.

**Native version:** Planned after website, Flutter / Dart. Not started.

---

## 5. THE THREE PROJECTS

1. **GAW** — the app. Tools, desk, calendar, repository, Phobos.
2. **Natwork** — the network. Coordinates, publishing, discovery.
3. **Aphostus** — the company. Owns both.

**Natwork concept:**
- Every published block gets a **unique coordinate** — 5 signed decimals
- No registry, no lookup table
- Users never see coordinates by default. Search by name.
- Search matches by name OR by coordinate string
- Coordinates are permanent, un-censorable, un-squattable
- Two blocks can never share a coordinate

---

## 6. FOLDER STRUCTURE

```

PHOSTACK/
Native Version/
app.dart                            ← do not touch until web ships
System Metacode/
overview.md
cloud.md
extensors.md
welcome.txt
Website Version/
index.html                          ← router entry
script.js                           ← router detection
style.css                           ← router styling
Error Files/
error.html
error.css
error.js
Desktop Version/                    ← planned, empty
Sources/
Desktop.css
Desktop.html
Desktop.js
Mobile Version/                     ← current target
Sources/
Mobile.css
Mobile.html
Mobile.js
Operator Files/
#converter.js
Private Sources/
.gitignore
datahub.env
Public Sources/
configs.json
Tablet Version/                     ← planned, empty
Sources/
Tablet.css
Tablet.html
Tablet.js
Fonts/
Images/
Icon.png
Payer.png
Markdowns/
Sites/
Videos/

```

**Rules:**
- `Website Version/index.html` is the single entry point. Reads UA,
  detects device, forwards. Never renders app UI. Never talks to backend.
- Each version is its own build. No sharing of entry points.
- Shared code (tokens, components, lib, hooks) lives in a common layer.
  Location open.
- Only Mobile Version is under construction. Desktop and Tablet stay
  scaffolded and empty until Mobile ships.

**No subsites.**
- No `settings.html`, no `calendar.html`. Every view renders inside one
  shell.
- Settings, Calendar, Deskspace, Repository, Phobos, Profile are views,
  not files.
- The shell owns nav bar, bell, panels, view router, auth guard. Mounted
  once.
- Switching views is state change, not navigation. No page reloads.
- Deep links land on a view inside the shell.

---

## 7. THE ROUTER

- Reads `navigator.userAgent`.
- Matches against accepted tokens.
- Forwards:
  - Phone → `Mobile Version/Mobile.html`
  - Tablet → `Tablet Version/Tablet.html`
  - Desktop → `Desktop Version/Desktop.html`
- Before forwarding, sends a HEAD request to the target. On miss or
  network failure, forwards to `Error Files/error.html?tag=...`.
- Never renders workspace UI. Never holds state. Never talks to backend.

**Accepted user agents for Mobile:**
- `Android` + `Mobile`
- `iPhone`, `iPod`
- `Windows Phone`, `BlackBerry`, `Opera Mini`, `IEMobile`

Non-phone UAs route to their matching version.

---

## 8. DESIGN

**Color:**
- Black (major) — the base. Backgrounds, surfaces, the default
- Grayish zones (middle) — borders, muted text, panels, separators
- White (minor) — text, active states, accents, icons
- **No other colors.** No blues, no greens, no reds, no purples.
- **Exception:** special cases only. Status indicators, destructive
  actions, verification states. Keep monochrome where possible.

**Icons:**
- SVG only. Never emoji. Never icon fonts.
- Stroke based, 1.8 to 2.2 weight
- Monochrome, currentColor
- Small. 14px to 18px in most contexts

**Typography:**
- System font stack only:
  `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif`
- No web fonts. No ClashDisplay. No Inter CDN.
- iOS renders San Francisco. Android renders Roboto. Both are correct.
- Weights: 400 body, 500 emphasis, 600 labels, 700 titles
- Letter spacing: tight on titles, normal on body

**Surfaces:**
- Full modern device and app styling allowed. Glassmorphism,
  translucency, backdrop blur, layered depth, soft shadows, edge
  highlights, subtle gradients.
- Blur allowed anywhere it helps separation, focus, or depth.
- Gradients allowed. Subtle, monochrome. Not colorful.
- Borders hairline. 1px. Low contrast.
- Everything stays monochrome.

**Shapes:**
- Small elements: 8px radius
- Medium elements: 10 to 12px
- Large panels: 22 to 26px
- Pills: fully rounded

---

## 9. VIEWPORT — MOBILE VERSION (current)

- **Mobile only.** Non phone UAs route to their matching version.
- **Responsive within phone widths.** Fills whatever width the phone
  has. Edge to edge. No locked 430px column. No side borders.
- Safe area insets respected (notch, home indicator, punch hole).
- No horizontal scroll. No zoom lock that breaks accessibility.

## VIEWPORT — DESKTOP VERSION (planned)

Not built. When it is:
- Same tokens, same components, same lib.
- Layout expands, not stretches. Side panels permanent, not sliding.
- Full keyboard and pointer support.
- Same monochrome, same motion language.

## VIEWPORT — TABLET VERSION (planned)

Not built. When it is:
- Sits between Mobile and Desktop. Touch first, wider layout.
- Uses the same shared layer.
- Same monochrome, same motion language.

---

## 10. MOTION

Three curves, no exceptions:

- **Spring** — `cubic-bezier(0.16, 1, 0.3, 1)` — panels opening, elements
  entering, the default feel
- **Smooth** — `cubic-bezier(0.4, 0, 0.2, 1)` — hovers, fades, background
  changes
- **Bounce** — `cubic-bezier(0.34, 1.56, 0.64, 1)` — taps, confirmations,
  playful moments

Motion is never decorative. It communicates state change.

---

## 11. WHAT IT IS NOT

- Not a dashboard. Not a landing page. Not a portfolio.
- Not colorful. Not playful in a cartoon way. Not corporate.
- Not heavy. Not cluttered. Not trying to impress.
- Not decorated for decoration's sake.
- Not one size fits all. Each viewport is built on purpose.

> **Black canvas. White ink. Gray structure. Modern surfaces. Motion
> that means something. One viewport at a time. Nothing else.**

---

## 12. COMMENTING

Comments explain *why*, not *what*. Code says what. Comments say the
reason the code exists, what it protects, or what would break if it
changed. All comments lowercase.

Three levels, no more.

**Level 1 — file or document.** Heaviest divider. Full width. Includes
the name.

```js
// ============================================================
// ============================================================
// auth.js
// owns: sign in, sign out, session, route guard
// ============================================================
// ============================================================
```

Level 2 — section. Medium divider. One line of dashes each side.

```js
// ------------------------------------------------------------
// auth flow
// ------------------------------------------------------------
```

Level 3 — inline. No divider. One line, lowercase, above the thing.

```js
// trial expiry runs once per session, never on every render
function checkTrialExpiry(uid) { ... }
```

Rules:

· Pick the level that matches the scope.
· Levels nest: file holds sections, sections hold inline.
· Lowercase. Always.
· No hyphens inside prose.
· No emojis. Ever.
· No commented out code. Delete it.
· Never comment closing tags or braces.
· Never explain what a property obviously does.
· Never leave console.log in shipped code. console.warn and
  console.error allowed for real failures.
· If a comment needs more than three lines, split the code first.

---

# 13. LOCKED FEATURES

Onboarding:

· Google sign in only
· Pick role: Civilian / Student / Teacher / Researcher / Institution
· Verification (Student, Teacher, Institution only)
· Pick plan (Essential 120, Advanced 215, Professional 370, Premium 430,
  Enterprise 580) or skip to Freeplan
· Payment step: GCash reference + date + time + QR + redeem code

Redeem codes:

· Vouchers — discount. type: 'percent' or 'flat'. In
  vouchers/{code}.
· Secret codes — free access. Grants plan for duration. In
  secretCodes/{code}.
· One input handles both. Vouchers checked first.

Trial expiry:

· On space load, check trialExpiresAt
· If expired: plan: 'Freeplan', isTrial: false, trialExpired: true
· Send in app notification
· Never auto upgrade from Pending payments

Block privacy:

· Private — Firestore only. Never published.
· Shared — published with access code.
· Public — published, no code.

Publishing:

· Unique coordinate minting. Check collision. Loop up to 10 attempts.
· If shared, ask user for access code (or auto generate)
· If public, publish directly
· On delete of block, auto unpublish

Natwork search:

· Local tools first
· Then published_blocks by name
· Multiple matches, show picker
· Shared, prompt access code, verify, open
· Public, open directly
· Searchable by coordinate string

Payment:

· Manual verification. Stays Pending until admin approves.
· Never auto upgrade on submit.
· Same plan upgrade blocked.

Plan pricing:

```
Essential: 120
Advanced: 215
Professional: 370
Premium: 430
Enterprise: 580
Freeplan: 0
```

Payment number: 0924-526-6251

---

# 14. ROLES

· Civilian — general user. No verification.
· Student — learner. Verification required.
· Teacher — educator. Verification required.
· Researcher — research workspace.
· Institution — schools and orgs. Contract based.

Role affects: default description, workspace layout, institution display.

---

# 15. PHOBOS (AI AGENT)

Always present. Currently echoes user input. Real AI pending.

· Planned: Gemini API or Groq or OpenRouter
· States: awake, away
· Not built yet

Naming: In UI always Phobos. In code use phobos*.

---

# 16. THE DON'T LIST

Architecture:

· Do not put a Firebase config in more than one file. One firebase.js,
  one initializeApp, one export.
· Do not hardcode API keys in any page or component file. 
· Do not copy CSS tokens into multiple stylesheets. One tokens.css.
· Do not duplicate the bell, top nav, auth guard, side panels, or Phobos.
  One each, mounted once.
· Do not create one .html file per page. SPA routes only.
· Do not reimplement the search-highlight script in more than one place.
· Do not mix .html + script.js + style.css triples per view.
· Do not import anything from GAW/. Reference only.

Data:

· Do not rename anything in §14. Locked.
· Do not store the same field in two places.
· Do not auto-upgrade a plan on payment submit.
· Do not skip the trial-expiry check on space load.
· Do not write to verifiedPayments, vouchers, or secretCodes
  without going through the documented flow.

Design:

· Do not add color. Monochrome only.
· Do not add web fonts. System font stack only.
· Do not use emojis in the UI. SVG icons only.
· Do not use hyphens in user-facing copy.
· Do not introduce Tailwind, styled-components, CSS-in-JS, or any UI
  library.
· Do not use a JavaScript framework other than React.
· Do not use TypeScript.

Process:

· Do not batch features. One task per message.
· Do not refactor unasked. If it works, leave it.
· Do not send fragments. Full files when replacing.
· Do not request or paste credentials.
· Do not touch Native Version/ until the website ships.
· Do not start a second task before the first is finished and confirmed.

The big one:

· Do not try to make it all work at once. v1 died growing in every
  direction. v2 grows one small thing at a time.

Why this list exists: v1 (GAW/) was twelve HTML files, each carrying
its own Firebase config, its own CSS tokens, its own auth guard, its own
copy of the notifications logic, its own copy of the search script.
Nothing shared. Every change made twelve times. It collapsed.

---

# 17. RULES FOR THE AI AGENT (Not Phobos)

1. One task per message.
2. Full files when replacing.
3. Ask one clarifying question before acting if ambiguous.
4. Never rename anything in §14.
5. Never inject web fonts.
6. No emojis in UI.
7. No hyphens in user facing copy.
8. Monochrome only.
9. Never request or paste credentials.
10. Keep overview.md and cloud.md current.
11. Never create subsites.
12. Never duplicate the shell, bell, panels, auth guard, or Phobos.
13. Comment in lowercase.

---

# 18. HOW TO START A SESSION

1. Read overview.md (this file).
2. Open cloud.md. Read the last three entries.
3. Check Mobile Version/ for files newer than the last update.
4. Ask the user: "What is today's single task?"
5. Confirm the task in one sentence.
6. Do only that task.
7. Append the change to cloud.md.

Never start two tasks. Never refactor unasked. Never import from GAW/.

---

# 19. HOW TO HAND OFF

· cloud.md gets the new entry. Always.
· If a decision contradicts a doc, fix the doc.
· Never leave half finished work undated. Use WIP: prefix in cloud.md.

Format:

```
yyyy-mm-dd

· created: path/to/file — one line
· changed: path/to/file — one line
· removed: path/to/file — one line
· fixed:   path/to/file — one line
· moved:   from → to
· WIP:     path/to/file — what is unfinished
```

Verbs: created, changed, removed, fixed, moved, WIP.
One line per change. Newest at top. Never rewrite history.

---

# 20. THE USER

Gabriel Yoan L. Cortez (Yozano). ~18. Philippines.

· Codes on phone with Acode editor
· Metaphor driven. Thinks in images: desk, map, library, circuit
· Prefers short, direct answers
· Frustrated by long debugging. Prefers decisive action.
· "Simplify" means three bullets max
· "Full file" means entire file, no fragments

Communicate: Short. Direct. No filler. One question. Then act.

---

# 21. WHAT IS NOT DECIDED YET

· Shared layer location (Website Version/Shared/ or PHOSTACK/Shared/)
· Final UI of home view
· Whether Deskspace is a view or its own page inside the shell
· Whether Phobos is inline, a panel, or a view
· Whether .blck survives into v2 (extensors.md implies yes)
· Whether to keep the calendar
· Whether to keep the tool tab system
· Whether tools live in tools.js or Firestore
· Build phase order for Mobile Version
· Whether MongoDB replaces Supabase or sits alongside

The user decides. Do not pre decide. Ask when it matters.

---

# 22. THE ONE LINE RULE

Build the next small thing cleanly. Keep the brand. Keep the data.
Keep the vibe. Everything else is negotiable.

```