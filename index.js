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

const  predication = new DataSet(
    [1,2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,25,26,27,28,29,30],
    [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,290,300]

)
console.log("Predication[x=100]:",predication.LinearRegression({x: 100}),"\nConfident[x=100]",predication.linear_confidence({x: 100}));
