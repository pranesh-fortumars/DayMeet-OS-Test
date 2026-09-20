# DayMeet Super App

DayMeet is an "All-in-One Daily Life Super App" functioning as a personal digital command center. It integrates productivity, meetings, tasks, finance, health tracking, and habits into a single unified mobile dashboard.

## Project Structure

This repository uses a unique parallel architecture to ensure zero downtime during its migration to a modern framework:

1. **Root Directory (V1 Monolith)**
   - `index.html`: The original massive single-page monolithic web application.
   - `android/`: A Capacitor-generated native Android project that wraps the web app, configured to pull live OTA (Over-The-Air) updates from Vercel.
   - `app/`: Legacy native Kotlin Android code (deprecated in favor of the Capacitor wrapper).

2. **`daymeet-v2/` Directory (V2 React)**
   - This is the future of DayMeet! It is an isolated **Vite + React** environment.
   - We are systematically breaking down the monolithic HTML file into maintainable React components here.
   - It includes **Tailwind CSS**, native **Capacitor Haptics/Status Bar** integrations, and **Offline PWA Support** (via Vite Service Workers).

## How to Run DayMeet V2

To work on the new React architecture, navigate into the v2 directory and start the local development server:

```bash
cd daymeet-v2
npm install
npm run dev
```

## Building the Android APK

The Capacitor Android wrapper is located in the `android/` directory and is currently configured to sync with the `www/` folder.

To open the project in Android Studio and compile your APK:
```bash
npx cap open android
```
From Android Studio, navigate to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

## Vercel Deployment

To deploy the modern React app, ensure your Vercel Project Settings are configured with the **Root Directory** set to `daymeet-v2`. 

Because Capacitor is configured for Live Updates via `capacitor.config.json`, any new code pushed to GitHub and deployed by Vercel will instantly appear inside the Android APK for all users—no App Store updates required!
