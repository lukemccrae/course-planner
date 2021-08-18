//jim kendall
let timeKendall = [359, 536, 517, 709, 736, 856, 314, 275, 274, 295, 276]
let vertKendall = [159.77690800000164, 584.3176039999998, 485.5643199999995, 886.1548839999996, 823.4908400000004, 500.00001599999996, -688.9763999999996, -828.4121000000014, -792.9790279999997, -441.92914799999926, -654.1994960000011, 5.577428000000509]

let timeBlackSquirrel = [
    375, 431, 419, 575,
    483, 447, 371, 341,
    353, 347, 412, 340,
    373
  ]
  let vertBlackSquirrel = [
      67, 356,  153,  449,
     226, 167, -582, -453,
    -298, -76,  108, -133,
      24
  ]

  let timeChinaCamp = [
    347, 462, 368, 350,
    338, 371, 459, 392,
    414, 365, 337, 364,
    339
  ]
  let vertChinaCamp = [
      -9,  407,  -95, -90,
    -252,  176,  109,  73,
     198, -203, -327,  39,
     -42
  ]

  let timeHellNW = [
    451, 418, 324, 300,
    349, 401, 442, 386,
    360, 422, 375, 401
  ]
  let vertHellNW = [
    289, 203, -243, -236,
    -26, 112,   33, -131,
    190, 390, -161, -390
  ]

  let timePPA = [
    357, 522, 588, 578,
    577, 464, 475, 592,
    670, 746, 655, 712,
    779
  ]
  let vertPPA = [
    207, 600, 669, 607,
    577, 308, 295, 580,
    690, 731, 590, 631,
    659
  ]

  let timeCanyonX = [
    450, 449, 406, 311,
    349, 426, 351, 402,
    398, 385, 550, 331,
    351, 357, 384
  ]
  let vertCanyonX = [
     13,  31,  -39, -217,
    -73,  81, -253,  -94,
    -63,  54,  317,  -52,
      5, 117,  196
  ]

  let timeStampede = [ 440, 515, 395, 380, 332, 292 ]
  let vertStampede = [ 396, 465, -312, 64, -281, -301 ]

  let timeImogen = [
    447, 485, 437, 538,
    632, 606, 778, 817,
    959, 955, 352, 390,
    389, 383, 381, 378
  ]
  let vertImogen = [
     374,  369,   182,  435,
     541,  429,   713,  762,
     857,  597, -1014, -643,
    -519, -436,  -685, -641
  ]

  calculateVertMultiplier(vertKendall, timeKendall)
  calculateVertMultiplier(vertBlackSquirrel, timeBlackSquirrel)
  calculateVertMultiplier(vertChinaCamp, timeChinaCamp)
  calculateVertMultiplier(vertHellNW, timeHellNW)
  calculateVertMultiplier(vertPPA, timePPA)
  calculateVertMultiplier(vertCanyonX, timeCanyonX)
  calculateVertMultiplier(vertStampede, timeStampede)
  calculateVertMultiplier(vertImogen, timeImogen)
//   calculateVertMultiplier()
//   calculateVertMultiplier()

    

// var toHHMMSS = (secs) => {
//     var sec_num = parseInt(secs, 10)
//     var hours   = Math.floor(sec_num / 3600)
//     var minutes = Math.floor(sec_num / 60) % 60
//     var seconds = sec_num % 60

//     return [hours,minutes,seconds]
//         .map(v => v < 10 ? "0" + v : v)
//         .filter((v,i) => v !== "00" || i > 0)
//         .join(":")
// }


function calculateVertMultiplier(vertArr, timeArr) {
    let result = []
    for (let i = 0; i < timeArr.length; i++) {
        let obj= {
            vert: parseFloat(vertArr[i].toFixed(1)),
            vertMod: paceEquation(vertArr[i], i, timeArr)
        }
        result.push(obj)
    }
    for (let i = 0; i < result.length; i++) {
        if(timeArr[i] < 2500) {
            // console.log(result[i].vert,",", result[i].vertMod, timeArr[i])
            console.log(result[i].vert + ", " + result[i].vertMod)
        }
    }
    console.log("")
    return result;
}

function paceEquation(vert, index, timeArr) {
    //7 minute base pace
    let base = 420;
    let terrainMod = 1.1;

    for (let i = -3000; i < 3000; i += .001) {
        //if product makes the equation equal to the timeArr index, push it to the result
        let product = base * Math.pow(terrainMod, (vert / i))
        if(Math.abs(product - timeArr[index]) < .1) {
            return i;
        }
    }
}