let enrollmentDeadline = new Date("2026-01-20");

/*
  1.Check if:
      * Today is before deadline → "Enrollment Open"
      * Today is after deadline → "Enrollment Closed"*/
d1=new Date()
if(d1<enrollmentDeadline){
    console.log("Enrollment Open")
}
else{
    console.log("Enrollment Closed")
}
  /* Validate user input date:
      * Input: "2026-02-30"
      * Detect whether the date is valid or invalid*/
let input="2026-02-30"
let d2=new Date(input)
if(!isNaN(d2.getTime()) && d2.toISOString().slice(0,10)===input){
    console.log("Valid date")
}
else{
    console.log("Invalid")
}