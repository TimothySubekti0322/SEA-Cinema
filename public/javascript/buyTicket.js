// Get the current date
var today = new Date();

// Get the date 7 days from now
var maxDate = new Date();
maxDate.setDate(today.getDate() + 7);

// Format the date for the input field
var formattedToday = today.toISOString().split('T')[0];
var formattedMaxDate = maxDate.toISOString().split('T')[0];

// Set the minimal and maximal dates for the input field
document.getElementById("dateInput").min = formattedToday;
document.getElementById("dateInput").max = formattedMaxDate;