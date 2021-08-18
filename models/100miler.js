//francois hard rock
let vertHR = [129.265096000001, 99.0813679999992, 213.2546000000002, 549.2126160000007, 732.9396559999986, 703.412096, 1150.2625040000003, -1085.9580399999995, -1288.0577840000005, 570.209992, 937.6640720000014, 862.8609199999992, 17.716535999998086, -263.12336799999866, -755.2493679999989, 465.22311199999785, -627.2966079999987, -220.47244800000044, -42.65092000000004, -48.556431999999404, 216.53543999999965, 148.9501360000013, 511.15487199999916, -215.2231040000006, -38.71391200000107, -484.90815199999815, -578.7401760000012, -809.7113119999995, -510.49870399999963, 409.44883200000004, 140.41995199999837, 102.36220800000228, 261.8110319999978, 743.438344000002, 681.1023839999998, 936.3517360000005, 804.4619679999996, -976.3779840000007, 67.58530400000018, -688.9763999999996, -1003.9370400000007, -202.0997439999992, 471.78479199999856, 322.1784880000014, 366.7979119999982, 617.4540880000004, -93.17585599999984, -759.1863759999997, -607.6115680000003, -566.9291520000006, -606.2992319999994, -475.0656319999998, -721.1286319999999, -622.0472640000007, -309.05512799999906, -219.81628, 223.09712000000036, 337.9265199999991, 200.13124000000062, 390.41995999999926, 488.84516000000076, 464.56694400000015, 596.4567120000011, 251.96851199999765, 410.1050000000014, 625.3281039999983, 1024.2782480000023, -482.28348000000005, -1225.0656560000007, -1028.2152560000013, -727.6903119999988, -397.6378080000013, 391.73229600000013, 401.5748160000003, 847.1128879999997, 988.1890080000012, 660.1050080000005, 814.304487999998, -605.6430639999999, -1135.1706399999985, -1007.2178800000002, 316.2729760000002, 759.8425439999992, 504.5931920000003, 535.4330879999998, -977.6903199999997, -309.05512799999997, -430.4462080000012, 665.3543520000021, 24.934383999998317, 883.8582960000003, 394.35696800000005, -532.8084159999999, -710.6299440000003, -574.8031680000004, -589.8950320000004, -414.04200799999853, -284.7769120000012, -139.10761599999933, -70.86614399999962]
let timeHR = [
    508, 584, 631, 710, 871, 881, 1330, 606, 570, 1054, 1158,
    1121, 872, 719, 589, 925, 499, 510, 541, 678, 657, 571,
    899, 541, 548, 522, 596, 534, 570, 800, 557, 544, 726,
    1055, 999, 1182, 1300, 620, 881, 673, 503, 746, 816, 717,
    822, 993, 751, 468, 579, 534, 545, 516, 546, 610, 577,
    460, 958, 732, 627, 750, 825, 775, 892, 689, 856, 966,
    1390, 957, 567, 527, 504, 1025, 759, 916, 1152, 1299, 1114,
    1303, 924, 592, 551, 1097, 1089, 1176, 1557, 571, 765, 594,
    1284, 796, 1324, 1149, 673, 686, 672, 677, 535, 662, 631,
    732
]

//western states 2021
let timeWS = [
    638, 730, 674, 673, 496, 566, 573, 445, 419, 415, 465, 565,
    498, 450, 557, 497, 458, 441, 510, 447, 523, 455, 422, 417,
    488, 440, 473, 565, 562, 555, 523, 353, 361, 423, 408, 413,
    395, 363, 514, 408, 399, 406, 425, 409, 392, 460, 724, 882,
    449, 392, 404, 413, 452, 778, 606, 626, 482, 562, 420, 559,
    624, 488, 642, 391, 479, 491, 527, 443, 514, 529, 511, 425,
    435, 683, 462, 505, 510, 425, 783, 634, 828, 533, 525, 570,
    448, 553, 491, 536, 483, 453, 467, 734, 524, 799, 665, 993,
    521, 527, 635, 719]
