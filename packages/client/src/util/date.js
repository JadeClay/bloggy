function getDate() {
    const date = new Date();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let month = months[date.getMonth()];
    
    let day = date.getDate();
    
    switch (date.getDate()) {
        case 1:
            day += "st"
            break;
        case 2:
            day += "nd"
            break;
        case 3:
            day += "rd"
            break;
        default:
            day += "th"
            break;
    }
    
    let year = date.getFullYear();

    let currentDate = "It's " + month + ' ' + day + ', ' + year ;
    console.log(currentDate);
    
    return currentDate 
}

export default getDate();