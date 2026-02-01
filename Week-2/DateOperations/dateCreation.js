// Assignment 1: Date Creation & Extraction (Beginner)
// ---------------------------------------------------
// Tasks:
//        1. Create a Date object for current date & time.
//        2. Extract and display:
//                     * Year
//                     * Month (human readable)
//                     * Date
//                     * Day of week
//                     * Hours, minutes, seconds

//       3. Display the date in this format:
//                     DD-MM-YYYY HH:mm:ss

// Assignment 1: Date Creation & Extraction (Beginner)

d1=new Date()
console.log(d1.toString())
console.log(d1.getFullYear())
m=d1.getMonth()
m1=new Date(m).toLocaleString('en-US',{month:"long"})
console.log(m1)
console.log(d1.getDate())
console.log(d1.getDay())
console.log(d1.getHours(),d1.getMinutes(),d1.getSeconds())
console.log(d1.getDate(),'-',d1.getMonth(),'-',d1.getFullYear()," ",d1.getHours(),":",d1.getMinutes(),":",d1.getSeconds())