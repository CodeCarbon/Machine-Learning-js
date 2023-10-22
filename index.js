class DataSet {
    x = []
    y = []

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    LinearRegression({x, y}) {
        let _x = 0;
        let _y = 0;
        let _xy = 0
        let _x2 = 0

        for (let i = 0; i < this.x.length-1; i++) {
            _x += this.x[i]
            _y += this.y[i]
            _xy += this.x[i] * this.y[i]
            _x2 += this.x[i] ** 2
        }
        const m = ( (this.x.length * _xy) - (_x * _y) )/ ((this.x.length * _x2) - (_x ** 2))
        const c = ((_y * _x2)-(_x *_xy))/((this.x.length * _x2) - (_x ** 2))
        if (x === undefined) {
            return (y-c)/m
        } else if (y === undefined){
            return (m*x) + c
        } else {
            throw new Error("Invalid Input")
        }
    }
    linear_confidence({x, y}) {
        let residuals = 0;
        let meanY = 0;

        for (let i = 0; i < this.x.length-1; i++) {
            meanY += this.y[i];
            residuals += (this.y[i] - (x !== undefined ? this.LinearRegression({ x: this.x[i] }) : this.y[i])) ** 2;
        }
        meanY /= this.y.length;

        const totalVariation = this.y.reduce((acc, cur) => acc + (cur - meanY) ** 2, 0);
        return 1 - residuals / totalVariation;
    }

    ExponentialRegression({x, y}) {
    }

    LogarithmicRegression({x, y}) {

    }
}



//predication

const crypto = require('node:crypto');
const e = 2 ** 52;
const salt = '0000000000000000000fa3b65e43e4240d71762a5bf397d5304b2596d116859c';

function get_result(game_hash) {
    let hm = crypto.createHmac('sha256', game_hash);
    hm.update(salt);
    let h = hm.digest('hex');
    if (parseInt(h, 16) % 33 === 0) {
        return 1;
    }
    h = parseInt(h.slice(0, 13), 16);
    let e = 2 ** 52;
    return Math.ceil((((100 * e - h) / (e - h)))) / 100.0;
}

function get_prev_game(hash_code) {
    return crypto.createHash('sha256').update(hash_code).digest('hex');
}

var game_hash = "100af1b49f5e9f87efc81f838bf9b1f5e38293e5b4cf6d0b366c004e0a8d9987"; // Update to latest game's hash for more results

var results = [];
var X = [];
for (let i = 0; i<=100; i ++){
    X.push(i)
    results.push(get_result(game_hash));
    game_hash = get_prev_game(game_hash);
}
const data = new DataSet(X, results)
console.log("Predication :", data.LinearRegression({x: 2}),"Confident :", data.linear_confidence({x: 1}))
console.log("Actual :", results[2])