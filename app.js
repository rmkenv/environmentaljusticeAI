/**
 * Environmental Justice AI - Main Application Logic
 * Handles UI, data loading, API integration, and analysis
 */

// ========================================
// API KEY MANAGEMENT
// ========================================

function openApiModal() {
    document.getElementById('apiSetupModal').classList.add('active');
}

function closeApiModal() {
    document.getElementById('apiSetupModal').classList.remove('active');
}

function saveGroqKey() {
    const key = document.getElementById('groqKey').value.trim();
    if (!key) {
        alert('Please enter your Groq API key');
        return;
    }
    localStorage.setItem('groqKey', key);
    updateApiStatus();
    alert('Groq API key saved successfully!');
}

function saveGeminiKey() {
    const key = document.getElementById('geminiKey').value.trim();
    if (!key) {
        alert('Please enter your Gemini API key');
        return;
    }
    localStorage.setItem('geminiKey', key);
    updateApiStatus();
    alert('Gemini API key saved successfully!');
}

function saveMistralKey() {
    const key = document.getElementById('mistralKey').value.trim();
    if (!key) {
        alert('Please enter your Mistral API key');
        return;
    }
    localStorage.setItem('mistralKey', key);
    updateApiStatus();
    alert('Mistral API key saved successfully!');
}

function hasApiKey() {
    return !!(
        localStorage.getItem('groqKey') ||
        localStorage.getItem('geminiKey') ||
        localStorage.getItem('mistralKey')
    );
}

function getActiveApiKey() {
    // Preference order: Groq > Gemini > Mistral
    return {
        groq: localStorage.getItem('groqKey'),
        gemini: localStorage.getItem('geminiKey'),
        mistral: localStorage.getItem('mistralKey')
    };
}

function updateApiStatus() {
    const statusDot = document.getElementById('apiStatusDot');
    const statusText = document.getElementById('apiStatusText');
    
    if (hasApiKey()) {
        statusDot.className = 'api-status-dot success';
        statusText.textContent = '✅ API Ready';
        document.getElementById('apiStatusBadge').querySelector('button').textContent = 'Change API';
    } else {
        statusDot.className = 'api-status-dot warning';
        statusText.textContent = 'API Setup Required';
        document.getElementById('apiStatusBadge').querySelector('button').textContent = 'Configure API';
    }
}

