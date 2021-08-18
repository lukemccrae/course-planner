//use inspect table right click on strava table

let vert = `-147 ft
-106 ft
-126 ft
-272 ft
227 ft
-292 ft
-35 ft
123 ft
-26 ft
242 ft
33 ft
64 ft
-144 ft
7 ft
27 ft
99 ft
-98 ft
-250 ft
321 ft
-246 ft
86 ft
168 ft
-112 ft
-99 ft
84 ft
-174 ft
-68 ft
123 ft
194 ft
11 ft
-71 ft
-209 ft
82 ft
371 ft
54 ft
-161 ft
179 ft
226 ft
-179 ft
-324 ft
-164 ft
-6 ft
248 ft
-102 ft
-94 ft
70 ft
-104 ft
-164 ft
55 ft
358 ft
-122 ft
47 ft
-283 ft
48 ft
338 ft
164 ft
-113 ft
74 ft
187 ft`

let time = `7:19 /mi
7:27 /mi
7:35 /mi
7:03 /mi
8:30 /mi
6:59 /mi
7:30 /mi
8:00 /mi
7:10 /mi
7:35 /mi
7:41 /mi
7:20 /mi
6:35 /mi
7:21 /mi
7:15 /mi
7:49 /mi
7:14 /mi
7:23 /mi
8:15 /mi
7:42 /mi
7:39 /mi
8:26 /mi
6:55 /mi
6:55 /mi
7:47 /mi
7:12 /mi
7:42 /mi
8:04 /mi
8:53 /mi
7:45 /mi
7:30 /mi
6:58 /mi
7:59 /mi
8:52 /mi
8:02 /mi
7:03 /mi
8:27 /mi
9:06 /mi
7:28 /mi
6:12 /mi
6:15 /mi
7:09 /mi
8:54 /mi
6:58 /mi
7:21 /mi
8:18 /mi
7:50 /mi
8:09 /mi
8:28 /mi
9:59 /mi
7:43 /mi
7:50 /mi
7:04 /mi
7:58 /mi
9:10 /mi
8:38 /mi
7:15 /mi
8:16 /mi
8:46 /mi`

let usableTime = time.split("/mi")
let usableVert = vert.split("ft")


let resultTime = []
let resultVert = []
// for (let i = 0; i < usableTime.length; i++) {
//     let a = usableTime[i].replace(/(\r\n|\n|\r)/gm, "").trim().split(':')
//     var seconds = (+a[0]) * 60 + (+a[1]);
//     resultTime.push(seconds)
// }

for (let i = 0; i < usableTime.length - 1; i++) {
    let a = usableTime[i].replace(/(\r\n|\n|\r)/gm, "").trim().split(':')
    var seconds = (+a[0]) * 60 + (+a[1]);
    resultTime.push(seconds)
}


console.log(resultTime)

for (let i = 0; i < usableVert.length - 1; i++) {
    let a = usableVert[i].replace(/(\r\n|\n|\r)/gm, "").replace(/,/g, '').trim()
    resultVert.push(parseInt(a))
}
console.log(resultVert)