# THE KAFA RESTAURANT - PROJECT RECORDS & CHANGELOG

## 1. Project Initialization & Context
- **Repository URL:** `https://github.com/Gana-Surya/the-kafa-restaurant`
- **Local Path:** `c:\Users\user\Desktop\Projects\the-kafa-restaurant`
- **Initial Clone Date:** 2026-10-31
- **Tech Stack:**
  - React 19.2.8 + TypeScript (~6.0.2)
  - Vite 8.3.0
  - Tailwind CSS 4.3.3 (`@tailwindcss/vite`)
  - Icons: `lucide-react` (1.47.0)
  - Linter: `oxlint` (1.81.0)

---

## 2. Current Architecture & Feature Audit

### Existing Features
1. **Catalog & Menu Navigation:**
   - ~40 categories, ~1,300+ items across coffee, food, desserts, etc. (`src/data/menuData.ts`).
   - Category filter pills, dietary filters (Veg / Non-Veg / Egg), live text search.
2. **Product Customization Modal (`ProductDetailModal.tsx`):**
   - Options for milk alternatives, syrups, temperatures, addons, recalculating unit prices.
3. **Cart & Local State (`CartContext.tsx`):**
   - In-memory cart with quantity increment/decrement, subtotal computation, custom choice hashing.
4. **Order Confirmation Flow (`OrderSummary.tsx`):**
   - Shows items, subtotal, and a "Send Order to Barista" button.
   - Clears cart and displays a static modal: *"Order Received! Your order has been sent to our barista for Table NSZ 5."*

---

## 3. Critical Gaps for Frontend-Only Real-Time WhatsApp/Call Order Delivery
1. **No Outbound Delivery of Order Details:**
   - Order placement only changes an in-memory boolean flag. No real network dispatch, no WhatsApp message generation, no telephone linkage.
2. **Missing Customer & Order Dispatch Data:**
   - Missing customer contact info: Name, Phone Number, Service Mode (Dine-In, Takeaway, Home Delivery).
   - Missing delivery address field (with GPS Geolocation / Google Maps link option).
   - Missing special cooking/delivery instructions field.
3. **Missing Direct WhatsApp Order Dispatcher:**
   - Needs formatted receipt message generation with URL encoding for `https://wa.me/<PHONE>?text=...` (or WhatsApp Web on desktop).
   - Needs fallback multi-recipient support (e.g. Barista Desk + Kitchen + Owner).
4. **Missing Instant Call Trigger (`tel:`):**
   - One-tap "Call Café to Confirm" button with pre-filled dialer action.
   - Optional Web Speech API TTS (Text-to-Speech) prompt reading the order aloud to the customer/owner, or copyable order summary for verbal confirmation.
5. **Missing State Persistence & Order Tracking (Real-Time UX):**
   - Currently, refreshing the browser wipes the cart and active order. Needs `localStorage` / `IndexedDB` persistence.
   - Needs simulated or WebRTC / BroadcastChannel / SSE real-time order lifecycle status tracker (Received -> In the Kitchen -> Out for Delivery / Ready -> Served).
6. **Missing Digital Receipt / Bill Generation:**
   - Printable or downloadable instant receipt / invoice with timestamp and order ID.
7. **Missing Merchant / Kitchen View (Frontend-Only PWA):**
   - Direct frontend Kitchen Display System (KDS) via URL parameter (e.g., `?mode=kitchen`) or PIN-protected owner tab with audio alert chimes upon new orders.

---

## 4. Updates & Changes Log
- **2026-10-31 15:30:** Cloned repository locally into `c:\Users\user\Desktop\Projects\the-kafa-restaurant`.
- **2026-10-31 15:33:** Completed initial architectural audit of `src/` components and state management.
- **2026-10-31 15:34:** Created `PROJECT_RECORDS.md` to track all progress and architectural milestones.
- **2026-10-31 15:35:** Verified dependency installation (`npm install` succeeded) and production build (`npm run build` succeeded without error).
- **2026-10-31 15:36:** Formulated complete end-to-end architecture for frontend-only real-time ordering and WhatsApp / direct call dispatch.
- **2026-10-31 15:48:** Configured target WhatsApp and phone line `91107 97854` (`+91 91107 97854`, international format `919110797854`).
- **2026-10-31 15:49:** Set git remote origin to forked repository: `https://github.com/lunacoderj/the-kafa-restaurant.git`.
- **2026-10-31 15:50:** Implemented Web Audio API sound synthesizer and vibration manager (`src/utils/audio.ts`).
- **2026-10-31 15:51:** Implemented WhatsApp order message generator, direct dialer URL generator, and text-to-speech helpers (`src/utils/whatsapp.ts`).
- **2026-10-31 15:52:** Created `src/config/restaurantConfig.ts` with restaurant profile, tables, WhatsApp number, UPI ID, and delivery fees.
- **2026-10-31 15:53:** Upgraded `src/context/CartContext.tsx` with:
  - LocalStorage persistence for cart, active order, and order history.
  - Automatic `?table=` URL parameter parsing.
  - Multi-tab synchronization using HTML5 `BroadcastChannel` (`kafa_kitchen_channel`).
  - Order status lifecycle machine: `placed` -> `confirmed` -> `preparing` -> `ready` -> `completed`.
