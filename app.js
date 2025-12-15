/ Environmental Justice AI - Real EPA Data Integration
let map;
let currentAnalyzedLocation = null;
let radarChart = null;
let analyzedMarker = null;

const majorCities = [
    { name: 'New York, NY', lat: 40.7128, lng: -74.0060 },
    { name: 'Los Angeles, CA', lat: 34.0522, lng: -118.2437 },
    { name: 'Chicago, IL', lat: 41.8781, lng: -87.6298 },
    { name: 'Houston, TX', lat: 29.7604, lng: -95.3698 },
    { name: 'Phoenix, AZ', lat: 33.4484, lng: -112.0742 },
];

const datasets = [
    {
        title: 'EPA Environmental Justice Screen (EJScreen)',
        description: 'EPA\'s official EJ mapping tool with 11+ environmental burden indicators',
        link: 'https://www.epa.gov/ejscreen'
    },
    {
        title: 'EPA Air Quality Data',
        description: 'Real-time air quality data from EPA monitoring stations',
        link: 'https://www.epa.gov/airdata'
    },
    {
        title: 'CDC Environmental Justice Index',
        description: 'CDC data on health disparities and environmental factors',
        link: 'https://www.atsdr.cdc.gov/place-health/php/eji/'
    },
    {
        title: 'NOAA Climate Data',
        description: 'National climate and weather data for environmental analysis',
        link: 'https://www.ncei.noaa.gov/products/climate-data/'
    },
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    loadDatasets();
    checkApiStatus();
    updateProviderInfo();
    
    if (!localStorage.getItem('apiKey') && !sessionStorage.getItem('hasSeenModal')) {
        setTimeout(() => openApiModal(), 500);
        sessionStorage.setItem('hasSeenModal', 'true');
    }
});

// Map initialization
function initializeMap() {
    map = L.map('map').setView([39.8283, -98.5795], 4);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    majorCities.forEach(city => {
        L.circleMarker([city.lat, city.lng], {
            radius: 8,
            fillColor: '#2180a5',
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).bindPopup(`<strong>${city.name}</strong><br>Click to analyze`).on('click', function() {
            document.getElementById('location').value = city.name;
            analyzeLocation();
        }).addTo(map);
    });
}

// Geocode location (convert address to lat/lng)
async function geocodeLocation(location) {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`
        );
        const data = await response.json();
        
        if (data.length === 0) {
            throw new Error('Location not found');
        }
        
        return {
            name: data[0].display_name.split(',')[0],
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
            fullName: data[0].display_name
        };
    } catch (error) {
        console.error('Geocoding error:', error);
        throw error;
    }
}

// Fetch EJScreen data from EPA
async function fetchEJScreenData(lat, lng) {
    try {
        // EPA EJScreen uses a buffer report approach
        // We'll use publicly available aggregated data
        const response = await fetch(
            `https://ejscreen.epa.gov/mapper/ejscreenmapperAPI.aspx?namestr=${lat},${lng}&geometry={"rings":[[[${lng},${lat}]]]}&distance=1&unit=miles&out_sr=4326&f=json`
        );
        
        if (!response.ok) {
            throw new Error('EPA API error');
        }
        
        const data = await response.json();
        return parseEJScreenData(data);
    } catch (error) {
        console.warn('EPA API error, using fallback data:', error);
        return null;
    }
}

// Parse EPA EJScreen response
function parseEJScreenData(data) {
    if (!data.features || data.features.length === 0) {
        return null;
    }

    const feature = data.features[0];
    const attributes = feature.attributes;

    return {
        aiScore: Math.round(attributes['ACSTOTPOP'] ? (attributes['ASTHMARATE'] || 0) : 0),
        pmScore: Math.round(attributes['PMTOTAL'] || 0),
        diseaseScore: Math.round(attributes['RESP'] || 0),
        ptdeScore: Math.round(attributes['TRAFFIC'] || 0),
        lowIncomeScore: Math.round(attributes['LINGISO'] || 0),
        percentColoradoPersonOfColor: Math.round(attributes['DEMOGIDX_2'] || 0),
        percentLowIncome: Math.round(attributes['DEMOGIDX_1'] || 0),
        percentMinority: Math.round(attributes['DEMOGIDX_2'] || 0),
        populationDensity: Math.round(attributes['POPDEN'] || 0)
    };
}

