# 1.5.md — System State

> Pure technical reference. No plans, no goals.
> What exists, how it fits, how to run it.

---

## STACK

- Vite 5.4.21
- Node v26.3.1 (Termux)
- React 18.3.1
- Firebase 10.13.0 (auth only)
- Supabase 2.45.0 (data only)
- Couchbase (archive, via Supabase Edge Function)

---

## FOLDER STRUCTURE

```

PHOSTACK/
Website Version/
index.html                  router entry
script.js                   UA detection, forward
style.css                   boot screen
vite.config.js              multi entry build
package.json                vite project
.env                        real keys, gitignored
.env.example                placeholders (deleted)
src/
main.js                   vite entry
Operator Sources/
converter.js
tokens.css
xdbs.fct/
firebase.js           auth only
supabase.js           data client
couchbase.js          edge function caller
database.js           xdb entry, re-exports all
@Mobile Version/
Mobile.html
Mobile.js
Mobile.css
@Tablet Version/
Tablet.html
Tablet.js
Tablet.css
@Laptop Version/
Laptop.html
Laptop.js
Laptop.css
@Dynamic Version/
Dynamic.html
Dynamic.js
Dynamic.css
@Error Version/
Error.html
Error.js
Error.css
Private Sources/
datahub.env               secrets, gitignored
Public Sources/
Images/
Native Version/
Private Sources/ (root)
Public Sources/ (root)
README.md
DEVELOP.md
.gitignore

```

---

## XDB — THREE BACKENDS

Entry point: `src/Operator Sources/xdbs.fct/database.js`

Every file imports from `database.js`, never from the three directly.

**firebase.js** — auth only
- Exports: `auth`, `provider`, `signInWithRedirect`, `getRedirectResult`, `onAuthStateChanged`, `signOut`
- Reads keys from `import.meta.env.VITE_FIREBASE_*`
- Does not use Firestore, Storage, or Functions

**supabase.js** — data client
- Exports: `sb`
- Reads `import.meta.env.VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY`
- Publishable key only. Service key never in browser.

**couchbase.js** — archive reader
- Exports: `archiveLookup(query)`, `archiveRestore(id)`
- Calls `VITE_SUPABASE_URL + /functions/v1/archive`
- Never touches Couchbase directly

**database.js** — entry point
```js
export * from "./firebase.js";
export * from "./supabase.js";
export * from "./couchbase.js";
```

---

ENVIRONMENT VARIABLES

.env (gitignored):

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
VITE_SUPABASE_URL
VITE_SUPABASE_KEY
```

Only VITE_ prefixed vars reach the browser. Injected at build time.

---

ROUTER

File: Website Version/index.html + script.js

Reads navigator.userAgent, sends HEAD request to target, forwards.

Routes:

Condition Target
Android Mobile, iPhone, iPod, Windows Phone, BlackBerry, Opera Mini, IEMobile @Mobile Version/Mobile.html
iPad, Android non-mobile, Tablet @Tablet Version/Tablet.html
Windows NT, Macintosh, X11, CrOS @Laptop Version/Laptop.html
anything else @Dynamic Version/Dynamic.html
HEAD miss or network fail @Error Version/Error.html?tag=Error

Boot screen (index.html + style.css): icon centered, glow animation,
minimum 1 second hold. HEAD check runs in parallel.

---

VITE CONFIG

File: Website Version/vite.config.js

```js
input: {
  router:  resolve(__dirname, "index.html"),
  mobile:  resolve(__dirname, "@Mobile Version/Mobile.html"),
  tablet:  resolve(__dirname, "@Tablet Version/Tablet.html"),
  laptop:  resolve(__dirname, "@Laptop Version/Laptop.html"),
  dynamic: resolve(__dirname, "@Dynamic Version/Dynamic.html"),
  error:   resolve(__dirname, "@Error Version/Error.html")
}
```

Build output: dist/

---

RUNNING VITE ON PHONE

Why the copy step: Android blocks npm symlinks in
/storage/emulated/0/. npm must run in Termux's home folder.

```bash
rm -rf ~/phostack-build
mkdir -p ~/phostack-build
cp -r "/storage/emulated/0/Programs/Phostack/Website Version/." ~/phostack-build/

cd ~/phostack-build
npm install
npm run dev
```

Dev server: http://localhost:5173/
Stop server: CTRL + C in Termux

---

GIT

Repo: github.com/aphostus/hub → branch phostack

```bash
cd /storage/emulated/0/Programs/Phostack
git add .
git commit -m "what changed"
git push
```

Auth: credential cache at ~/.git-credentials. Token is a GitHub classic
token with repo scope.

---

GITIGNORE (root)

```
*
!.gitignore
!README.md
!DEVELOP.md
!Website Version/
!Website Version/**
!Native Version/
!Native Version/**
Website Version/.env
Website Version/.env.local
Website Version/Private Sources/datahub.env
Native Version/Private Sources/
node_modules/
dist/
.vite/
```

Verify a file is ignored: git check-ignore -v "path"

---

TOKENS

File: src/Operator Sources/tokens.css

Colors:

```
--black: #000000
--gray-dark: #1a1a1a
--gray-mid: #888888
--gray-light: #cccccc
--white: #ffffff
```

Font:

```
--font: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif
```

Radii: --radius-sm 8px, --radius-md 12px, --radius-lg 24px, --radius-pill 999px

Motion:

```
--ease-spring: cubic-bezier(0.16, 1, 0.3, 1)
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)
```

Type scale:

```
--text-body: 15px
--text-label: 13px
--text-title: 22px
--text-display: 28px
```

Weights:

```
--weight-body: 400
--weight-emphasis: 500
--weight-label: 600
--weight-title: 700
```

Usage in version CSS:

```css
@import url("../Operator Sources/tokens.css");
```

---

KNOWN CONSTRAINTS

· npm install/build must run in ~/phostack-build/, not /storage/
· Vite dev server dies when Termux closes
· Mobile version files are empty placeholders
· System Version removed — ?dev=1 no longer routes anywhere
· Supabase tables not created yet
· Firebase Google sign-in not enabled in console yet
· Couchbase Capella cluster not created yet
· Edge function for archive not written yet

---

WHAT EXISTS VS EMPTY

Path Status
index.html, script.js, style.css Working router + boot screen
src/main.js Loads xdb, logs to console
src/Operator Sources/xdbs.fct/* Complete
src/Operator Sources/tokens.css Complete
src/Operator Sources/converter.js Empty
@Mobile Version/Mobile.* Empty
@Tablet Version/Tablet.* Empty
@Laptop Version/Laptop.* Empty
@Dynamic Version/Dynamic.* Empty
@Error Version/Error.* Complete
Native Version/ Untouched