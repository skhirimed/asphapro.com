/**
 * AsphaPro — Asphalt & Paving Calculation Utilities
 * Standalone module for estimating paving materials and costs.
 * https://asphapro.com
 * MIT License — Mohamed Skhiri
 */

const AsphaltCalculator = {
    // Standard hot-mix asphalt density: 145 lbs per cubic foot
    HMA_DENSITY_LB_CF: 145,
    LBS_PER_TON: 2000,
    CUBIC_FT_PER_YARD: 27,

    /**
     * Calculate tons of asphalt needed.
     * @param {number} lengthFt — project length in feet
     * @param {number} widthFt — project width in feet
     * @param {number} depthIn — asphalt depth in inches
     * @returns {object} { cubicFeet, cubicYards, tons }
     */
    estimateTonnage(lengthFt, widthFt, depthIn) {
        const depthFt = depthIn / 12;
        const cubicFeet = lengthFt * widthFt * depthFt;
        const cubicYards = cubicFeet / this.CUBIC_FT_PER_YARD;
        const weightLbs = cubicFeet * this.HMA_DENSITY_LB_CF;
        const tons = weightLbs / this.LBS_PER_TON;
        return {
            cubicFeet: Math.round(cubicFeet * 100) / 100,
            cubicYards: Math.round(cubicYards * 100) / 100,
            tons: Math.round(tons * 100) / 100
        };
    },

    /**
     * Estimate project cost.
     * @param {number} tons — tons of asphalt
     * @param {number} costPerTon — price per ton (default $100)
     * @param {number} laborPerSqft — labor cost per sqft (default $2)
     * @param {number} areaSqft — total project area in sqft
     * @returns {object} { materialCost, laborCost, totalCost }
     */
    estimateCost(tons, costPerTon = 100, laborPerSqft = 2, areaSqft = 0) {
        const materialCost = tons * costPerTon;
        const laborCost = areaSqft * laborPerSqft;
        return {
            materialCost: Math.round(materialCost),
            laborCost: Math.round(laborCost),
            totalCost: Math.round(materialCost + laborCost)
        };
    }
};

// Example usage
const result = AsphaltCalculator.estimateTonnage(100, 24, 3);
console.log(`Driveway 100x24 ft, 3" deep: ${result.tons} tons needed`);
