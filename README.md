# Road Bike Gear Calculator

A web-based calculator that helps cyclists understand their bike's gear ratios and distance traveled per pedal stroke.

## Features

- **Chainring Package Selection**: Choose from common road bike chainring configurations
  - Compact: 50/34
  - Semi-Compact: 52/36
  - Standard: 53/39
  - Sub-Compact: 46/30
  - Gravel: 48/32

- **Cassette Package Selection**: Choose from various cassette configurations
  - 11-25 through 11-34 (11-speed)
  - 11-25 and 11-28 (8-speed)

- **Calculations Provided**:
  - Gear ratio for every chainring/cog combination
  - Distance traveled per pedal stroke in feet
  - Gear range percentage
  - Highest and lowest gear information

## Technical Details

- **Wheel Specification**: Standard 700c road bike wheel
- **Wheel Circumference**: 6.88 feet (2.096 meters)
- **Gear Ratio Formula**: Chainring teeth ÷ Cassette cog teeth
- **Distance Formula**: Gear ratio × Wheel circumference

## Usage

1. Open `index.html` in a web browser
2. Select a chainring package from the dropdown
3. Select a cassette package from the dropdown
4. View the complete gear ratio table with distance per pedal stroke
5. Check the summary section for key statistics

## Files

- `index.html` - Main application structure
- `styles.css` - Styling and responsive design
- `calculator.js` - Gear calculation logic
- `README.md` - This documentation file

## How to Run

Simply open the `index.html` file in any modern web browser. No server or build process required.

## Understanding the Results

Each cell in the table shows:
- **Top number**: Gear ratio (e.g., 3.85 means the wheel rotates 3.85 times per pedal revolution)
- **Bottom number**: Distance in feet traveled per complete pedal stroke

Higher gear ratios are better for speed on flat terrain, while lower ratios are better for climbing.
