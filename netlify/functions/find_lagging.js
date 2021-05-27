// Allow use of firebase
let firebase = require(`./firebase`)

// For reference: /.netlify/functions/find_lagging?userId=${user.uid}`

exports.handler = async function(event) {

    // Get the querystring parameters and store in memory
    let userId = event.queryStringParameters.userId
    // console.log(userId)

    // Establish a connection to firebase in memory
    let db = firebase.firestore()

    // Set a new array to capture return value
    let returnValue = []
    
    // Retrieve all contacts, wait for it to return
    let contactsQuery = await db.collection(`contacts`).where(`userId`, `==`, userId).get()

    let contacts = contactsQuery.docs
    // console.log(contacts)

    for (let i=0; i < contacts.length; i++) {
        
        // let contactId = contacts[i].id
        let contact = contacts[i].data()

        let name = contact.name
        let email = contact.email
        let phone = contact.phone
        let birthday = contact.birthday
        let frequency = contact.touchpointFrequency
        let notes = contact.notes
        let active = contact.active

        // Create contact object
        let contactObject = {
            name : name,
            email : email,
            phone : phone,
            birthday : birthday,
            frequency : frequency,
            notes : notes,
            active : active
        }

        // Add contact to return value
        returnValue.push(contactObject)
    }

    // Return the standard response
    return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
    }

}