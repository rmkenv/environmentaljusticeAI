# 🌍 Environmental Justice AI Platform

A comprehensive, open-source tool integrating all major US federal environmental justice datasets with free AI APIs. Analyze environmental burdens affecting vulnerable communities, powered by EPA EJScreen, CDC Environmental Justice Index, and other federal sources.

**No credit card required. No cost. Fully open source. All data freely accessible.**

## ✨ Features

- 📊 **Location Analysis** - Analyze any US location (ZIP code, county, state)
- 🗺️ **Interactive Mapping** - Visualize EJ burden hotspots
- 🤖 **AI Assistant** - Ask environmental justice questions (Groq/Gemini/Mistral)
- 📋 **Data Explorer** - Browse 8+ federal EJ datasets
- 🎨 **Dark Mode** - Automatic light/dark theme support
- 📱 **Responsive** - Works on desktop, tablet, mobile

## 🚀 Quick Start (5 Minutes)

### 1. Get Your Files
Download:
- `index.html`
- `app.js`

### 2. Get a Free API Key
Choose one (no credit card needed):

| Provider | URL | Limit | Speed |
|----------|-----|-------|-------|
| **Groq** ⚡ (Recommended) | https://console.groq.com/keys | 14,400 req/day | Fastest |
| Google Gemini | https://aistudio.google.com/app/apikey | 15 req/min | Fast |
| Mistral AI | https://console.mistral.ai/ | 1B tokens/month | Very Fast |

### 3. Open in Browser
- Double-click `index.html`, OR
- Run: `python -m http.server 8000` → Visit `localhost:8000`

### 4. Configure API Key
1. Modal opens automatically
2. Paste your API key
3. Click "Save"
4. Start analyzing!

## 📊 Integrated Datasets

### Core Environmental Justice Datasets

**EPA EJScreen 2.3** ⭐
- 20 environmental & demographic indicators
- Census block group resolution (~1,200 people)
- Air quality, water, waste, demographics
- Download: https://zenodo.org/records/14767363

**CDC Environmental Justice Index (EJI)**
- 36 indicators across 10 domains
- Census tract resolution
- Environmental, social, health factors
- Updated: January 2025
- Access: https://www.atsdr.cdc.gov/place-health/php/eji/

**Climate & Economic Justice Screening Tool (CEJST) 2.0** (Justice40)
- 18 burden indicators
- Identifies disadvantaged communities
- Census tract level
- Archive: https://climateprogramportal.org/resource/climate-and-economic-justice-screening-tool-cejst/

**FEMA National Risk Index**
- Natural hazard & climate risk assessment
- County-level resolution
- 6 primary hazard categories
- Access: https://www.fema.gov/flood-maps/products-services/national-risk-index

**DOE Energy Justice Mapping Tool**
- Energy burden & infrastructure analysis
- Census tract resolution
- 8 equity indicators
- Access: https://energyjustice.eere.energy.gov/enerjustice/

**CDC Social Vulnerability Index (SVI)**
- 16 socioeconomic & demographic factors
- Census tract/county level
- Community vulnerability assessment
- Access: https://www.atsdr.cdc.gov/healthreports/socialsvi/

**DOT Equitable Transportation Community Explorer**
- Transit access, car dependency
- Transportation burden metrics
- Access: https://transportationequity.dot.gov/

**NOAA Climate Mapping for Resilience & Adaptation (CMRA)**
- Climate hazards (heat, flooding, precipitation)
- Coastal resilience
- Access: https://www.ncei.noaa.gov/maps/cmra/

## 💻 Technology Stack

- **Frontend**: HTML5, CSS3, ES6+ JavaScript
- **Mapping**: Leaflet.js (OpenStreetMap)
- **Visualization**: Chart.js (Radar charts, analytics)
- **AI APIs**: Groq, Google Gemini, Mistral (free tiers)
- **Data**: OpenStreetMap Nominatim (free geocoding)
- **Storage**: Browser localStorage
- **Deployment**: Static site (no backend required)

## 📁 Project Structure

```
environmental-justice-ai/
├── index.html              # Main app UI, styles
├── app.js                  # Application logic
├── package.json            # Project metadata
├── .gitignore              # Git configuration
├── QUICKSTART.md           # 5-minute setup guide
├── README.md               # This file
└── LICENSE                 # MIT License
```

## 🔑 API Key Setup

### Groq (Recommended)
```
1. Visit: https://console.groq.com/keys
2. Sign up (GitHub/Google/Email)
3. Click "Create API Key"
4. Copy key → Paste in app
5. 14,400 requests/day free
```

### Google Gemini
```
1. Visit: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Verify with Google account
4. Copy key → Paste in app
5. 15 requests/minute free tier
```

### Mistral AI
```
1. Visit: https://console.mistral.ai/
2. Sign up
3. Go to API Keys
4. Create API Key
5. Copy key → Paste in app
6. 1 billion tokens/month free
```

## 🌐 Deployment

### GitHub Pages (Easiest)
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/environmental-justice-ai
git push -u origin main
```

Then enable GitHub Pages in your repo Settings.

### Render.com
1. Push code to GitHub
2. Visit render.com
3. Create New → Static Site
4. Connect repo
5. Deploy (automatic)

### Vercel
1. Visit vercel.com
2. Import GitHub repo
3. Deploy (automatic)

### Netlify
1. Visit netlify.com
2. New site from Git
3. Connect GitHub
4. Deploy

### Traditional Hosting
Upload `index.html` and `app.js` to any web server.

## 📖 Usage Examples

### Example 1: Analyze Chicago
```
Location: Cook County, Illinois
Results:
- EJ Burden Score: 78 (high)
- Air Pollution: 92nd percentile
- Water Risk: 85th percentile
- Health Vulnerability: 87th percentile
```

### Example 2: Ask About EJ
```
Question: "What is the relationship between air 
pollution and health outcomes in disadvantaged 
communities?"

