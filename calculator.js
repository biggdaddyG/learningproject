// Standard 700c road bike wheel circumference in feet
const WHEEL_CIRCUMFERENCE_FEET = 6.88; // approximately 2.096 meters

// Product database with prices and purchase links
const PRODUCT_DATA = {
    chainrings: {
        '50,34': {
            name: 'Shimano Ultegra R8000 Compact Chainring Set',
            price: 89.99,
            rating: 4.7,
            link: 'https://www.amazon.com/s?k=Shimano+Ultegra+R8000+50-34+chainring',
            brand: 'Shimano'
        },
        '52,36': {
            name: 'SRAM Force AXS Semi-Compact Chainring Set',
            price: 124.99,
            rating: 4.8,
            link: 'https://www.amazon.com/s?k=SRAM+Force+52-36+chainring',
            brand: 'SRAM'
        },
        '53,39': {
            name: 'Shimano Dura-Ace R9100 Standard Chainring Set',
            price: 149.99,
            rating: 4.9,
            link: 'https://www.amazon.com/s?k=Shimano+Dura-Ace+53-39+chainring',
            brand: 'Shimano'
        },
        '46,30': {
            name: 'Shimano GRX RX600 Sub-Compact Chainring Set',
            price: 79.99,
            rating: 4.6,
            link: 'https://www.amazon.com/s?k=Shimano+GRX+46-30+chainring',
            brand: 'Shimano'
        },
        '48,32': {
            name: 'SRAM Rival AXS Gravel Chainring Set',
            price: 99.99,
            rating: 4.7,
            link: 'https://www.amazon.com/s?k=SRAM+Rival+48-32+gravel+chainring',
            brand: 'SRAM'
        }
    },
    cassettes: {
        '11,12,13,14,15,16,17,19,21,23,25': {
            name: 'Shimano Ultegra R8000 11-25T Cassette',
            price: 69.99,
            rating: 4.7,
            link: 'https://www.amazon.com/s?k=Shimano+Ultegra+11-25+cassette',
            brand: 'Shimano',
            range: '11-25'
        },
        '11,12,13,14,15,16,17,19,21,24,28': {
            name: 'Shimano Ultegra R8000 11-28T Cassette',
            price: 74.99,
            rating: 4.8,
            link: 'https://www.amazon.com/s?k=Shimano+Ultegra+11-28+cassette',
            brand: 'Shimano',
            range: '11-28'
        },
        '11,12,13,14,15,17,19,21,24,27,30': {
            name: 'Shimano Ultegra R8000 11-30T Cassette',
            price: 79.99,
            rating: 4.8,
            link: 'https://www.amazon.com/s?k=Shimano+Ultegra+11-30+cassette',
            brand: 'Shimano',
            range: '11-30'
        },
        '11,12,13,14,15,17,19,21,23,26,30': {
            name: 'SRAM Force 22 XG-1190 11-30T Cassette',
            price: 84.99,
            rating: 4.6,
            link: 'https://www.amazon.com/s?k=SRAM+Force+11-30+cassette',
            brand: 'SRAM',
            range: '11-30'
        },
        '11,12,13,14,16,18,20,22,25,28,32': {
            name: 'Shimano Ultegra R8000 11-32T Cassette',
            price: 84.99,
            rating: 4.7,
            link: 'https://www.amazon.com/s?k=Shimano+Ultegra+11-32+cassette',
            brand: 'Shimano',
            range: '11-32'
        },
        '11,12,13,14,16,18,20,22,25,29,34': {
            name: 'Shimano Ultegra R8000 11-34T Cassette',
            price: 89.99,
            rating: 4.8,
            link: 'https://www.amazon.com/s?k=Shimano+Ultegra+11-34+cassette',
            brand: 'Shimano',
            range: '11-34'
        },
        '11,13,15,17,19,21,23,25': {
            name: 'Shimano CS-HG50 8-Speed 11-25T Cassette',
            price: 34.99,
            rating: 4.5,
            link: 'https://www.amazon.com/s?k=Shimano+8-speed+11-25+cassette',
            brand: 'Shimano',
            range: '11-25'
        },
        '11,13,15,17,19,21,24,28': {
            name: 'Shimano CS-HG50 8-Speed 11-28T Cassette',
            price: 36.99,
            rating: 4.5,
            link: 'https://www.amazon.com/s?k=Shimano+8-speed+11-28+cassette',
            brand: 'Shimano',
            range: '11-28'
        }
    }
};

// Get DOM elements
const chainringSelect = document.getElementById('chainring');
const cassetteSelect = document.getElementById('cassette');
const resultsDiv = document.getElementById('results');
const productRecommendationsDiv = document.getElementById('product-recommendations');

// Sound effect function
function playBooyah() {
    // Use Web Speech API for "booyah" sound
    const utterance = new SpeechSynthesisUtterance('booyah');
    utterance.rate = 1.2; // Slightly faster for excitement
    utterance.pitch = 1.2; // Higher pitch for enthusiasm
    utterance.volume = 0.8;
    speechSynthesis.speak(utterance);
}

// Add event listeners with sound effect
chainringSelect.addEventListener('change', () => {
    playBooyah();
    calculateGears();
});

cassetteSelect.addEventListener('change', () => {
    playBooyah();
    calculateGears();
});

