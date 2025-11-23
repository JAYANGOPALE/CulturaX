# 🚨 FIX: API Key Not Working in Deployment

## The Problem
You're seeing: "Invalid or missing Gemini API key. Please check your VITE_GEMINI_API_KEY environment variable"

## ✅ Solution Steps

### Step 1: Set Environment Variable in Vercel

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project: `cultura-x-nine`

2. **Navigate to Settings**
   - Click on your project
   - Click **Settings** in the top menu
   - Click **Environment Variables** in the left sidebar

3. **Add the Variable**
   - Click **Add New**
   - **Key**: `VITE_GEMINI_API_KEY`
   - **Value**: Your Gemini API key (get it from https://aistudio.google.com/apikey)
   - **Environment**: Select **ALL** (Production, Preview, Development)
   - Click **Save**

### Step 2: Redeploy (CRITICAL!)

**You MUST redeploy after adding the environment variable!**

**Option A: Redeploy from Dashboard**
1. Go to **Deployments** tab
2. Find your latest deployment
3. Click the **three dots (⋯)** menu
4. Click **Redeploy**
5. Make sure **Use existing Build Cache** is **UNCHECKED**
6. Click **Redeploy**

**Option B: Push a New Commit**
```bash
git commit --allow-empty -m "Trigger redeploy with env vars"
git push
```

### Step 3: Verify It's Working

1. **Open your deployed site**: https://cultura-x-nine.vercel.app
2. **Open Browser Console** (F12 → Console tab)
3. **Try generating an image**
4. **Look for these logs**:
   - ✅ `Using VITE_GEMINI_API_KEY from environment` (Good!)
   - ⚠️ `Using fallback API key` (Bad - env var not found)

## 🔍 Debugging

### Check if Variable is Set

In your browser console, run:
```javascript
console.log('API Key:', import.meta.env.VITE_GEMINI_API_KEY);
```

- If it shows `undefined` → Variable not set or app not rebuilt
- If it shows the key → Variable is set correctly

### Common Issues

1. **Variable not set in Vercel**
   - Solution: Follow Step 1 above

2. **App not rebuilt after setting variable**
   - Solution: Follow Step 2 above (Redeploy)

3. **Variable set but in wrong environment**
   - Solution: Make sure you selected ALL environments (Production, Preview, Development)

4. **Variable name typo**
   - Must be exactly: `VITE_GEMINI_API_KEY` (case-sensitive)

5. **Build cache issue**
   - Solution: Redeploy with "Use existing Build Cache" UNCHECKED

## 📝 Quick Checklist

- [ ] Environment variable `VITE_GEMINI_API_KEY` added in Vercel
- [ ] Variable value is set with a valid API key from https://aistudio.google.com/apikey
- [ ] Variable set for ALL environments (Production, Preview, Development)
- [ ] App redeployed after adding variable
- [ ] Build cache was cleared during redeploy
- [ ] Browser console shows "Using VITE_GEMINI_API_KEY from environment"

## 🆘 Still Not Working?

If it's still not working after following all steps:

1. **Check Vercel Build Logs**
   - Go to Deployments → Click on latest deployment → View Build Logs
   - Look for any errors related to environment variables

2. **Check Browser Console**
   - Open F12 → Console
   - Look for error messages
   - Share the full error message

3. **Verify API Key is Valid**
   - Go to: https://aistudio.google.com/apikey
   - Check if your API key is still active
   - Make sure billing is enabled if required

4. **Try the Fallback Key**
   - The code has a fallback key built-in
   - If you see "Using fallback API key" in console, the fallback should work
   - If fallback also fails, the API key itself might be invalid

## 💡 Why This Happens

Vite embeds environment variables **at build time**, not runtime. This means:
- Variables must be set **before** building
- After setting variables, you **must rebuild/redeploy**
- Variables are baked into the JavaScript bundle during build

This is different from server-side apps where env vars can be read at runtime.

