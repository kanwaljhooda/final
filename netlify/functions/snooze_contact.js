// Allow use of firebase
let firebase = require(`./firebase`)

// For reference: /.netlify/functions/retrieve_contact_name?contactId=${contactId}`

// Define function for adding days
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

exports.handler = async function(event) {

    // Get the querystring parameters and store in memory
    let contactId = event.queryStringParameters.contactId
    console.log(contactId)

    // Establish a connection to firebase in memory
    let db = firebase.firestore()

    // Retrieve the contact record
    let contactsQuery = await db.collection(`contacts`)
            .doc(contactId)
            .get()

    // Retrieve and store contact's frequency and upcoming touchpoint
    let contact = contactsQuery.data()
    let frequency = contact.frequency
    let upcomingTouchpoint = new Date(contact.upcomingTouchpoint)
    // let lastTouchpoint = contact.lastTouchpoint

    // upcomingTouchpoint = upcomingTouchpoint.seconds()
    
    
    // Update stored upcomingTouchpoint based on frequency
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

    // Update record with new upcomingTouchpoint
    await db.collection(`contacts`).doc(contactId).update({
        upcomingTouchpoint: upcomingTouchpoint               
    })

    // Return the standard response
    return {
    statusCode: 200
    }

}