let vertWS = [
     594,  699,  568,  226, -280, -340, -197,  -57, -309, -236,   60,
     270,   23, -232,  131,  114, -140, -243,   19, -192,  123,  -45,
    -437, -415,  -66,  -99, -189,  363,  362,  318,  263, -400, -243,
      51, -280,  -28, -180, -436, -301, -251,  -18,  -14,  -22, -186,
    -556, -942,  597,  808,  -77, -448, -669, -324, -823,  726,  465,
     474, -164,  346, -297, -607,  414,  102, -226, -461, -614,  -37,
     134,  -71,   86,  156, -490, -554, -174,  105, -112,  -18,  119,
    -174,  274,  398, -213,   31,  -49,  400,   23, -110,  -90,  102,
      -3, -120, -152, -381,   43,  439,  249,  -98, -381, -332,  106,
     375]

let timeUTMB = [
    358, 390, 429, 415,  386,  601,  872,  688,  485,  426,  476,
    508, 489, 470, 587,  540,  563,  649,  514,  436,  460,  762,
    629, 882, 872, 998,  857,  492,  463,  299,  295,  409,  544,
    662, 591, 756, 975,  983,  499,  415,  474,  522, 1132,  766,
    500, 461, 457, 656,  421,  569,  938, 1493,  607,  599,  651,
    612, 786, 690, 597,  693, 1047, 1368,  810,  553,  559,  708,
    582, 434, 452, 445,  444,  422,  450,  464,  769, 1000,  647,
    513, 525, 539, 825, 1286, 1039,  651,  532,  555,  587, 1043,
    1417, 726, 500, 466,  487,  576,  669,  550, 1114,  728,  890,
    1209
]
let vertUTMB = [
    -56,  -30,   -95,  -39,  -36,  568, 1053,   656,   236, -1024,
    -899, -833,  -177,   52,  223,  207,  157,   239,    98,    79,
    164,  738,   361,  814,  679,  889,  440,  -833, -1047,  -607,
    -436,  -52,   262,  571,  151,  617,  850,   833,  -682,  -436,
    -577,   85,  1066,   59, -446, -574, -745, -1421,  -469,   312,
    787, 1325,   -10,   59,    3, -184,  276,   144,  -151,  -650,
    758, 1280,   -43, -548, -761, -217, -850,  -230,  -236,  -190,
    -315, -466,  -249, -233,  344,  650,  200,   -10,  -259,  -131,
    627,  935,   577, -499, -702, -348, -748,   850,  1234,   108,
    -745, -673, -1001,  138,  338,  108,  892,  -679,   361,   968
]

let timeHighLonesome = [
    424,  426, 425,  528,  768,  447,  459,  563,  681, 857,  821,
    991,  941, 977,  652,  408,  531,  439,  420,  437, 458,  617,
    545,  596, 619,  640,  966,  915,  996,  825,  538, 518, 1220,
   1348, 1302, 493,  498,  497,  925,  656,  730,  788, 954, 1010,
    816, 1016, 744,  532,  525,  559, 1265, 1067, 1216, 778,  716,
    657,  963, 811,  923, 1031, 1296, 1485,  994,  619, 571,  626,
    873,  647, 614, 1037,  582,  489,  473,  500,  496, 494,  753,
    965,  742, 794,  771,  653,  865,  949, 1001,  822, 707,  637,
    784,  861, 900,  820,  660,  721,  677, 1034,  845, 557,  622,
    684
 ]
 let vertHighLonesome = [
   -221,  -19,   70,  317,  510, -252,   23,   33,  477,  706,  493,
    728,  698,  722,   84, -512, -783, -764, -469, -422, -588,  219,
    117,  168,  243,   -2,  697,  535,  610, -176, -843, -671,  532,
    813,  547, -741, -402, -849,  105,  224,  231,  278,  330,  464,
    174,  235, -205, -520, -201, -196,  203,  394,  453, -746, -206,
   -311, -133,  -89,   75,  369,  635,  732,   51, -475, -326, -181,
     35, -106, -135,  217, -596, -599, -364, -267, -242, -409, -269,
    492,   81,  170,  206, -336,  -84,  444,   92,  246, -148, -272,
     95,   72, -246, -177, -427,  -45,  -22,  270, -555, -292,  -66,
     32
 ]

