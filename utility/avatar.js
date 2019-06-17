const fs = require('fs'),
    PNG = require('pngjs').PNG;

const gridWidth = 16;
const gridHeight = 16;

const scale = 4;

const rules = [
    function cycleMiddle(squares){
        return squares.map(({x,y,z}) => {
            if (x < 4 || x >= 12 || y < 4 || y >= 12) {
                return {x,y,z}
            } else {
                return {
                    x,
                    y,
                    z: true
                }
            }
        })
    },
    function purgeMiddle(squares){
        return squares.map(({x,y,z}) => {
            if (x < 4 || x >= 12 || y < 4 || y >= 12) {
                return {x,y,z}
            } else {
                return {
                    x,
                    y,
                    z: false
                }
            }
        })
    },
    function cycleMiddleSm(squares){
        return squares.map(({x,y,z}) => {
            if (x < 6 || x >= 10 || y < 6 || y >= 10) {
                return {x,y,z}
            } else {
                return {
                    x,
                    y,
                    z: true
                }
            }
        })
    },
    function cycleCorners(squares){
        return squares.map(({x,y,z}) => {
            if (
                !(x < 3 && y < 3) &&
                !(x < 3 && y > 12) &&
                !(x > 12 && y < 3) &&
                !(x > 12 && y > 12)
            ) {
                return {x,y,z}
            } else {
                return {
                    x,
                    y,
                    z: !z
                }
            }
        })
    },
    function disperseInkLateral(squares){
        const newSquares = squares.map((square) => ({... square}));
        squares.forEach(({x,y,z}) => {
            if (z) {

                let b = newSquares.find((square) => square.x === x-1 && square.y === y);
                if (b) b.z = true;

                let c = newSquares.find((square) => square.x === x+1 && square.y === y);
                if (c) c.z = true;

                let d = newSquares.find((square) => square.x === x && square.y === y + 1);
                if (d) d.z = true;

                let e = newSquares.find((square) => square.x === x && square.y === y - 1);
                if (e) e.z = true;
            }
        });

        squares.forEach(({x,y,z}) => {
            if (z) {
                newSquares.find((square) => square.x === x && square.y === y).z = false;
            }

        });

        return newSquares;
    },
    function disperseInkDiagonal(squares){
        const newSquares = squares.map((square) => ({... square}));
        squares.forEach(({x,y,z}) => {
            if (z) {

                let b = newSquares.find((square) => square.x === x-1 && square.y === y-1);
                if (b) b.z = true;

                let c = newSquares.find((square) => square.x === x+1 && square.y === y+1);
                if (c) c.z = true;

                let d = newSquares.find((square) => square.x === x+1 && square.y === y - 1);
                if (d) d.z = true;

                let e = newSquares.find((square) => square.x === x-1 && square.y === y + 1);
                if (e) e.z = true;
            }
        });

        squares.forEach(({x,y,z}) => {
            if (z) {
                newSquares.find((square) => square.x === x && square.y === y).z = false;
            }

        });

        return newSquares;
    },
    // unattractive
    // function clockwiseShift(squares){
    //     const newSquares = squares.map((square) => ({... square, shifted: false}));
    //
    //     squares.forEach(({x,y,z}) => {
    //         if (z) {
    //
    //             let vx, vy;
    //             if (x <= 8 && y <= 8) {
    //                 vx = 1;
    //                 vy = 0;
    //             }
    //
    //             if (x >= 8 && y <= 8) {
    //                 vx = 0;
    //                 vy = 1;
    //             }
    //
    //             if (x >= 8 && y >= 8) {
    //                 vx = -1;
    //                 vy = 0;
    //             }
    //
    //             if (x <= 8 && y >= 8) {
    //                 vx = 0;
    //                 vy = -1;
    //             }
    //
    //             let b = newSquares.find((square) => square.x === (x+vx) && square.y === (y+vy));
    //             if (b) {
    //                 b.z = true;
    //                 b.shifted = true;
    //             }
    //         }
    //     });
    //     squares.forEach(({x,y,z}) => {
    //         if (z) {
    //             let sq = newSquares.find((square) => square.x === x && square.y === y);
    //             if (!sq.shifted) sq.z = false;
    //         }
    //     });
    //
    //     return newSquares;
    // },
    function stampTriangle(squares) {

        const newSquares = squares.map((square,index) => {
            let includes = [7,8];
            if (square.y > 1) {
                includes.push(6,9);
            }
            if (square.y > 3) {
                includes.push(5,10);
            }

            if (square.y > 5) {
                includes.push(4,11);
            }

            if (square.y > 7) {
                includes.push(3,12);
            }

            if (square.y > 9) {
                includes.push(2,13);
            }

            if (square.y > 11) {
                includes.push(1,14);
            }

            if (square.y > 13) {
                includes.push(0,15);
            }

            if (includes.includes(square.x)) {
                return {...square, z : !square.z}
            } else {
                return {...square};
            }
        });

        return newSquares;
    },
    function purgeSurrounded(squares){
        return squares;
    }
    // counterclockwise shift
    // inverted lateral shift
    // inverted diagonal shift
    // surrounded purge
    // draw x
    // draw +
    // draw T
    // draw =
    // draw triangle

];

let vv = 0;
async function exportPng(squares, defaultColor = [255, 0, 0 ,255] ) {

    const width = 64;
    const height = 64;

    const png = new PNG({
        width,
        height,
        filterType: -1
    });

    for (let y = 0; y < png.height; y++) {
        for (let x = 0; x < png.width; x++) {

            const guide = squares.find((square) => {
                return square.x === ~~(x/4) && square.y === ~~(y/4);
            });

            // const {v} = guide;
            // const color = colors[v % colors.length];

            const color = guide.z ? defaultColor : [255, 255, 255, 255];

            const idx = (png.width * y + x) << 2;
            png.data[idx  ] = color[0];
            png.data[idx+1] = color[1];
            png.data[idx+2] = color[2];
            png.data[idx+3] = color[3];
        }
    }

    console.log("Exporting...");
    png.pack().pipe(fs.createWriteStream(`image/img-${vv++}.png`));
    await new Promise((resolve)=>setTimeout(resolve, 25));
}

// exportPng(squares);

(async function doexport(){
    for (let i = 0; i < 30; i++) {
        let color = [Math.random() * 125, Math.random() * 125, Math.random() * 60, 255];
        let ruleCount = ~~(Math.random() * 6) + 12;
        let ruleSet = [];

        for (let j = 0; j < ruleCount; j++) {
            let rule = rules[~~(rules.length * Math.random())];
            ruleSet.push(rule);
        }




        let squares = [];
        for (let y = 0; y < gridWidth; y++) {
            for (let x = 0; x < gridHeight; x++) {
                squares.push({
                    x,
                    y,
                    z: false
                })
            }
        }

        ruleSet.forEach(rule => {

            // console.log("Applying rule...", rule);
            squares = rule(squares);
        });

        await exportPng(squares,color);
    }
})();
//


// setInterval(()=>{},500);