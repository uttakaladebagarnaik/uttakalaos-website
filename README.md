# UTTAKALA OS — Official Website v3.0
## Cyberpunk Dark Tech Official Brand, Simulator & Trust Platform

> **Official public brand, web simulator, and compliance infrastructure for UTTAKALA OS.**  
> *"YOUR LIFE. YOUR SYSTEM. YOUR CONTROL."*  
> An autonomous personal life operating system designed for individual sovereignty, focus calibration, habit mastery, academic scheduling, and air-gapped private journals.

---

## 1. Visual Identity & Design System

The official UTTAKALA OS web experience utilizes a futuristic **Cyberpunk Dark Tech** design system engineered for high contrast, OLED readability, and immersion:

- **Primary Background:** `#0B0C10` (Obsidian Black)
- **Primary Brand:** `#106EBE` (Electric Blue)
- **Secondary Accent:** `#0FFCBE` (Cyber Mint)
- **Highlight Neon:** `#00FFFF` (Electric Cyan)
- **Dark Surface:** `#151922`
- **Elevated HUD Surface:** `#202938`
- **Primary Text:** `#EAF2FF` (Ice Light)
- **Secondary Text:** `#8995A8` (Slate Muted)
- **Precision Borders:** `#283449`
- **Typography:** Plus Jakarta Sans & JetBrains Mono

---

## 2. Complete Architecture & Pages

The platform spans 10 cohesive HTML pages:

| Page | File | Purpose |
| :--- | :--- | :--- |
| **Command Center** | [`index.html`](./index.html) | Cinematic hero with 3D perspective stage, metrics strip, module highlights, and interactive showcase |
| **Feature Matrix** | [`features.html`](./features.html) | Interactive 12-domain filter matrix featuring all 20 authentic 1080p native application screenshots |
| **Live Simulator** | [`experience.html`](./experience.html) | Browser test-drive featuring working Pomodoro timer, 60-day clickable habit matrix, and theme engine |
| **Operator Tutorials** | [`tutorials.html`](./tutorials.html) | Interactive visual console player with step-by-step onboarding walkthroughs |
| **Trust Center Hub** | [`trust.html`](./trust.html) | Dedicated compliance and transparency hub detailing local vs cloud isolation principles |
| **Data & Security** | [`security.html`](./security.html) | Technical whitepaper on Room/SQLite sandboxing, Supabase PostgreSQL RLS, and raw JSON Drive backups |
| **Privacy Policy** | [`privacy.html`](./privacy.html) | Legally structured GDPR/CCPA privacy policy (v2.0) with reading progress bar and sticky TOC |
| **Terms of Service** | [`terms.html`](./terms.html) | Terms of service (v2.0) defining user backup obligations, acceptable use, and limitation of liability |
| **System Philosophy** | [`about.html`](./about.html) | Engineering origins, philosophy of individual sovereignty, and three-phase release roadmap |
| **Dispatch Console** | [`contact.html`](./contact.html) | Interactive communication console with pre-formatted mailto triggers and security disclosure protocol |

---

## 3. Verified Data & Security Boundaries

In accordance with strict factual verification:

1. **Secret Diary is Strictly Local-Only:** Stored in the device's internal SQLite database (`Room`). It is physically excluded from Supabase sync payloads and Google Drive backup generators.
2. **Google Drive Backups are Unencrypted JSON:** Backups stored in the hidden AppData folder (`drive.appdata`) are raw, structured JSON snapshots. UTTAKALA OS does not apply client-side zero-knowledge encryption. Users are advised to enable 2FA on their Google Accounts.
3. **Supabase Cloud Sync:** Protected by PostgreSQL Row Level Security (RLS) policies enforcing `auth.uid() = user_id`.
4. **Zero Third-Party Trackers:** No Google AdMob, Adjust, AppsFlyer, or Facebook Pixel SDKs are packaged with the application or website.

---

## 4. Authentic Screenshots Directory

All 20 authentic Android screenshots are located in `assets/images/screenshots/`:

1. `01-mission-command.png` — Mission Command Tactical HUD (1920x1080)
2. `02-mastery-matrix.png` — 60-Day Habit Mastery Matrix (1920x1080)
3. `03-launchpad-mascot.png` — Tactical Launchpad & AI Companion (1920x1080)
4. `04-focus-timer.png` — Tactical Pomodoro Focus Engine (1920x1080)
5. `05-daily-tasks.png` — Daily Routine & Priority Matrix (1920x1080)
6. `06-ai-task-slicer.png` — AI Task Slicing Engine (1920x1080)
7. `07-academic-vault.png` — Academic Lecture & Syllabus Vault (1920x1080)
8. `08-coding-vault.png` — LeetCode & Algorithmic Problem Logger (1920x1080)
9. `09-salticor-security.png` — Salticor Biometric & PIN Security Guard (1920x1080)
10. `10-finance-vault.png` — Personal Financial Ledger (1920x1080)
11. `11-habits-health.png` — Health & Routine Telemetry (1920x1080)
12. `12-dopamine-breaker.png` — 10-Second Urge Breaker (1920x1080)
13. `13-flashcards.png` — Spaced Repetition Flashcards (1920x1080)
14. `14-voice-coach.png` — Voice Diagnostics & Evening Review (1920x1080)
15. `15-secret-diary-locked.png` — Secret Diary Biometric Lock Screen (1920x1080)
16. `16-secret-diary-unlocked.png` — Secret Diary Local Sandbox View (1920x1080)
17. `17-google-drive-backup.png` — Google Drive AppData JSON Backup Interface (1920x1080)
18. `18-aura-flex.png` — Aura Flex Weekly Consistency Analytics (1920x1080)
19. `19-profile-customization.png` — Tactical Callsign & Theme Customizer (1920x1080)
20. `20-mobile-dashboard.png` — Mobile Responsive View & Dock (390x844)

---

## 5. Local Development & Verification

To test and inspect the website locally:

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .
```

Open `http://localhost:8080/index.html` in any modern web browser.