function calculateGears() {
    const chainringValue = chainringSelect.value;
    const cassetteValue = cassetteSelect.value;

    // Display product recommendations if either is selected
    displayProductRecommendations(chainringValue, cassetteValue);

    // Check if both selections are made
    if (!chainringValue || !cassetteValue) {
        resultsDiv.innerHTML = '<p class="instruction">Please select both a chainring and cassette package to see gear ratios.</p>';
        return;
    }

    // Parse the selections
    const chainrings = chainringValue.split(',').map(Number);
    const cassetteCogs = cassetteValue.split(',').map(Number);

    // Generate the gear table
    displayGearTable(chainrings, cassetteCogs);
}

function displayProductRecommendations(chainringValue, cassetteValue) {
    if (!chainringValue && !cassetteValue) {
        productRecommendationsDiv.innerHTML = '';
        return;
    }

    let html = '<div class="product-section">';
    html += '<h2>Recommended Products</h2>';
    html += '<div class="product-cards">';

    // Show chainring product if selected
    if (chainringValue && PRODUCT_DATA.chainrings[chainringValue]) {
        const product = PRODUCT_DATA.chainrings[chainringValue];
        html += generateProductCard(product, 'Chainring');
    }

    // Show cassette product if selected
    if (cassetteValue && PRODUCT_DATA.cassettes[cassetteValue]) {
        const product = PRODUCT_DATA.cassettes[cassetteValue];
        html += generateProductCard(product, 'Cassette');
    }

    html += '</div></div>';
    productRecommendationsDiv.innerHTML = html;
}

function generateProductCard(product, type) {
    const stars = generateStarRating(product.rating);

    return `
        <div class="product-card">
            <div class="product-badge">${type}</div>
            <div class="product-brand">${product.brand}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
                <span class="stars">${stars}</span>
                <span class="rating-number">${product.rating}/5.0</span>
            </div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <a href="${product.link}" target="_blank" rel="noopener noreferrer" class="buy-button">
                View on Amazon →
            </a>
        </div>
    `;
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '⯨';
    stars += '☆'.repeat(emptyStars);

    return stars;
}

function displayGearTable(chainrings, cassetteCogs) {
    let html = '<div class="gear-table-container">';
    html += '<table class="gear-table">';
    html += '<thead><tr>';
    html += '<th class="chainring-header">Chainring / Cassette</th>';

    // Header row with cassette cogs
    cassetteCogs.forEach(cog => {
        html += `<th>${cog}t</th>`;
    });
    html += '</tr></thead><tbody>';

    // Store all ratios for summary statistics
    const allRatios = [];
    const allDistances = [];

    // Rows for each chainring
    chainrings.forEach(chainring => {
        html += '<tr>';
        html += `<th class="chainring-header">${chainring}t</th>`;

        cassetteCogs.forEach(cog => {
            const ratio = chainring / cog;
            const distance = ratio * WHEEL_CIRCUMFERENCE_FEET;

            allRatios.push(ratio);
            allDistances.push(distance);

            html += '<td>';
            html += `<div class="ratio">${ratio.toFixed(2)}</div>`;
            html += `<div class="distance">${distance.toFixed(2)} ft</div>`;
            html += '</td>';
        });

        html += '</tr>';
    });

    html += '</tbody></table></div>';

    // Add summary statistics
    html += generateSummary(chainrings, cassetteCogs, allRatios, allDistances);

    resultsDiv.innerHTML = html;
}

function generateSummary(chainrings, cassetteCogs, allRatios, allDistances) {
    const maxRatio = Math.max(...allRatios);
    const minRatio = Math.min(...allRatios);
    const maxDistance = Math.max(...allDistances);
    const minDistance = Math.min(...allDistances);
    const gearRange = ((maxRatio / minRatio - 1) * 100);

    // Find which combination gives max and min
    const maxChainring = Math.max(...chainrings);
    const minChainring = Math.min(...chainrings);
    const minCassette = Math.min(...cassetteCogs);
    const maxCassette = Math.max(...cassetteCogs);

    let html = '<div class="summary">';
    html += '<h3>Gear Summary</h3>';
    html += '<div class="summary-grid">';

    html += '<div class="summary-item">';
    html += '<strong>Highest Gear</strong>';
    html += `${maxChainring}t / ${minCassette}t<br>`;
    html += `Ratio: ${maxRatio.toFixed(2)}<br>`;
    html += `${maxDistance.toFixed(2)} ft/stroke`;
    html += '</div>';

    html += '<div class="summary-item">';
    html += '<strong>Lowest Gear</strong>';
    html += `${minChainring}t / ${maxCassette}t<br>`;
    html += `Ratio: ${minRatio.toFixed(2)}<br>`;
    html += `${minDistance.toFixed(2)} ft/stroke`;
    html += '</div>';

    html += '<div class="summary-item">';
    html += '<strong>Gear Range</strong>';
    html += `${gearRange.toFixed(1)}%<br>`;
    html += `Total Combinations: ${allRatios.length}`;
    html += '</div>';

    html += '<div class="summary-item">';
    html += '<strong>Wheel Specification</strong>';
    html += `700c Road Wheel<br>`;
    html += `Circumference: ${WHEEL_CIRCUMFERENCE_FEET.toFixed(2)} ft<br>`;
    html += `(${(WHEEL_CIRCUMFERENCE_FEET * 0.3048).toFixed(2)} m)`;
    html += '</div>';

    html += '</div></div>';

    return html;
}

// Optional: Calculate on page load if there are default values
document.addEventListener('DOMContentLoaded', () => {
    console.log('Bike Gear Calculator loaded successfully');
});
