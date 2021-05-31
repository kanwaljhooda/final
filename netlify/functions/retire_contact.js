// Allow use of firebase
let firebase = require(`./firebase`)

// For reference: /.netlify/functions/retrieve_contact_name?contactId=${contactId}`

exports.handler = async function(event) {

    // Get the querystring parameters and store in memory
    let contactId = event.queryStringParameters.contactId
    // console.log(contactId)

    // Establish a connection to firebase in memory
    let db = firebase.firestore()

    await db.collection(`contacts`).doc(contactId).update({
        active: false               
    })

    // Return the standard response
    return {
    statusCode: 200,
    body: JSON.stringify(`contactName`)
    }

}