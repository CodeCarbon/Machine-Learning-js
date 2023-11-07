const crypto = require('node:crypto');

class DataSet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    linearRegression({ x, y }) {
        let sumX = 0;
        let sumY = 0;
        let sumXY = 0;
        let sumX2 = 0;

        for (let i = 0; i < this.x.length; i++) {
            sumX += this.x[i];
            sumY += this.y[i];
            sumXY += this.x[i] * this.y[i];
            sumX2 += this.x[i] ** 2;
        }

        const denominator = this.x.length * sumX2 - sumX ** 2;
        const m = (this.x.length * sumXY - sumX * sumY) / denominator;
        const c = (sumY * sumX2 - sumX * sumXY) / denominator;

        if (x === undefined) {
            return (y - c) / m;
        } else if (y === undefined) {
            return m * x + c;
        } else {
            throw new Error("Invalid Input");
        }
    }

    linearConfidence() {
        let residuals = 0;
        let meanY = this.y.reduce((acc, cur) => acc + cur, 0) / this.y.length;

        for (let i = 0; i < this.x.length; i++) {
            residuals += (this.y[i] - this.linearRegression({ x: this.x[i] })) ** 2;
        }

        const totalVariation = this.y.reduce((acc, cur) => acc + (cur - meanY) ** 2, 0);
        return 1 - residuals / totalVariation;
    }

    exponentialRegression({ x, y }) {
        // Add implementation here
    }

    logarithmicRegression({ x, y }) {
        // Add implementation here
    }
}

function getResult(gameHash, salt) {
    const hm = crypto.createHmac('sha256', gameHash);
    hm.update(salt);
    const h = hm.digest('hex');

    if (parseInt(h, 16) % 33 === 0) {
        return 1;
    }

    const truncatedH = parseInt(h.slice(0, 13), 16);
    const e = 2 ** 52;
    return Math.ceil(((100 * e - truncatedH) / (e - truncatedH))) / 100.0;
}

function getPreviousGameHashCode(hashCode) {
    return crypto.createHash('sha256').update(hashCode).digest('hex');
}

const salt = '0000000000000000000fa3b65e43e4240d71762a5bf397d5304b2596d116859c';
let gameHash = "100af1b49f5e9f87efc81f838bf9b1f5e38293e5b4cf6d0b366c004e0a8d9987"; // Update to the latest game's hash for more results
const results = [];
const X = [];

for (let i = 0; i <= 100; i++) {
    X.push(i);
    results.push(getResult(gameHash, salt));
    gameHash = getPreviousGameHashCode(gameHash);
}

const data = new DataSet(X, results);
console.log("Prediction:", data.linearRegression({ x: 2 }), "Confidence:", data.linearConfidence());
console.log("Actual:", results[2]);
