# 🚨 URGENT: API Key Has Been Disabled

## The Problem

Your API key has been **disabled by Google** because it was reported as "leaked". 

**Error Message:**
```
"Your API key was reported as leaked. Please use another API key."
```

This happens when an API key is exposed in:
- Public code repositories
- Chat conversations
- Screenshots
- Public documentation

## ✅ Solution: Generate a NEW API Key

### Step 1: Generate a New API Key

1. **Go to Google AI Studio**
   - Visit: https://aistudio.google.com/apikey
   - Sign in with your Google account

2. **Create a New Key**
   - Click **"Create API Key"** or **"Get API Key"**
   - Select your Google Cloud project (or create a new one)
   - Copy the **NEW** API key (it will look like: `AIzaSy...`)

3. **Important Security Steps**
   - ⚠️ **NEVER** share this key publicly
   - ⚠️ **NEVER** commit it to Git
   - ⚠️ **NEVER** paste it in chat or screenshots
   - ✅ **ONLY** set it in Vercel environment variables

### Step 2: Update Vercel Environment Variable

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project: `cultura-x-nine`

2. **Update Environment Variable**
   - Go to **Settings** → **Environment Variables**
   - Find `VITE_GEMINI_API_KEY`
   - Click **Edit** (or delete and recreate)
   - **Value**: Paste your NEW API key
   - **Environment**: Select ALL (Production, Preview, Development)
   - Click **Save**

### Step 3: Redeploy (CRITICAL!)

**You MUST redeploy after updating the API key!**

1. Go to **Deployments** tab
2. Click the **three dots (⋯)** on latest deployment
3. Click **Redeploy**
4. **UNCHECK** "Use existing Build Cache"
5. Click **Redeploy**

### Step 4: Verify It Works

1. Open your site: https://cultura-x-nine.vercel.app
2. Open Browser Console (F12)
3. Try generating an image
4. You should see: `✅ Using VITE_GEMINI_API_KEY from environment`
5. Image generation should work!

## 🔒 Security Best Practices

### ✅ DO:
- Store API keys in environment variables only
- Use Vercel's environment variable settings
- Keep keys private and secure
- Rotate keys if they're exposed

### ❌ DON'T:
- Commit API keys to Git
- Share keys in chat or messages
- Include keys in screenshots
- Hardcode keys in source code
- Share keys publicly

## 🆘 Still Having Issues?

If you still see errors after generating a new key:

1. **Verify the key is valid**
   - Test it at: https://aistudio.google.com/apikey
   - Make sure it's active and not restricted

2. **Check Vercel deployment**
   - Make sure you redeployed after setting the variable
   - Check build logs for any errors

3. **Verify environment variable**
   - In browser console, check: `import.meta.env.VITE_GEMINI_API_KEY`
   - Should show your new key (not undefined)

4. **Check API quotas**
   - Make sure billing is enabled if required
   - Check if you've hit rate limits

## 📝 Quick Checklist

- [ ] Generated NEW API key from https://aistudio.google.com/apikey
- [ ] Updated `VITE_GEMINI_API_KEY` in Vercel dashboard
- [ ] Set variable for ALL environments (Production, Preview, Development)
- [ ] Redeployed application (with build cache cleared)
- [ ] Verified new key is working in browser console
- [ ] Image generation is working

## 💡 Why This Happened

The previous API key was:
- Shared in this conversation
- Possibly committed to a public repository
- Detected by Google's security systems
- Automatically disabled for security

This is a **security feature** to protect your account and prevent unauthorized usage.