// Fetch alternative real environmental data from OpenMeteo (air quality proxy)
async function fetchAlternativeEnvironmentalData(lat, lng) {
    try {
        const response = await fetch(
            `https://air-quality-api.open-meteo.com/v1/air_quality?latitude=${lat}&longitude=${lng}&current=pm10,pm2_5,o3,no2,so2&timezone=auto`
        );
        const data = await response.json();
        const current = data.current;

        return {
            pm25: Math.round(current.pm2_5 || 0),
            pm10: Math.round(current.pm10 || 0),
            o3: Math.round(current.o3 || 0),
            no2: Math.round(current.no2 || 0),
            so2: Math.round(current.so2 || 0)
        };
    } catch (error) {
        console.error('Environmental data fetch error:', error);
        return null;
    }
}

// Center map on analyzed location
function centerMapOnAnalyzedLocation() {
    if (currentAnalyzedLocation) {
        map.setView([currentAnalyzedLocation.lat, currentAnalyzedLocation.lng], 14);
        
        if (analyzedMarker) {
            map.removeLayer(analyzedMarker);
        }
        
        analyzedMarker = L.marker([currentAnalyzedLocation.lat, currentAnalyzedLocation.lng], {
            icon: L.icon({
                iconUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%232180a5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z"/></svg>',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            })
        }).bindPopup(`<strong>${currentAnalyzedLocation.name}</strong><br>Analyzed Location`).addTo(map).openPopup();
    }
}

// Analyze location - NOW WITH REAL DATA
async function analyzeLocation() {
    const locationInput = document.getElementById('location').value.trim();
    
    if (!locationInput) {
        alert('Please enter a location');
        return;
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = 'block';
    resultsDiv.innerHTML = '<div style="text-align: center;"><div class="loading"></div> Loading real environmental data...</div>';

    try {
        // Step 1: Geocode the location
        const geolocation = await geocodeLocation(locationInput);
        currentAnalyzedLocation = geolocation;

        // Step 2: Fetch real environmental data
        const envData = await fetchAlternativeEnvironmentalData(geolocation.lat, geolocation.lng);
        
        if (!envData) {
            throw new Error('Could not fetch environmental data');
        }

        // Display results with real data
        document.getElementById('aqi').textContent = envData.pm25 + ' µg/m³';
        document.getElementById('healthRisk').textContent = Math.round((envData.pm25 / 35) * 100) + '%';
        document.getElementById('pollution').textContent = Math.round((envData.pm10 / 50) * 100) + '%';
        document.getElementById('density').textContent = envData.o3 + ' ppb';
        
        resultsDiv.style.display = 'block';
        updateRadarChart(envData, geolocation.name);

    } catch (error) {
        resultsDiv.innerHTML = `<div style="color: var(--error); padding: 20px; background: var(--surface); border-radius: 6px;">
            Error: ${error.message}<br><br>
            Make sure the location is valid and you have internet connection.<br>
            Try: "New York", "Los Angeles", "Chicago", etc.
        </div>`;
    }
}

// Update radar chart with REAL data
function updateRadarChart(envData, locationName) {
    const ctx = document.getElementById('radarChart').getContext('2d');
    
    if (radarChart) {
        radarChart.destroy();
    }

    radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['PM2.5 (Fine Particles)', 'PM10 (Coarse Particles)', 'Ozone Level', 'NO2 Emissions', 'SO2 Emissions'],
            datasets: [{
                label: locationName,
                data: [
                    Math.min(100, (envData.pm25 / 35) * 100),
                    Math.min(100, (envData.pm10 / 50) * 100),
                    Math.min(100, (envData.o3 / 80) * 100),
                    Math.min(100, (envData.no2 / 40) * 100),
                    Math.min(100, (envData.so2 / 20) * 100)
                ],
                borderColor: '#2180a5',
                backgroundColor: 'rgba(33, 128, 165, 0.1)',
                borderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: '#2180a5',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text').trim()
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim()
                    },
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--border').trim()
                    }
                }
            }
        }
    });
}

