const ca = -5800.22006;
const cb = -5.516256;
const cc = -0.04864024;
const cd = 0.000041765;
const ce = -0.000000014452;
const cf = 6.5459673;
const Pvap_offset = 0.01;
const Y_offset = 0.62198;
const height_offset = 0.0000225577;
const height_exp = 5.25588;

// comfort zone - humidity
let comfortZoneHumi1 = 40;
let comfortZoneHumi2 = 60;

// Graph axes ranges
let xRange_start = 10;
let xRange_end = 50;
let yRange_start = 0;
let yRange_end = 0.06;


function getBorderString(comfort_zone_xValues1, comfort_zone_yValues1, comfort_zone_xValues2, comfort_zone_yValues2) {
    let str = ' M ' + comfort_zone_xValues1[0] + ' ' + comfort_zone_yValues1[0];

    for (var i = 1; i < comfort_zone_xValues1.length; ++i) {
        str += ' L'
        str += comfort_zone_xValues1[i];
        str += ' '
        str += comfort_zone_yValues1[i];
    }

    for (var i = comfort_zone_xValues2.length - 1; i >= 0; --i) {
        str += ' L'
        str += comfort_zone_xValues2[i];
        str += ' '
        str += comfort_zone_yValues2[i];
    }

    str += ' Z'
    return str;
}

function getLayoutForComfortRegion(comfort_zone_xValues1, comfort_zone_yValues1, comfort_zone_xValues2, comfort_zone_yValues2) {
    let str = getBorderString(comfort_zone_xValues1, comfort_zone_yValues1, comfort_zone_xValues2, comfort_zone_yValues2);

    var layout = {
        title: 'Thermal Comfort Zone',
        xaxis: {
            range: [xRange_start, xRange_end],
            zeroline: false
        },
        yaxis: {
            range: [0, 0.06],
            showgrid: false
        },
        width: 1200,
        height: 700,
        shapes: [
            {
                type: 'path',
                path: str,
                opacity: 0.4,
                fillcolor: 'rgb(93, 164, 214)',
                line: {
                    color: 'rgb(93, 164, 214)'
                }
            }
        ]
    }

    return layout;
}

function calculateY(x, f, h) {
    let tk = x + 273.15;

    var val = ca / tk + cb + cc * tk + cd * Math.pow(tk, 2) + ce * Math.pow(tk, 3) + cf * Math.log(tk)
    var Psat = Math.exp(val);
    var Pvap = Pvap_offset * (f / 100) * Psat;
    var Patm = 1.01325 * Math.pow((1 - height_offset * h), height_exp);

    return (Y_offset * Pvap / (Patm - Pvap));
}

function draw(t, f, h) {
    try {
        // evaluate the expression repeatedly for different values of x
        const xValues = math.range(0, 50, 0.5).toArray()

        const yValues1 = xValues.map((x) => { return calculateY(x, 10, h); });
        const yValues2 = xValues.map((x) => { return calculateY(x, 20, h); });
        const yValues3 = xValues.map((x) => { return calculateY(x, 30, h); });
        const yValues4 = xValues.map((x) => { return calculateY(x, 40, h); });
        const yValues5 = xValues.map((x) => { return calculateY(x, 50, h); });
        const yValues6 = xValues.map((x) => { return calculateY(x, 60, h); });
        const yValues7 = xValues.map((x) => { return calculateY(x, 70, h); });
        const yValues8 = xValues.map((x) => { return calculateY(x, 80, h); });
        const yValues9 = xValues.map((x) => { return calculateY(x, 90, h); });
        const yValues10 = xValues.map((x) => { return calculateY(x, 100, h); });

        const comfort_zone_xValues1 = math.range(22, 25, 0.5).toArray();
        const comfort_zone_xValues2 = math.range(22, 25, 0.5).toArray();
        const comfort_zone_yValues1 = comfort_zone_xValues1.map((x) => { return calculateY(x, comfortZoneHumi1, h); });
        const comfort_zone_yValues2 = comfort_zone_xValues2.map((x) => { return calculateY(x, comfortZoneHumi2, h); });

        // render the plot using plotly
        const trace1 = {
            x: xValues,
            y: yValues1,
            name: 'humidity 10%',
            type: 'scatter'
        }

        const trace2 = {
            x: xValues,
            y: yValues2,
            name: 'humidity 20%',
            type: 'scatter'
        }
        const trace3 = {
            x: xValues,
            y: yValues3,
            name: 'humidity 30%',
            type: 'scatter'
        }
        const trace4 = {
            x: xValues,
            y: yValues4,
            name: 'humidity 40%',
            type: 'scatter'
        }
        const trace5 = {
            x: xValues,
            y: yValues5,
            name: 'humidity 50%',
            type: 'scatter'
        }
        const trace6 = {
            x: xValues,
            y: yValues6,
            name: 'humidity 60%',
            type: 'scatter'
        }
        const trace7 = {
            x: xValues,
            y: yValues7,
            name: 'humidity 70%',
            type: 'scatter'
        }
        const trace8 = {
            x: xValues,
            y: yValues8,
            name: 'humidity 80%',
            type: 'scatter'
        }
        const trace9 = {
            x: xValues,
            y: yValues9,
            name: 'humidity 90%',
            type: 'scatter'
        }
        const trace10 = {
            x: xValues,
            y: yValues10,
            name: 'humidity 100%',
            type: 'scatter'
        }

        const layout = getLayoutForComfortRegion(comfort_zone_xValues1, comfort_zone_yValues1, comfort_zone_xValues2, comfort_zone_yValues2);

        const data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8, trace9, trace10]
        Plotly.newPlot('plot', data, layout)
    } catch (err) {
        console.error(err)
        alert(err)
    }
}