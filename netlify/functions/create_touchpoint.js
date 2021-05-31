// Allow use of firebase
let firebase = require(`./firebase`)

// For reference: /.netlify/functions/create_touchpoint?userId=${user.uid}&contactId=${contactId}&date=${date}&method=${method}&notes=${notes}

// Define function for adding days
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

exports.handler = async function(event) {

    // Get the querystring parameters and store in memory
    let userId = event.queryStringParameters.userId
    let contactId = event.queryStringParameters.contactId
    let date = event.queryStringParameters.date
    let method = event.queryStringParameters.method
    let notes = event.queryStringParameters.notes
    
    console.log(date)
    
    let lastTouchpoint = new Date(date)
    let offset = lastTouchpoint.getTimezoneOffset()
    console.log(offset)
    let upcomingTouchpoint = lastTouchpoint

    console.log(upcomingTouchpoint)
    

    // Establish a connection to firebase in memory
    let db = firebase.firestore()
    
    // Create a new contact, wait for it to return

    await db.collection(`touchpoints`).add({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        userId: userId,
        contactId: contactId,
        date: new Date(date),
        method: method,
        notes: notes,        
    })

    let contactRecord = await db.collection(`contacts`).doc(contactId).get()

    let contactInfo = contactRecord.data()
    let frequency = contactInfo.frequency

    console.log(frequency)

    if (frequency == "weekly") {
        upcomingTouchpoint = upcomingTouchpoint.addDays(7)
    }

    else if (frequency == "monthly") {
        upcomingTouchpoint = upcomingTouchpoint.addDays(30)
    }

    else if (frequency == "quarterly") {
        upcomingTouchpoint = upcomingTouchpoint.addDays(90)
    }

    else if (frequency == "annually") {
        upcomingTouchpoint = upcomingTouchpoint.addDays(365)
    }

    console.log(upcomingTouchpoint.toString())

    await db.collection(`contacts`).doc(contactId).update({
        lastTouchpoint: lastTouchpoint.toString(),
        upcomingTouchpoint: upcomingTouchpoint.toString(),        
    })

    return {
        statusCode: 200,
        // 🔥 NOTE TO CONNOR: Can't figure out why the string below won't display at the end :/ 🔥
        // body: `Touchpoint with ${contactInfo.name} on ${date} has been added!`
    }
}

