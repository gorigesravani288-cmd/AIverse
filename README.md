<div align="center">
  <img src="icon-192.png" alt="AIverse Logo" width="120" height="120">

  # 🚀 AIverse — AI Discovery & Workflow Platform

  [![Live Demo](https://img.shields.io/badge/Live_Demo-View_App-4F46E5?style=for-the-badge&logo=vercel&logoColor=white)](https://aiverse-lyart.vercel.app/)
  [![Supabase](https://img.shields.io/badge/Powered_by-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-4F46E5?style=for-the-badge)](LICENSE)

  <p align="center">
    <strong>Discover AI Tools • Build Workflows • Create Collections</strong>
  </p>

  <p align="center">
    <a href="https://aiverse-lyart.vercel.app/">🌐 Live Demo</a> •
    <a href="#-features">✨ Features</a> •
    <a href="#-tech-stack">🛠️ Tech Stack</a> •
    <a href="#-setup">⚙️ Setup</a> •
    <a href="#-google-oauth-setup">🔐 OAuth Setup</a> •
    <a href="#-contributing">🤝 Contributing</a>
  </p>
</div>

---

## 📋 About

**AIverse** is a modern, community-driven platform for discovering AI tools, building workflows, and creating curated collections. It helps users find the right AI tools for their needs, share their AI stacks, and collaborate with the community.

### 🎯 Key Highlights

- 🧰 **129 AI Tools** across 24 categories
- 📚 **Community Collections** curated by users
- 🔗 **8 Pre-built AI Workflows** with step-by-step guides
- 🔐 **Google Authentication** via Supabase
- 🛠️ **Community Tool Submissions** with admin review queue
- 💸 **100% Free** and open-source

---

## ✨ Features

### 🏠 Core Features

| Feature | Description |
|---|---|
| **AI Tools Directory** | Browse 129 AI tools across 24 categories |
| **Smart Search** | Search with autocomplete and a `⌘K` shortcut |
| **Category Filtering** | Filter by category, pricing, and platform |
| **Favorites** | Save tools with persistent local storage |
| **Recently Viewed** | Automatically tracks the last tools you opened |
| **Google Login** | Secure authentication via Supabase |
| **Trust Stats** | Real-time tool and category counts |

### 🎨 UI/UX

- Dark/Light theme toggle
- Modern glassmorphism design
- Fully responsive layout
- Category quick-filter chips
- Dynamic hero mockup with animations
- Toast notifications for quick confirmations
- Scroll-reveal and micro-interaction polish throughout

### 🔧 Advanced Features

- Pre-built AI workflows
- Community collections
- Side-by-side tool comparison (with remove-from-comparison)
- Tool rating system
- Trending dashboard
- Full user settings panel
- **Community tool submissions** with a per-user pending-submission limit
- **Admin review queue** — approve, reject, or inline-edit submitted tools, filterable by status

---

## 🛠️ Tech Stack

**Frontend**
- HTML5 — Structure
- CSS3 — Styling with glassmorphism
- JavaScript (ES6+) — Functionality
- Google Fonts (Inter) — Typography
- PWA support — Offline capabilities

**Backend & Services**
- Supabase — Authentication (Google OAuth), database, and Postgres RPC functions
- Google Cloud Console — OAuth client registration for Google Sign-In
- LocalStorage — User preferences and favorites

**Deployment**
- Vercel — Hosting
- GitHub — Version control

---

## 📁 Project Structure

```
aiverse/
├── index.html                  # Main application (all-in-one)
├── README.md                   # Project documentation
├── .gitignore                  # Git ignore rules
├── LICENSE                     # MIT License
│
├── manifest.json                # PWA manifest
├── site.webmanifest             # Alternative manifest
├── service-worker.js            # PWA service worker
│
├── icon-192.png                 # PWA icon 192x192
├── icon-maskable-192.png        # Maskable icon 192x192
├── icon-maskable-512.png        # Maskable icon 512x512
├── apple-touch-icon.png         # Apple touch icon
├── favicon-16x16.png            # Favicon 16x16
├── favicon-32x32.png            # Favicon 32x32
├── favicon-48x48.png            # Favicon 48x48
├── favicon.ico                  # Favicon ICO
│
└── assets/
    └── screenshots/              # App screenshots (optional)
```

---

## ⚙️ Setup

### Prerequisites

- A modern web browser
- A [Supabase](https://supabase.com/) account (free tier)
- A [Google Cloud](https://console.cloud.google.com/) account (free, only needed for Google Sign-In)

### Configuration

1. **Update Supabase credentials** in `index.html`:

   ```javascript
   const supabaseUrl = 'https://your-project-id.supabase.co';
   const supabaseKey = 'your-publishable-key-here';
   ```

2. **Set up the `submitted_tools` table and RPC function** in the Supabase SQL editor — required for the Submit Tool feature and its per-user pending-submission limit:

   ```sql
   create table if not exists submitted_tools (
     id uuid primary key default gen_random_uuid(),
     tool_name text not null,
     website text,
     description text,
     submitted_by_email text,
     status text not null default 'pending',
     created_at timestamptz not null default now()
   );

   alter table submitted_tools enable row level security;

   create policy "anyone can insert submissions" on submitted_tools
     for insert to anon, authenticated with check (true);

   create policy "admin can read submissions" on submitted_tools
     for select to authenticated using (auth.jwt() ->> 'email' = 'your-admin-email@example.com');

   create policy "admin can update submissions" on submitted_tools
     for update to authenticated using (auth.jwt() ->> 'email' = 'your-admin-email@example.com');

   create policy "admin can delete submissions" on submitted_tools
     for delete to authenticated using (auth.jwt() ->> 'email' = 'your-admin-email@example.com');

   create or replace function count_pending_submissions(user_email text)
   returns integer
   language sql
   security definer
   set search_path = public
   as $$
     select count(*)::int
     from submitted_tools
     where submitted_by_email = user_email
       and status = 'pending';
   $$;

   grant execute on function count_pending_submissions(text) to anon, authenticated;
   ```

   Then set your admin email in `index.html`:
   ```javascript
   const ADMIN_EMAIL = 'your-admin-email@example.com';
   ```

3. **Set up Google OAuth** — see the dedicated [Google OAuth Setup](#-google-oauth-setup) section below.

4. **Deploy to Vercel:**
   - Connect your GitHub repository
   - Vercel will auto-deploy

---

## 🔐 Google OAuth Setup

Enabling "Sign in with Google" requires registering an OAuth client in **Google Cloud Console** and connecting it to Supabase. Follow these steps carefully — most sign-in issues come from a mismatched Client ID or an incorrect redirect URI.

### 1. Create the OAuth Client in Google Cloud Console

1. Go to [Google Auth Platform → Clients](https://console.cloud.google.com/auth/clients)
2. Select (or create) the Google Cloud project for this app
3. Click **Create Client** → choose **Web application**
4. Under **Authorised JavaScript origins**, add your app's URL:
   ```
   https://your-app.vercel.app
   ```
5. Under **Authorised redirect URIs**, add your **Supabase callback URL** — copy this exactly from Supabase (**Settings → API → Project URL**), don't retype it:
   ```
   https://<your-project-ref>.supabase.co/auth/v1/callback
   ```
6. Click **Create**, then copy the generated **Client ID** and **Client Secret**

### 2. Connect the credentials in Supabase

1. Go to **Supabase Dashboard → Authentication → Providers → Google**
2. Paste in the **Client ID** and **Client Secret** from step 1 — exactly, with no extra spaces
3. Enable the provider and click **Save**

### 3. Verify the OAuth consent screen

- Go to **OAuth consent screen** in Google Cloud Console
- Make sure it's **Published**, or, if in **Testing** mode, add your test Google account under **Test users**

### ⚠️ Common Errors & Fixes

| Error | Cause | Fix |
|---|---|---|
| `401: invalid_client` | The Client ID/Secret in Supabase doesn't match any active OAuth client in Google Cloud Console | Re-copy the Client ID and Secret from Google Cloud Console into Supabase, making sure they belong to the same project |
| `400: redirect_uri_mismatch` | The redirect URI Supabase sends doesn't exactly match what's registered in Google Cloud Console (even a single typo'd character will fail this) | Copy your Supabase project URL directly from **Settings → API** rather than retyping it, and paste it into Authorised redirect URIs |
| `Access blocked: Authorisation Error` | Usually a downstream symptom of one of the two errors above | Fix the underlying Client ID or redirect URI issue first |

> 💡 **Tip:** Always copy-paste credentials and URLs directly from their source (Supabase dashboard, Google Cloud Console) instead of retyping them — a single missing or extra character is the most common cause of OAuth failures.

---

## 🎯 Pre-built Workflows

| Workflow | Category | Tools Used |
|---|---|---|
| **Study Smarter** | Education | Perplexity → ChatGPT → Anki AI → Quizlet AI → Notion AI |
| **Build a Website** | Coding | ChatGPT → Midjourney → Cursor → Replit AI → Surfer SEO |
| **Create Videos** | Video | ChatGPT → Midjourney → ElevenLabs → CapCut AI → Buffer AI |
| **Design Graphics** | Design | ChatGPT → Midjourney → Adobe Firefly → Canva AI → Looka |
| **Grow a Business** | Marketing | Perplexity → Jasper → Buffer AI → Surfer SEO → HubSpot AI |
| **Analyze Data** | Productivity | ChatGPT → Claude → Tableau AI → Beautiful.ai → Tome |
| **Write Content** | Writing | Perplexity → ChatGPT → Jasper → Grammarly AI → WordPress AI |
| **Launch a Startup** | Business | ChatGPT → Perplexity → Cursor → Jasper → Zapier AI |

---

## 📊 Tool Categories

The platform includes 24 categories:

| | | | |
|---|---|---|---|
| Chatbots | Search | AI Search & Research | Image Generation |
| Coding | Design | Audio & Voice | Music Generation |
| Writing | Presentation | Presentations¹ | Video Generation |
| Social Media | SEO | Education | Productivity |
| Marketing | Automation | Data Analytics | AI Agents |
| Meetings & Transcription | Documents & Knowledge | 3D & Spatial AI | Translation |

¹ *`Presentation` and `Presentations` currently render as two separate category cards due to a naming mismatch — rename one to merge them if that's not intended. Same applies to `Search` vs. `AI Search & Research`.*

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a branch: `git checkout -b feature/AmazingFeature`
3. Make your changes
4. Commit: `git commit -m 'Add AmazingFeature'`
5. Push: `git push origin feature/AmazingFeature`
6. Open a Pull Request

You can also contribute tools directly through the app — click **+ Submit Tool**, and it'll go to the admin review queue.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [Supabase](https://supabase.com/) — Authentication and database
- [Google Fonts](https://fonts.google.com/) — Inter font family
- [Vercel](https://vercel.com/) — Hosting platform
- Open Source Community — Inspiration and support