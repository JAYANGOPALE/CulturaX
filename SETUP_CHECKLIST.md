# Setup Checklist

Follow these steps in order to set up the project:

## ✅ Step-by-Step Checklist

### 1. Prerequisites
- [ ] Node.js installed (v18+) - Check with: `node --version`
- [ ] npm installed - Check with: `npm --version`

### 2. Install Dependencies
- [ ] Run: `npm install`
- [ ] Run: `npm install -D tailwindcss postcss autoprefixer`
- [ ] Run: `npx tailwindcss init -p` (if not already done)

### 3. Environment Setup
- [ ] Create `.env` file in root directory
- [ ] Add your API key: `VITE_API_KEY=your_api_key_here`
- [ ] Get API key from: https://aistudio.google.com/apikey

### 4. Verify Files
- [ ] `tailwind.config.js` exists
- [ ] `postcss.config.js` exists
- [ ] `src/index.css` exists
- [ ] `.env` file exists (not committed to git)

### 5. Run the Project
- [ ] Run: `npm run dev`
- [ ] Open browser to the URL shown (usually http://localhost:3000)
- [ ] Verify the app loads without errors

## 🔍 Quick Verification

After setup, verify:
1. ✅ No console errors in browser
2. ✅ Styles are loading (check if Tailwind classes work)
3. ✅ API key is being read (check console for any API key errors)

## 🆘 If Something Goes Wrong

1. **Delete `node_modules` and reinstall:**
   ```bash
   rm -rf node_modules
   npm install
   ```

2. **Clear Vite cache:**
   ```bash
   rm -rf node_modules/.vite
   ```

3. **Check that all files are in place:**
   - `tailwind.config.js`
   - `postcss.config.js`
   - `src/index.css`
   - `.env` (with VITE_API_KEY)

4. **Verify imports:**
   - `index.tsx` should import `./src/index.css`
   - `services/geminiService.ts` should use `import.meta.env.VITE_API_KEY`

