# Environmental Justice AI - Quick Start Guide

## 📦 Files You Have

- **index.html** - Main application (all UI, styles, and structure)
- **app.js** - JavaScript application logic
- **README.md** - Complete documentation
- **.gitignore** - Git configuration
- **package.json** - Project metadata

## 🚀 Getting Started (5 Minutes)

### 1. Download Files
Download these files to your computer:
- `index.html`
- `app.js`

Place them in the same folder.

### 2. Get Your Free API Key
Choose one (all are free, no credit card required):

**Groq (Recommended - Fastest)**
- Visit: https://console.groq.com/keys
- Sign up with GitHub/Google/Email
- Click "Create API Key"
- Copy the key

**Google Gemini**
- Visit: https://aistudio.google.com/app/apikey
- Click "Create API Key"
- Copy the key

**Mistral AI**
- Visit: https://console.mistral.ai/
- Sign up
- Go to API Keys
- Create and copy key

### 3. Open the App
Double-click `index.html` in your browser, or:
```bash
# If you have Python installed
python -m http.server 8000
# Then visit http://localhost:8000
```

### 4. Add Your API Key
When the app opens, a setup modal appears:
1. Paste your API key
2. Click "Save"
3. Click "Got it! Let's Analyze"

## 📊 Features

✅ **Location Analysis** - Analyze any ZIP code, county, or state
✅ **Interactive Map** - View EJ burden hotspots
✅ **AI Questions** - Ask environmental justice questions
✅ **Data Explorer** - Browse all available datasets
✅ **Dark Mode** - Automatic light/dark theme

## 🔗 Dataset Resources

All these are free and openly accessible:

| Dataset | URL | Format |
|---------|-----|--------|
| EPA EJScreen | https://zenodo.org/records/14767363 | CSV, GeoJSON |
| CDC EJI | https://www.atsdr.cdc.gov/place-health/php/eji/ | CSV, GeoJSON |
| CEJST | https://climateprogramportal.org/resource/climate-and-economic-justice-screening-tool-cejst/ | CSV |
| FEMA NRI | https://www.fema.gov/flood-maps/products-services/national-risk-index | CSV, Shapefile |
| DOE Energy Justice | https://energyjustice.eere.energy.gov/enerjustice/ | CSV |
| CDC SVI | https://www.atsdr.cdc.gov/healthreports/socialsvi/ | CSV, Shapefile |

## 📝 Example Locations to Try

- **90210** - Beverly Hills, CA (low burden)
- **Cook County** - Chicago area (high burden)
- **California** - State-level analysis
- **New York, NY** - City analysis

## 🤖 Example Questions to Ask

- "What is the relationship between air pollution and health outcomes?"
- "How does EJScreen methodology work?"
- "What is environmental justice?"
- "How are disadvantaged communities defined?"

## 🌐 Deploy Online (Free Options)

### GitHub Pages
1. Create GitHub account and repo
2. Upload `index.html` and `app.js`
3. Enable GitHub Pages in Settings
4. Your site is live at `username.github.io/repo-name`

### Render.com
1. Create account at render.com
2. New > Static Site
3. Connect GitHub repo
4. Deploy

### Vercel
1. Visit vercel.com
2. Import your GitHub repo
3. Deploy (automatic)

## 🔐 Security Note

API keys are stored in your browser's localStorage. They never leave your computer. For production, consider:
- Using environment variables
- Backend API proxy
- Server-side key management

## 📞 Support

- EPA EJ Resources: https://www.epa.gov/environmentaljustice
- Justice40 Initiative: https://www.whitehouse.gov/justice40/
- Public Environmental Data Partners: https://www.publicenvironmentaldata.org/

## 📄 License

MIT License - Free to use and modify

## 🎯 Next Steps

1. ✅ Download the files
2. ✅ Get your free API key
3. ✅ Open index.html
4. ✅ Try analyzing a location
5. ✅ Ask the AI some questions
6. ✅ Deploy online (optional)

Enjoy exploring environmental justice data!
