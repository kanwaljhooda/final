firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      // Signed in
      console.log('signed in')
  
      // CODE FOR SIGNING OUT
  
          // Display Sign-out option
          document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
            <button class="text-pink-500 underline sign-out">Sign Out</button>`
  
          // Get a reference to the sign out button
          let signOutButton = document.querySelector(`.sign-out`)
  
          //  Handle the sign out button 
          signOutButton.addEventListener(`click`, function(event) {
            
            // Sign out of firebase authentication
            firebase.auth().signOut()
  
            // Redirect to the home page
            document.location.href = `index.html`
          })     
  
      // CODE FOR SIGNING OUT

      // CODE FOR RETURN TO TRACKER
  
            
          // Get a reference to the sign out button
          let returnToTracker = document.querySelector(`.return-to-tracker`)
  
          //  Handle the sign out button 
          returnToTracker.addEventListener(`click`, function(event) {         
              
            // Redirect to the home page
            document.location.href = `index.html`
            
          })     
  
      // CODE FOR RETURN TO TRACKER
  
      // UPDATE LANDING PAGE

      // imports.handler = async function(event) {
        // let contactId = event.queryStringParameters.contactId
       
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)

      const contactId = urlParams.get('contactId')
      const userId = urlParams.get('userId')

      if (contactId.length > 0) {
      
          let conactRetrievalUrl = `/.netlify/functions/retrieve_contact_name?contactId=${contactId}`

          let contactName = await fetch(conactRetrievalUrl)
                
          let contact = await contactName.text()
          
                  
          document.querySelector(`.landing-page`).innerHTML = `
            <div class="mx-auto">Tell us about your touchpoint with ${contact.replace(/['"]+/g, '')}!<div>
          
            <form>
                <label class="block mt-4 font-semibold" for="date">Touchpoint Date</label>
                <input class="p-2 mt-2 w-96 border border-gray-400 rounded focus:outline-none focus:ring-green-700 focus:border-purple-500" type="date" id="date" name="date">

                <label class="block mt-4 font-semibold" for="method">Method</label>
                <select class="p-2 mt-2 w-96 border border-gray-400 rounded focus:outline-none focus:ring-green-700 focus:border-purple-500" type="text" id="method" name="method">
                    <option value="email">Email</option>
                    <option value="text">Text</option>
                    <option value="phone call">Phone Call</option>
                    <option value="in person">Met in person</option>
                </select>

                <label class="block mt-4 font-semibold" for="commit">Notes</label>
                <input class="p-2 mt-2 w-96 h-52 border border-gray-400 rounded focus:outline-none focus:ring-green-700 focus:border-purple-500" type="text" id="notes" name="notes">

                <button class="block mt-4 text-white bg-green-700 rounded px-4 py-2 add-touchpoint">Add Touchpoint</button>
            </form>`
      }

      else {
        location.replace("/index.html")
      }

      // UPDATE LANDING PAGE

      // PROCESS CONTACT CREATION VIA API

        // Get a reference to the Add Contact button
        let addTouchpointButton = document.querySelector(`.add-touchpoint`)
        
        // Add event listener to button
        addTouchpointButton.addEventListener(`click`, async function(event){

            // Ignore default behavior
            event.preventDefault()

            // Get references to form inputs
            // let name = document.querySelector(`#name`).value
            let date = document.querySelector(`#date`).value
            let method = document.querySelector(`#method`).value
            let notes = document.querySelector(`#notes`).value

            console.log(contactId)

            // Build url for contacts API
            let url = `/.netlify/functions/create_touchpoint?userId=${userId}&contactId=${contactId}&date=${date}&method=${method}&notes=${notes}`

            // Fetch the url, wait for a response, store the response in memory
            let response = await fetch(url)

            // Redirect to home
            location.replace("/index.html")

        })

        // return {
        //   statusCode: 200,
        // }

      // }
      // PROCESS CONTACT CREATION VIA API

  
    } else {
      // Signed out
      console.log('signed out')
  
      // Initializes FirebaseUI Auth
      let ui = new firebaseui.auth.AuthUI(firebase.auth())
  
      // FirebaseUI configuration
      let authUIConfig = {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: 'index.html'
      }
  
      // Starts FirebaseUI Auth
      ui.start('.sign-in-or-sign-out', authUIConfig)
    }
  })
  