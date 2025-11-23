# CulturaX

AR Cultural Heritage Comic Creator - An educational platform for teaching civic sense at heritage sites through AI-generated comics.

## 🚀 Local Setup Guide

Follow these steps to set up and run the project on your local machine:

### Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A **Google Gemini API Key** - [Get it here](https://aistudio.google.com/apikey)

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
# Install all project dependencies
npm install

# Install Tailwind CSS and its dependencies
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind CSS (if not already done)
npx tailwindcss init -p
```

### Step 2: Set Up Environment Variables

1. Create a `.env` file in the root directory (same level as `package.json`)
2. Add your Google Gemini API key:

```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
```

**Important:** 
- In Vite, environment variables must be prefixed with `VITE_` to be exposed to the browser
- Never commit your `.env` file to version control (it's already in `.gitignore`)
- The variable name is `VITE_GEMINI_API_KEY` (not `VITE_API_KEY`)

### Step 3: Run the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:3000` (or the port shown in your terminal).

### Step 4: Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` folder.

### Step 5: Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
CulturaX/
├── index.html              # Main HTML file
├── index.tsx               # React entry point
├── App.tsx                 # Main App component
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
├── .env                    # Environment variables (create this)
├── .env.example            # Environment variables template
├── src/
│   └── index.css           # Global styles with Tailwind
├── components/             # React components
│   ├── LandingPage.tsx
│   ├── ComicCreator.tsx
│   ├── ComicCard.tsx
│   ├── FeedbackSection.tsx
│   ├── LoadingBrush.tsx
│   ├── Mascot.tsx
│   ├── PurchaseModal.tsx
│   └── QuizModal.tsx
├── services/
│   └── geminiService.ts    # Google Gemini API integration
├── types.ts                # TypeScript type definitions
└── translations.ts         # Language translations
```

## 🔧 Key Changes Made for Local Setup

1. **Removed CDN dependencies**: Replaced CDN scripts with npm packages
2. **Added Tailwind CSS**: Configured Tailwind for local development
3. **Environment variables**: Changed from `process.env` to `import.meta.env` (Vite standard)
4. **Updated imports**: All dependencies now use local node_modules

## 🐛 Troubleshooting

### Issue: "npm is not recognized"
- **Solution**: Install Node.js from [nodejs.org](https://nodejs.org/)

### Issue: "API Key is missing" error
- **Solution**: 
  1. Create a `.env` file in the root directory
  2. Add `VITE_GEMINI_API_KEY=your_api_key_here`
  3. Restart the development server

### Issue: Styles not loading
- **Solution**: 
  1. Make sure `src/index.css` exists and has Tailwind directives
  2. Verify `index.tsx` imports the CSS file
  3. Run `npm install -D tailwindcss postcss autoprefixer` if not done

### Issue: Port 3000 already in use
- **Solution**: Change the port in `vite.config.ts` or kill the process using port 3000

## 📝 Notes

- The project uses **Vite** as the build tool
- **React 19** and **TypeScript** are used for development
- **Tailwind CSS** is used for styling
- The app requires an active internet connection for the Google Gemini API

## 🚀 Deployment Guide

### Deploying to Vercel

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Import your project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository

3. **Set Environment Variables in Vercel**
   - In your Vercel project dashboard, go to **Settings** → **Environment Variables**
   - Add a new variable:
     - **Name**: `VITE_GEMINI_API_KEY`
     - **Value**: Your Gemini API key (`AIzaSyA3L4WUNI-07L4126RWu6nQEAJvzw19AOo`)
     - **Environment**: Select all (Production, Preview, Development)
   - Click **Save**

4. **Redeploy**
   - After adding the environment variable, go to **Deployments**
   - Click the three dots (⋯) on your latest deployment
   - Select **Redeploy**
   - Or push a new commit to trigger a new deployment

5. **Verify**
   - Check the browser console for: "Using VITE_GEMINI_API_KEY from environment"
   - Try generating an image to confirm it works

### Important Notes for Deployment:
- ⚠️ **Environment variables must be set in your deployment platform** (Vercel, Netlify, etc.)
- ⚠️ **The `.env` file is NOT deployed** - you must set variables in the platform's dashboard
- ⚠️ **After adding environment variables, you MUST redeploy** for changes to take effect
- ⚠️ **Variable name must be exactly**: `VITE_GEMINI_API_KEY`

### Other Deployment Platforms

For **Netlify**, **Railway**, or other platforms:
1. Set the environment variable `VITE_GEMINI_API_KEY` in your platform's settings
2. Redeploy your application
3. The variable will be available at build time and runtime

## 📄 License

See LICENSE file for details.