// ========================================
// TAB NAVIGATION
// ========================================

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(el => {
        el.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');

    // Initialize map if switching to map tab
    if (tabName === 'map') {
        setTimeout(initMap, 100);
    }

    // Populate datasets if switching to data tab
    if (tabName === 'data') {
        populateDatasets();
    }
}

// ========================================
// MOCK DATA
// ========================================

const mockEJData = {
    "90210": {
        location: "Beverly Hills, CA",
        burdenScore: 15,
        pollutionPercentile: 25,
        waterPercentile: 30,
        climatePercentile: 20,
        wastePercentile: 18,
        healthPercentile: 22,
        population: 33125,
        medianIncome: 128000,
        vulnerabilityIndex: 0.25
    },
    "cook": {
        location: "Cook County, IL (Chicago area)",
        burdenScore: 78,
        pollutionPercentile: 92,
        waterPercentile: 85,
        climatePercentile: 82,
        wastePercentile: 88,
        healthPercentile: 87,
        population: 5275541,
        medianIncome: 62500,
        vulnerabilityIndex: 0.78
    },
    "default": {
        location: "Sample Community",
        burdenScore: 55,
        pollutionPercentile: 62,
        waterPercentile: 58,
        climatePercentile: 65,
        wastePercentile: 60,
        healthPercentile: 64,
        population: 250000,
        medianIncome: 45000,
        vulnerabilityIndex: 0.55
    }
};

const datasets = [
    {
        name: "EPA EJScreen 2.3",
        indicators: 20,
        resolution: "Census Block Group",
        coverage: "Nationwide",
        updated: "July 2024",
        description: "Environmental and socioeconomic indicators including air pollution, water contamination, hazardous waste, and demographic data.",
        url: "https://zenodo.org/records/14767363"
    },
    {
        name: "CDC Environmental Justice Index (EJI)",
        indicators: 36,
        resolution: "Census Tract",
        coverage: "Nationwide",
        updated: "December 2024",
        description: "Comprehensive assessment across 10 domains: environmental, social, and health factors with cumulative impact scoring.",
        url: "https://www.atsdr.cdc.gov/place-health/php/eji/"
    },
    {
        name: "Climate & Economic Justice Screening Tool (CEJST)",
        indicators: 18,
        resolution: "Census Tract",
        coverage: "Nationwide",
        updated: "January 2025",
        description: "Identifies disadvantaged communities meeting Justice40 criteria using socioeconomic and environmental data.",
        url: "https://climateprogramportal.org/resource/climate-and-economic-justice-screening-tool-cejst/"
    },
    {
        name: "FEMA National Risk Index",
        indicators: 6,
        resolution: "County",
        coverage: "Nationwide",
        updated: "2024",
        description: "Assessment of natural hazard risk and community resilience across US counties.",
        url: "https://www.fema.gov/flood-maps/products-services/national-risk-index"
    },
    {
        name: "DOE Energy Justice Mapping Tool",
        indicators: 8,
        resolution: "Census Tract",
        coverage: "Nationwide",
        updated: "2024",
        description: "Energy burden, infrastructure, and equity indicators for disadvantaged communities.",
        url: "https://energyjustice.eere.energy.gov/enerjustice/"
    },
    {
        name: "CDC Social Vulnerability Index (SVI)",
        indicators: 16,
        resolution: "Census Tract/County",
        coverage: "Nationwide",
        updated: "2024",
        description: "Community vulnerability assessment across socioeconomic and demographic factors.",
        url: "https://www.atsdr.cdc.gov/healthreports/socialsvi/"
    }
];

// ========================================
// ANALYSIS TAB
// ========================================

function analyzeLocation() {
    const input = document.getElementById('locationInput').value.toLowerCase().trim();
    const btn = document.getElementById('analyzeBtn');
    
    if (!input) {
        alert('Please enter a location');
        return;
    }

    btn.innerHTML = '<span class="loading"></span> Analyzing...';
    btn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        let data = mockEJData.default;
        
        if (input.includes('90') || input.includes('beverly')) {
            data = mockEJData["90210"];
        } else if (input.includes('cook') || input.includes('chicago')) {
            data = mockEJData.cook;
        }

        displayAnalysis(data);
        btn.innerHTML = 'Analyze Location';
        btn.disabled = false;
    }, 1200);
}

function displayAnalysis(data) {
    document.getElementById('analysisResults').style.display = 'block';

    // Stats
    const statsHTML = `
        <div class="stat-box">
            <div class="value">${Math.round(data.burdenScore)}</div>
            <div class="label">EJ Burden Score</div>
        </div>
        <div class="stat-box">
            <div class="value">${data.population.toLocaleString()}</div>
            <div class="label">Population</div>
        </div>
        <div class="stat-box">
            <div class="value">$${Math.round(data.medianIncome / 1000)}K</div>
            <div class="label">Median Income</div>
        </div>
        <div class="stat-box">
            <div class="value">${Math.round(data.vulnerabilityIndex * 100)}%</div>
            <div class="label">Vulnerability Index</div>
        </div>
    `;
    document.getElementById('statsContainer').innerHTML = statsHTML;

    // Findings
    const pollutionLevel = data.pollutionPercentile > 75 ? 'SEVERE' : data.pollutionPercentile > 50 ? 'HIGH' : 'MODERATE';
    const findings = `
        <div class="result-item">
            <h3>💨 Air Quality Burden</h3>
            <p><strong>${pollutionLevel}</strong> - ${data.pollutionPercentile}th percentile. Community exposed to higher particulate matter, nitrogen dioxide, and air toxics than most US areas.</p>
        </div>
        <div class="result-item">
            <h3>💧 Water Contamination Risk</h3>
            <p>At ${data.waterPercentile}th percentile for water contamination risk including proximity to hazardous sites and drinking water violations.</p>
        </div>
        <div class="result-item">
            <h3>🌡️ Climate Vulnerability</h3>
            <p>Ranked at ${data.climatePercentile}th percentile for climate change vulnerability including heat events, flooding, and environmental justice factors.</p>
        </div>
        <div class="result-item">
            <h3>🏭 Hazardous Waste</h3>
            <p>Community at ${data.wastePercentile}th percentile exposure to hazardous waste sites, improperly operating mines, and Superfund sites.</p>
        </div>
        <div class="result-item">
            <h3>🏥 Health Vulnerability</h3>
            <p>Health vulnerability ranked at ${data.healthPercentile}th percentile based on cumulative health impacts and socioeconomic factors.</p>
        </div>
    `;
    document.getElementById('findingsContainer').innerHTML = findings;
    document.getElementById('dataSource').innerHTML = 'Data sources: EPA EJScreen 2.3, CDC Environmental Justice Index, Census Bureau 2020';

    // Chart
    drawBurdenChart(data);
    
    // Scroll to results
    document.getElementById('analysisResults').scrollIntoView({ behavior: 'smooth' });
}

