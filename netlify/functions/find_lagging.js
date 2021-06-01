// Allow use of firebase
let firebase = require(`./firebase`)

// For reference: /.netlify/functions/retrieve_contacts?userId=${user.uid}`

exports.handler = async function(event) {

    // Get the querystring parameters and store in memory
    let userId = event.queryStringParameters.userId
    // console.log(userId)

    // Establish a connection to firebase in memory
    let db = firebase.firestore()

    // Set a new array to capture return value
    let returnValue = []
    
    // Retrieve all contacts, wait for it to return
    let contactsQuery = await db.collection(`contacts`)
            .where(`userId`, `==`, userId)
            .where(`active`,`==`, true)
            // .orderBy(`name`) ---> TRIED TO ORDER CONTACTS BY NAME BUT DIDN'T WORK
            .get()

    let contacts = contactsQuery.docs
    // console.log(contacts)

    let today = new Date()
    today = today.toLocaleString()
    console.log(today)

    for (let i=0; i < contacts.length; i++) {
        
        // let contactId = contacts[i].id
        let contact = contacts[i].data()

        let contactId = contacts[i].id
        let name = contact.name
        let email = contact.email
        let phone = contact.phone
        let birthday = contact.birthday
        let frequency = contact.frequency
        let notes = contact.notes
        let active = contact.active
        let upcomingTouchpoint = contact.upcomingTouchpoint

        console.log(upcomingTouchpoint)

        if (upcomingTouchpoint < today) {

            // Create contact object
            let contactObject = {
                contactId: contactId,
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
    }

    // Return the standard response
    return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
    }

}