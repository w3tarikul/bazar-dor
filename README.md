# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**

বাজার দর is a Bengali-first web app for tracking everyday market prices across Bangladesh. You can see today's prices for rice, lentils, oil, vegetables, fish, meat, eggs and dairy, and spices in one place. Each product shows how its price changed since yesterday, the minimum, maximum and average across markets, and a market-by-market breakdown from Dhaka, Chattogram, Rajshahi, Khulna, Sylhet and Mymensingh.

চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।

---

## ✨ Key Features

1. **Live price ticker:** an infinitely scrolling strip under the navbar shows every product whose price moved today (`🍚 স্বর্ণমাছি চাল ১৪৮ টাকা/কেজি ▲ ২.১%`). It pauses on hover.
2. **Top movers on the home page:** the six biggest risers (**আজ দাম বেড়েছে ▲**) and the six biggest fallers (**আজ দাম কমেছে ▼**), ranked by percentage change.
3. **Category browsing with sorting:** each category (`/category/[slug]`) has a sort dropdown (ডিফল্ট / দাম: কম থেকে বেশি / দাম: বেশি থেকে কম). Sorting compares numeric values, so Bengali numerals sort correctly.
4. **Product details page (protected):** shows today's price, the change since yesterday, a min/max/average price summary, and a **বাজারভিত্তিক আজকের দাম** table covering 12 markets.
5. **Authentication with BetterAuth:** email/password sign up and sign in, plus Google and GitHub login. Sessions are stored in MongoDB Atlas.
6. **Profile and update information:** a protected **আমার প্রোফাইল** page where users can upload or remove a profile photo (resized in the browser to a small 256×256 image), plus a separate route (`/profile/update`) where users can change their name.
7. **Fully Bengali UI:** Hind Siliguri font, Bengali digits (`১,৮৫০ টাকা`), and the Bangla date in the navbar.
8. **Polished UX:** skeleton loaders, toast notifications (react-hot-toast) for auth and protected-route redirects, a friendly 404 page, and hover effects throughout.
9. **Responsive:** works on mobile, tablet and desktop. The grid goes from 1 to 2 to 3 columns, the category bar and ticker scroll horizontally, and the hero stacks on small screens.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| [Next.js 16](https://nextjs.org/) (App Router, Cache Components) | Framework, routing, server rendering and caching |
| [React 19](https://react.dev/) | UI library |
| [Tailwind CSS 4](https://tailwindcss.com/) + [daisyUI 5](https://daisyui.com/) | Styling and the custom `bazardor` theme |
| [BetterAuth](https://better-auth.com/) | Email/password, Google and GitHub authentication |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | User, session and account storage |
| [react-hot-toast](https://react-hot-toast.com/) | Toast notifications |
| `next/font` (Hind Siliguri) | Bengali typography |
| [Vercel](https://vercel.com/) | Deployment |

**Data source:** [Programming Hero Bazardor API](https://openapi.programming-hero.com/api/bazardor/products), with two fallback mirrors.

---

## 📁 Routes

| Route | Description | Access |
| --- | --- | --- |
| `/` | Hero, top risers and fallers, all products with sort | Public |
| `/category/[slug]` | Products in one category with sort | Public |
| `/product/[slug]` | Product details, price summary and market table | 🔒 Login required |
| `/signin`, `/signup` | Authentication | Public |
| `/profile` | My profile and sign out | 🔒 Login required |
| `/profile/update` | Update name | 🔒 Login required |

---

## 🚀 Getting Started

```bash
git clone https://github.com/w3tarikul/bazar-dor.git
cd bazar-dor
npm install
cp .env.example .env   # then fill in the values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Description |
| --- | --- |
| `BETTER_AUTH_SECRET` | Random secret (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | App URL, e.g. `http://localhost:3000` or your Vercel domain |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `MONGODB_DB` | Database name (default `bazardor`) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials |

OAuth callback URLs:

- Google: `<BETTER_AUTH_URL>/api/auth/callback/google`
- GitHub: `<BETTER_AUTH_URL>/api/auth/callback/github`

---

## 📜 Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint with ESLint
```

---

> সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
