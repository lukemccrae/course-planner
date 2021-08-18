let vert = -545;

function findVertModGeneral(vert){
    return 0.180081 * vert - 0.000116526 * Math.pow(vert, 2) + (7.6735 * Math.pow(10, -9)) * Math.pow(vert, 3) + (3.8076 * Math.pow(10, -11)) * Math.pow(vert, 4) - (1.993 * Math.pow(10, -14)) * Math.pow(vert, 5)
}

let base = 500;
let pace = base * (Math.pow(1.1, vert === 0 ? 1 : vert / findVertMod50kHalf(vert))).toFixed(2);


var toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10)
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
}
console.log(toHHMMSS(pace))


function findVertModFkt(vert){
    const b1 = 0.15006;
    const b2 = 0.0000539868;
    const b3 = -6.3067 * Math.pow(10, -8);
    const b4 = 2.1199 * Math.pow(10, -11);
    const b5 = 1.5448 * Math.pow(10, -14);
    return b1 * vert + b2 * Math.pow(vert, 2) + b3 * Math.pow(vert, 3) + b4 * Math.pow(vert, 4) + b5 * Math.pow(vert, 5);
}

function findVertMod100Miler(vert){
    const b1 = 0.254349;
    const b2 = -0.0000954112;
    const b3 = 7.7005 * Math.pow(10, -8);
    const b4 = -3.0641 * Math.pow(10, -10);
    const b5 = -5.537 * Math.pow(10, -14);
    const b6 = 1.8391 * Math.pow(10, -16)
    return b1 * vert + b2 * Math.pow(vert, 2) + b3 * Math.pow(vert, 3) + b4 * Math.pow(vert, 4) + b5 * Math.pow(vert, 5) + b6 * Math.pow(vert, 6);
}

function findVertMod50k(vert){
    const b1 = 0.254349;
    const b2 = -0.0000954112;
    const b3 = 7.7005 * Math.pow(10, -8);
    const b4 = -3.0641 * Math.pow(10, -10);
    const b5 = -5.537 * Math.pow(10, -14);
    const b6 = 1.8391 * Math.pow(10, -16)
    return b1 * vert + b2 * Math.pow(vert, 2) + b3 * Math.pow(vert, 3) + b4 * Math.pow(vert, 4) + b5 * Math.pow(vert, 5) + b6 * Math.pow(vert, 6);
}


function findVertMod50kHalf(vert){
    const b1 = 0.475321;
    const b2 = -0.000151214;
    const b3 = -0.00000117482;
    const b4 = 7.1606 * Math.pow(10, -10);
    const b5 = 3.9401 * Math.pow(10, -13);
    return b1 * vert + b2 * Math.pow(vert, 2) + b3 * Math.pow(vert, 3) + b4 * Math.pow(vert, 4) + b5 * Math.pow(vert, 5);
}