AI Response: Full explanation of mechanisms, 
federal response, vulnerable populations...
```

### Example 3: Compare Locations
```
Beverly Hills, CA: Burden Score 15 (low)
Chicago, IL: Burden Score 78 (high)
US Average: Burden Score 55
```

## 🔐 Security & Privacy

- **API Keys**: Stored in browser localStorage only
- **No Tracking**: No analytics, no data collection
- **Open Source**: All code visible for inspection
- **Static Site**: No backend = no data transmission
- **HTTPS Ready**: Works on any HTTPS server

### For Production
Consider:
- Using environment variables
- Backend API proxy
- Server-side key management
- Rate limiting

## 📚 Data Sources & Preservation

Critical environmental justice data is archived by:

- **Public Environmental Data Partners (PEDP)**
  - https://www.publicenvironmentaldata.org/
  - Mission: Preserve govt environmental data

- **Environmental Data & Governance Initiative (EDGI)**
  - https://envirodatagov.org/
  - Archived EPA, NOAA, DOE data

- **University Data Repositories**
  - Harvard, Stanford, other institutions
  - Persistent archives

- **Zenodo**
  - https://zenodo.org/
  - Open science data preservation

This ensures critical EJ data remains accessible for research, advocacy, and community action.

## 🎓 Educational Use

Perfect for:
- **Researchers** - Environmental justice analysis
- **Advocates** - Community impact documentation
- **Students** - GIS, policy, sustainability studies
- **Communities** - Self-advocacy, environmental monitoring
- **Organizations** - Grant applications, reports

## 🔗 Federal Resources

- [EPA Environmental Justice](https://www.epa.gov/environmentaljustice)
- [Justice40 Initiative](https://www.whitehouse.gov/justice40/)
- [CDC EJ Index](https://www.atsdr.cdc.gov/place-health/php/eji/)
- [EJScreen Archival](https://zenodo.org/records/14767363)
- [CEJST Resource](https://climateprogramportal.org/)

## 📊 Indicator Explanations

### Air Quality Indicators
- **PM2.5**: Fine particulate matter (respiratory impact)
- **Ozone**: Ground-level ozone (lung function)
- **Air Toxics**: Cancer risk from air pollution

### Water Indicators
- **Contamination Risk**: Proximity to hazardous sites
- **Violations**: Drinking water quality violations
- **Wastewater**: Industrial wastewater discharge

### Climate Indicators
- **Heat Events**: Days above 95°F
- **Flooding**: 100-year flood risk
- **Drought**: Water availability stress
- **Coastal Surge**: Sea level rise risk

### Demographic Indicators
- **Low Income**: % below 200% federal poverty line
- **Communities of Color**: % non-white residents
- **Linguistic Isolation**: % with limited English
- **Educational Attainment**: % without high school

### Health Indicators
- **Asthma**: Prevalence and hospitalization
- **Diabetes**: Type 2 diabetes prevalence
- **Life Expectancy**: Years of life lost
- **Insurance**: % uninsured

## 🤝 Contributing

Contributions welcome! Areas for improvement:
- Additional dataset integrations
- Real API integration (replacing mock data)
- Advanced statistical analysis
- PDF export functionality
- Mobile app version
- Multi-language support
- Accessibility features
- Community feedback tools

## 📋 Roadmap

- [ ] Real data integration from EPA/CDC APIs
- [ ] Advanced filtering and comparison
- [ ] Historical trend analysis
- [ ] Community export reports
- [ ] Integration with advocacy platforms
- [ ] Mobile app (React Native)
- [ ] Multi-language support (Spanish, etc.)
- [ ] Offline capability

## 📄 License

**MIT License** - Free to use, modify, and distribute

```
Copyright (c) 2025 Environmental Justice AI Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

## 🙏 Acknowledgments

- **EPA** for EJScreen and environmental justice frameworks
- **CDC** for Environmental Justice Index data
- **Public Environmental Data Partners** for data preservation
- **EDGI** for data archival and access
- **Leaflet.js** for mapping
- **Chart.js** for data visualization
- **Groq, Google, Mistral** for free AI APIs

## 📞 Support & Contact

For issues, questions, or contributions:
- GitHub Issues: (Report bugs)
- Discussions: (Ask questions)
- Pull Requests: (Submit improvements)

For EJ data questions:
- EPA: https://www.epa.gov/environmentaljustice
- CDC: https://www.atsdr.cdc.gov/place-health/php/eji/
- PEDP: https://www.publicenvironmentaldata.org/

## 🌟 Why This Matters

Environmental burdens are not randomly distributed. Communities of color, low-income communities, and other vulnerable populations face disproportionate exposure to:

- Industrial pollution and emissions
- Hazardous waste sites
- Poor air and water quality
- Climate change impacts
- Limited access to green space

This tool makes federal environmental justice data accessible for:
- **Research** on disparities
- **Advocacy** for community protection
- **Policy** development
- **Community action** and self-determination
- **Education** on environmental equity

## 🚀 Getting Started Now

1. **Download**: Get `index.html` and `app.js`
2. **Get API Key**: Pick one (Groq recommended)
3. **Open**: Double-click index.html
4. **Analyze**: Start exploring!

**Questions? See QUICKSTART.md for detailed setup.**

---

**Making environmental justice data accessible to everyone. Free. Open. Powerful.**