let timeLeadville = [
    399, 422, 413, 440, 435, 530, 494,  462,  473,  490,  513,
    511, 552, 589, 671, 525, 605, 494,  428,  403,  429,  437,
    419, 511, 452, 464, 504, 454, 517,  541,  505,  506,  616,
    649, 588, 499, 533, 559, 518, 631, 1054, 1071, 1039, 1126,
    485, 617, 604, 763, 617, 478, 757,  601,  569,  817, 1443,
   1295, 706, 493, 520, 498, 577, 596,  980,  843,  865,  634,
    619, 467, 499, 495, 507, 488, 625,  517,  477,  525,  646,
    524, 543, 864, 817, 780, 499, 506,  443,  592,  632,  521,
    593, 623, 610, 588, 578, 584, 548,  496,  591,  557,  589
 ]
 let vertLeadville = [
   -153, -154,  -87,  -51,    8,   189,   -4,    1,    2,   10,
     -1,   -4,  160,   27,  341,   216,  373,  -16, -268, -534,
   -492,  -17, -141,  -31,  -26,    84,   89,  -15,  144,   94,
    110,   74,  291,  158,   52,  -408, -371, -553,  -13,  123,
    886,  818,  751,  606, -891, -1174, -209,  289,   75, -240,
    232,  -53, -298,  209, 1160,   908, -599, -743, -865, -883,
   -102,   18,  562,  389,  370,   -45, -157, -307,  -75, -101,
   -104, -128,   13,  -98,  -76,    37,   31,  133,   57,  505,
    497,  315,  -86, -371, -195,  -308,  -68, -145,   11,    0,
      6,  -12,    2,    2, -192,   -26,   81,  100,  157
 ]

 let timeThunderRock = [
    628, 515, 534,  524,  460,  670, 576,  491, 478, 518, 507,
    554, 661, 623,  619,  545,  530, 505,  504, 553, 471, 467,
    558, 644, 473,  497,  556,  532, 462,  467, 694, 721, 620,
    634, 641, 781, 1018,  551,  525, 480,  638, 491, 521, 727,
    487, 453, 464,  954,  529,  570, 627,  772, 519, 489, 464,
    473, 755, 509,  616,  519,  518, 562,  828, 496, 532, 652,
    718, 678, 793,  673,  574,  981, 665,  634, 688, 721, 679,
    636, 617, 687, 2029, 1028, 1072, 854, 1023, 514, 531, 678,
    652, 783, 544,  469,  475,  516, 469,  974, 491, 529, 672,
    637
  ]
  let vertThunderRock = [
     333,   49,  -73,   15, -365,  349,   15,   19,  -47,  145,   39,
     239,  465, -387, -562,   49,  107,  -63, -237, -357,  -86,  -78,
     147, -214,   51,  -23,   49,   -5,   24,   36,   -4,  107,  -27,
      16,   99,  117,  388,    0,  -40, -422,  464, -472,  153,  -45,
    -158, -147,  136, -113,   81,  278,  406,  304,  116, -201, -173,
    -133,  169,  -42,  373, -178, -106,  163,  -55, -206,  -15,  335,
     232,  -89,   27, -104, -122,  -93,   50, -124,  -17,  -46,  -14,
    -436, -396, -198,  203,  646,  809,  412,    0, -444, -432,  -69,
     304,  405, -325, -292,    1,  164, -112, -141, -148, -112,  281,
    -494
  ]

  calculateVertMultiplier(vertThunderRock, timeThunderRock)
  calculateVertMultiplier(vertLeadville, timeLeadville)
  calculateVertMultiplier(vertHighLonesome, timeHighLonesome)
  calculateVertMultiplier(vertUTMB, timeUTMB)
  calculateVertMultiplier(vertWS, timeWS)
  calculateVertMultiplier(vertHR, timeHR)




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
            let obj = {
                vert: parseFloat(vertArr[i].toFixed(1)),
                vertMod: paceEquation(vertArr[i], i, timeArr)
            }
            result.push(obj)
        }
        for (let i = 0; i < result.length; i++) {
            if (timeArr[i] < 2500) {
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
        if (Math.abs(product - timeArr[index]) < .1) {
            return i;
        }
    }
}