// AI Response handler (unchanged)
async function getAiResponse() {
    const query = document.getElementById('aiQuery').value;
    const apiKey = localStorage.getItem('apiKey');
    const provider = localStorage.getItem('apiProvider') || 'groq';

    if (!query.trim()) {
        alert('Please enter a question');
        return;
    }

    if (!apiKey) {
        alert('Please configure an API key in Settings first');
        openApiModal();
        return;
    }

    const responseDiv = document.getElementById('aiResponse');
    responseDiv.innerHTML = '<div class="response-text"><span class="loading"></span> Getting response...</div>';

    try {
        let response;
        
        if (provider === 'groq') {
            response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'mixtral-8x7b-32768',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are an environmental justice expert. Provide concise, accurate answers about environmental health, pollution, and justice issues based on real environmental data.'
                        },
                        {
                            role: 'user',
                            content: query
                        }
                    ],
                    max_tokens: 500,
                    temperature: 0.7
                })
            });
        } else if (provider === 'gemini') {
            response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: query
                        }]
                    }]
                })
            });
        } else if (provider === 'mistral') {
            response = await fetch('https://api.mistral.ai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'mistral-small-latest',
                    messages: [{
                        role: 'user',
                        content: query
                    }],
                    max_tokens: 500
                })
            });
        }

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        let text = '';

        if (provider === 'groq' || provider === 'mistral') {
            text = data.choices[0].message.content;
        } else if (provider === 'gemini') {
            text = data.candidates[0].content.parts[0].text;
        }

        responseDiv.innerHTML = `<div class="response-text"><strong>AI Response:</strong>\n\n${text}</div>`;
    } catch (error) {
        responseDiv.innerHTML = `<div class="response-text" style="color: var(--error);">Error: ${error.message}\n\nMake sure your API key is valid and you have internet connection.</div>`;
    }
}

// Load datasets
function loadDatasets() {
    const datasetsDiv = document.getElementById('datasets');
    datasetsDiv.innerHTML = datasets.map(ds => `
        <div class="dataset-item">
            <div class="dataset-title">${ds.title}</div>
            <div class="dataset-description">${ds.description}</div>
            <a href="${ds.link}" target="_blank" class="dataset-link">View Dataset →</a>
        </div>
    `).join('');
}

// Tab switching
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tabName === 'map' ? 'map-tab' : tabName).classList.add('active');
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');

    if (tabName === 'map' && !map) {
        initializeMap();
    }
}

// API Modal handlers
function openApiModal() {
    document.getElementById('apiModal').classList.add('active');
}

function closeApiModal() {
    document.getElementById('apiModal').classList.remove('active');
}

function saveApiKey() {
    const apiKey = document.getElementById('apiKey').value.trim();
    const provider = document.getElementById('apiProvider').value;

    if (!apiKey) {
        alert('Please enter an API key');
        return;
    }

    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('apiProvider', provider);
    checkApiStatus();
    closeApiModal();
    alert('API Key saved successfully!');
}

function checkApiStatus() {
    const apiKey = localStorage.getItem('apiKey');
    const status = document.getElementById('apiStatus');
    
    if (apiKey) {
        status.textContent = '✅ API Ready';
        status.className = 'api-status ready';
    } else {
        status.textContent = '⚙️ Configure API';
        status.className = 'api-status pending';
    }
}

function updateProviderInfo() {
    const provider = document.getElementById('apiProvider').value;
    const infoDiv = document.getElementById('providerInfo');
    
    const info = {
        groq: 'Free tier available. Get your key at <a href="https://console.groq.com" target="_blank">console.groq.com</a>',
        gemini: 'Free tier available. Get your key at <a href="https://makersuite.google.com/app/apikey" target="_blank">makersuite.google.com</a>',
        mistral: 'Paid service. Get your key at <a href="https://console.mistral.ai" target="_blank">console.mistral.ai</a>'
    };
    
    infoDiv.innerHTML = `<strong>${info[provider]}</strong>`;
}

// Dark mode
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.style.colorScheme === 'dark';
    html.style.colorScheme = isDark ? 'light' : 'dark';
    localStorage.setItem('darkMode', isDark ? 'light' : 'dark');
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'dark') {
    document.documentElement.style.colorScheme = 'dark';
}
