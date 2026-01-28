
// Assignment 3: Age Calculator (Intermediate)
// -------------------------------------------
// Input:
//     let dob = "2000-05-15";


// Tasks:
//         1. Calculate exact age in years

let today=new Date()
let dob = "2004-01-11";
let birthdob=new Date(dob)
let age=today.getFullYear()-birthdob.getFullYear()
month=today.getMonth()-birthdob.getMonth()
if(month<0 || month === 0 && today.getDate()<birthdob.getDate() ){
    age--
}
console.log(age)