- **2026-10-31 15:54:** Created checkout & real-time delivery components:
  - `src/components/CheckoutModal.tsx`: Fulfillment mode selector (Dine-in, Takeaway, Delivery), HTML5 Geolocation Maps pin fetcher, Instant UPI QR preview, WhatsApp dispatch (`wa.me/919110797854`), Direct Call (`tel:+919110797854`).
  - `src/components/LiveOrderTracker.tsx`: Real-time order progress stepper, elapsed time countdown, status simulation, one-tap WhatsApp status inquiry, and call links.
  - `src/components/KitchenDisplayView.tsx`: Barista/Kitchen order board with live status updates, audio bell alert, and direct call/WhatsApp customer links.
  - `src/components/DigitalReceiptModal.tsx`: Printable vintage thermal receipt modal with print (`window.print()`) and share options.
  - Updated `src/components/Header.tsx`, `src/components/BottomNav.tsx`, `src/components/OrderSummary.tsx`, `src/components/ProfileView.tsx`, and `src/App.tsx`.
- **2026-10-31 15:55:** Ran `npm run build` (`tsc -b && vite build`) and verified 100% clean production build.

---

## 5. Architectural Specification for Frontend-Only Realtime Ordering with WhatsApp & Call Delivery

### A. Ordering Types & Customer Information
1. **Order Fulfillment Modes:**
   - **Dine-In:** Table selection (preset from QR URL e.g. `?table=NSZ5` or manual dropdown).
   - **Takeaway / Pickup:** Customer name, phone number, estimated pickup time.
   - **Delivery:** Customer name, phone number, complete address, landmark, live GPS location button (via HTML5 Geolocation API).
2. **Customer Notes & Cooking Instructions:**
   - Allergy notes, spice level, cutlery requests.
3. **Payment Preferences:**
   - Pay at Counter / Cash on Delivery, or UPI QR Code instant popup.

### B. WhatsApp Order Dispatch Engine
1. **URL Scheme:** `https://api.whatsapp.com/send?phone={RECIPIENT}&text={ENCODED_MESSAGE}` / `https://wa.me/{RECIPIENT}?text={ENCODED_MESSAGE}`.
2. **Standardized Message Payload Format:**
   - Order ID (`#KAFA-xxxx`) & Timestamp
   - Order Type (Dine-In Table / Takeaway / Delivery)
   - Customer Details (Name, Phone, Address, Google Maps Pin if delivery)
   - Itemized Bill (Quantity, Name, Customizations, Unit Price, Total)
   - Order Subtotal, Taxes, Delivery Fee, Final Payable Amount
   - Customer Special Instructions
3. **Multi-Channel Dispatch:**
   - Option to configure primary phone (Café Owner/Manager) and secondary (Kitchen/Barista).

### C. Direct Call Dispatch Engine
1. **Click-to-Call Link:** `tel:+91XXXXXXXXXX`.
2. **Verbal / Speech Synthesis Assistance:**
   - Web Speech API TTS to read aloud order summary to customer or staff.
   - One-tap "Copy Order Summary to Clipboard" for fast verbal reading over phone.

### D. Real-time UX & Order Lifecycle Simulation
1. **Status Progression Machine:**
   - `RECEIVED` -> `PREPARING` -> `READY / OUT_FOR_DELIVERY` -> `COMPLETED`.
   - Dynamic animated countdown timer and progress bar.
2. **Sound & Haptic Alerts:**
   - Web Audio API notification chimes on order status change.
   - Vibration API (`navigator.vibrate`) for mobile tactile feedback.
3. **Persistence:**
   - `localStorage` order history tracking with active order drawer/banner.

### E. Frontend Kitchen Display / Owner Mode
1. **Merchant View (`?admin=1` or pin code):**
   - Shows active orders stored in `localStorage` or synced via `BroadcastChannel` (cross-tab real-time sync).
   - Ability to update status, call the customer back (`tel:{customerPhone}`), or reply on WhatsApp.

