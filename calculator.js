// Standard 700c road bike wheel circumference in feet
const WHEEL_CIRCUMFERENCE_FEET = 6.88; // approximately 2.096 meters

// Get DOM elements
const chainringSelect = document.getElementById('chainring');
const cassetteSelect = document.getElementById('cassette');
const resultsDiv = document.getElementById('results');

// Add event listeners
chainringSelect.addEventListener('change', calculateGears);
cassetteSelect.addEventListener('change', calculateGears);

function calculateGears() {
    const chainringValue = chainringSelect.value;
    const cassetteValue = cassetteSelect.value;

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