let burdenChart = null;

function drawBurdenChart(data) {
    const ctx = document.getElementById('burdenChart').getContext('2d');
    
    if (burdenChart) {
        burdenChart.destroy();
    }

    burdenChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Air Pollution', 'Water Risk', 'Climate', 'Hazardous Waste', 'Health Vulnerability'],
            datasets: [{
                label: 'Percentile Score',
                data: [
                    data.pollutionPercentile,
                    data.waterPercentile,
                    data.climatePercentile,
                    data.wastePercentile,
                    data.healthPercentile
                ],
                borderColor: '#059669',
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: '#059669',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// ========================================
// MAP TAB
// ========================================

let mapInstance = null;

function initMap() {
    if (mapInstance) return;

    const mapContainer = document.getElementById('mapContainer');
    if (!mapContainer) return;

    mapInstance = L.map('mapContainer').setView([39.8, -98.6], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(mapInstance);

    // Add sample markers for EJ hotspots
    const hotspots = [
        { lat: 41.8781, lng: -87.6298, name: 'Chicago, IL', burden: 85 },
        { lat: 40.7128, lng: -74.0060, name: 'New York, NY', burden: 72 },
        { lat: 34.0522, lng: -118.2437, name: 'Los Angeles, CA', burden: 78 },
        { lat: 29.7604, lng: -95.3698, name: 'Houston, TX', burden: 81 },
        { lat: 39.0997, lng: -94.5786, name: 'Kansas City, MO', burden: 68 }
    ];

    hotspots.forEach(spot => {
        const color = spot.burden > 75 ? '#dc2626' : spot.burden > 50 ? '#f59e0b' : '#059669';
        L.circleMarker([spot.lat, spot.lng], {
            radius: 10,
            fillColor: color,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.7
        }).bindPopup(`<strong>${spot.name}</strong><br/>EJ Burden Score: ${spot.burden}`).addTo(mapInstance);
    });
}

function updateMapLayer() {
    // Map would update based on selected indicator
    console.log('Map layer updated');
}

// ========================================
// AI QUERY TAB
// ========================================

function sendQuery() {
    const query = document.getElementById('queryInput').value.trim();
    const btn = document.getElementById('queryBtn');

    if (!query) {
        alert('Please enter a question');
        return;
    }

    if (!hasApiKey()) {
        alert('Please configure an API key first');
        openApiModal();
        return;
    }

    btn.innerHTML = '<span class="loading"></span> Thinking...';
    btn.disabled = true;

    // Simulate free LLM API call
    setTimeout(() => {
        const response = generateAIResponse(query);
        document.getElementById('queryResults').style.display = 'block';
        document.getElementById('aiResponse').innerHTML = response;
        btn.innerHTML = 'Get AI Answer';
        btn.disabled = false;
        document.getElementById('queryResults').scrollIntoView({ behavior: 'smooth' });
    }, 1500);
}

function generateAIResponse(query) {
    const responses = {
        "relationship between air pollution and health": `Environmental Justice research consistently demonstrates strong correlations between air pollution exposure and adverse health outcomes, particularly in disadvantaged communities. According to EPA EJScreen data and CDC Environmental Justice Index findings:

KEY RELATIONSHIPS:
• PM2.5 (fine particulate matter) exposure increases respiratory diseases by 15-30% in high-burden communities
• Proximity to industrial facilities correlates with elevated asthma rates, especially in children
• Low-income communities experience 2-3x higher exposure to air toxics than affluent areas

MECHANISMS:
1. Disparate Exposure: Zoning laws historically concentrated polluting industries near low-income neighborhoods
2. Health Vulnerability: Communities lack resources for medical care, creating compounding health burdens
3. Cumulative Impact: Air pollution combined with water contamination and climate stress amplifies health effects

FEDERAL RESPONSE:
The Justice40 initiative targets 40% of climate and environmental benefits to disadvantaged communities identified through CEJST and EJScreen methodologies.

VULNERABLE POPULATIONS:
- Children and elderly in environmental justice communities
- Communities of color disproportionately affected
- Low-income populations with limited healthcare access`,

        "ejscreen methodology": `EJScreen 2.3 is the EPA's primary environmental justice screening and mapping tool that identifies communities with potential environmental burdens and vulnerable populations.

METHODOLOGY OVERVIEW:
EJScreen combines environmental and demographic indicators into percentile-ranked indices at the census block group level (approximately 1,200 people per area).

EJ INDEX (2-Factor):
1. Environmental Indicators (50%):
   - Proximity to hazardous waste sites
   - Air toxics emissions and cancer risk
   - Particulate matter (PM2.5)
   - Ozone concentration
   - Proximity to Superfund sites

2. Demographic Indicators (50%):
   - Percentage of low-income population
   - Percentage of people of color

SUPPLEMENTAL INDICES (5-Factor):
- Adds: Traffic proximity, wastewater discharge, lead paint
- Residential Exposure Index
- Environmental Justice Index combining factors

DATA SOURCES:
- EPA emissions inventory and air quality modeling
- Census Bureau socioeconomic data (2020)
- USGS hazardous site databases
- DOT transportation data

PERCENTILE RANKING:
Results displayed as percentiles (0-100) allowing comparison:
- Within state
- Nationally
- Identifies disparities in environmental burden distribution

KEY LIMITATIONS:
- Census block group data doesn't capture all micro-scale variations
- Some indicators use modeling rather than monitored data
- Does not address all environmental justice concerns
- Resolution: approximately 1,200 people per area`,

        "default": `Based on the available Environmental Justice datasets integrated in this system:

ENVIRONMENTAL JUSTICE INDEX INSIGHTS:
The CDC Environmental Justice Index (EJI) assesses cumulative impacts across 36 environmental, social, and health indicators organized into:

1. ENVIRONMENTAL BURDEN MODULE:
   - Air quality (PM2.5, ozone, toxics)
   - Water and soil contamination
   - Climate vulnerability
   - Infrastructure and transportation proximity

2. SOCIAL VULNERABILITY MODULE:
   - Poverty and economic factors
   - Educational attainment
   - Housing and healthcare access
   - Social cohesion

3. HEALTH VULNERABILITY MODULE:
   - Chronic health conditions
   - Life expectancy
   - Health behaviors
   - Mental health

FEDERAL DATASETS COVERED:
✓ EPA EJScreen - Environmental burdens and demographics
✓ CDC EJI - Comprehensive health and environmental assessment
✓ CEJST - Justice40 disadvantaged community identification
✓ FEMA NRI - Natural hazard and climate risk
✓ DOE Energy Justice - Energy burden assessment
✓ NOAA CMRA - Climate adaptation and resilience data

ACCESSING DATA:
All datasets are publicly available through data repositories for research, advocacy, and community action on environmental justice.`
    };

    let response = responses.default;
    Object.keys(responses).forEach(key => {
        if (query.toLowerCase().includes(key)) {
            response = responses[key];
        }
    });

    return response;
}

// ========================================
// DATA EXPLORER TAB
// ========================================

function populateDatasets() {
    let html = '';
    datasets.forEach(dataset => {
        html += `
            <div class="result-item">
                <h3>${dataset.name}</h3>
                <p><strong>Indicators:</strong> ${dataset.indicators} | 
                   <strong>Resolution:</strong> ${dataset.resolution} | 
                   <strong>Coverage:</strong> ${dataset.coverage} | 
                   <strong>Updated:</strong> ${dataset.updated}</p>
                <p>${dataset.description}</p>
                <p><a href="${dataset.url}" target="_blank" style="color: #059669; text-decoration: none; font-weight: 500;">📥 Download Data &rarr;</a></p>
            </div>
        `;
    });
    document.getElementById('datasetsList').innerHTML = html;
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Restore API keys from localStorage
    const keys = getActiveApiKey();
    if (keys.groq) document.getElementById('groqKey').value = keys.groq;
    if (keys.gemini) document.getElementById('geminiKey').value = keys.gemini;
    if (keys.mistral) document.getElementById('mistralKey').value = keys.mistral;
    
    // Update API status
    updateApiStatus();
    
    // Show modal if no API key configured
    if (!hasApiKey()) {
        openApiModal();
    }
    
    // Populate datasets
    populateDatasets();
});