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

    // Retrieve and store contact's name
    let contact = contactsQuery.data()
    let contactName = contact.name  
    
    // Return the standard response
    return {
    statusCode: 200,
    body: JSON.stringify(contactName)
    }

}