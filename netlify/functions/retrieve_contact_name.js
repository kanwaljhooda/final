// Allow use of firebase
let firebase = require(`./firebase`)

// For reference: /.netlify/functions/retrieve_contact_name?contactId=${contactId}`

exports.handler = async function(event) {

    // Get the querystring parameters and store in memory
    let contactId = event.queryStringParameters.contactId
    console.log(contactId)

    // Establish a connection to firebase in memory
    let db = firebase.firestore()

    // Set a new array to capture return value
    // let returnValue = []
    
    // Retrieve the contact, wait for it to return
    let contactsQuery = await db.collection(`contacts`)
            .doc(contactId)
            .get()

    let contact = contactsQuery.data()
    // console.log(contacts)

    let contactName = contact.name  
    console.log(contactName)

    // Return the standard response
    return {
    statusCode: 200,
    body: JSON.stringify(contactName)
    }

}