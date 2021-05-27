// Allow use of firebase
let firebase = require(`./firebase`)

// For reference: /.netlify/functions/create_contact?userId=${user.uid}&name=${name}&email=${email}&phone=${phone}&birthday=${birthday}&frequency=${frequency}&notes=${notes}

exports.handler = async function(event) {

    // Get the querystring parameters and store in memory
    let userId = event.queryStringParameters.userId
    let name = event.queryStringParameters.name
    let email = event.queryStringParameters.email
    let phone = event.queryStringParameters.phone
    let birthday = event.queryStringParameters.birthday
    let frequency = event.queryStringParameters.frequency
    let notes = event.queryStringParameters.notes
    let lastTouchpoint = firebase.firestore.FieldValue.serverTimestamp()
    let upcomingTouchpoint = lastTouchpoint
    
    if (frequency == "weekly") {
        upcomingTouchpoint = upcomingTouchpoint + 7
    }

    else if (frequency == "monthly") {
        upcomingTouchpoint = upcomingTouchpoint + 30
    }

    else if (frequency == "quarterly") {
        upcomingTouchpoint = upcomingTouchpoint + 90
    }

    else if (frequency == "annually") {
        let upcomingTouchpoint = upcomingTouchpoint + 365
    }

    // Establish a connection to firebase in memory
    let db = firebase.firestore()
    
    // Create a new contact, wait for it to return

    await db.collection(`contacts`).add({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        userId: userId,
        name: name,
        email: email,
        phone: phone,
        birthday: birthday,
        frequency: frequency,
        notes: notes,
        active: true,
        lastTouchpoint: lastTouchpoint,
        upcomingTouchpoint: upcomingTouchpoint
    })

    return {
        statusCode: 200,
        // 🔥 NOTE TO CONNOR: Can't figure out why the string below won't display at the end :/ 🔥
        body: `Contact, ${name}, has been added!`
    }
}