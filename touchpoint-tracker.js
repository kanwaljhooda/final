firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      // Signed in
      console.log('signed in')
  
      // START CODE FOR SIGNING OUT
  
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
  
      // END CODE FOR SIGNING OUT
  
      // START UPDATE LANDING PAGE TITLE

      document.querySelector(`.landing-page-title`).insertAdjacentHTML(`afterbegin`,`
        <h1 class="text-center w-1/2 mx-auto capitalize font-bold text-4xl text-white bg-green-700 rounded px-4 py-2">
          Hey, ${user.displayName}! <br> Welcome to the Contact Tracker
        </h1>
        <h2 class="m-10 text-xl">
          Below you will find the contacts that are next up (as well as those that you're behind on!)
          Check out your notes and their contact info, reach out, and click the corresponding button to update your tracker!
        </h2>
        `)

      // END UPDATE LANDING PAGE TITLE

      // START FIND AND DISPLAY LAGGING TOUCHPOINTS

          // Build url for API for finding lagging touchpoints
          let laggingUrl = `/.netlify/functions/retrieve_contacts?userId=${user.uid}`

          // Fetch the url, wait for a response, store the response in memory
          let laggingTouchpoints = await fetch(laggingUrl)
          let laggingContacts = await laggingTouchpoints.json()
          // console.log(laggingContacts)

          // Loop through the lagging contacts to display them
          for (let lc=0; lc < laggingContacts.length; lc++){

            let laggingContact = laggingContacts[lc]
            console.log(laggingContact)

            // Create element for landing page
            let element = document.querySelector(`.lagging-contacts`)

            element.insertAdjacentHTML(`beforeend`,`
            <div class=" p-2 m-8 flex border-2 border-black rounded">
              <div class="p-4 bg-gray-200 rounded w-1/2 text-left">
                <h1 class="rounded-xl underline text-2xl bg-clip-text text-left">
                  <span>${laggingContact.name}</span>
                </h1>  
                <div class="flex">
                  <div class="w-1/2">
                    <h2 class="text-2xl py-1">📧 ${laggingContact.email}  ☎️${laggingContact.phone}</h2>
                    <p class="font-bold text-gray-600">🎂 ${laggingContact.birthday}</p>
                    <p class="font-bold text-gray-600">⏲️ ${laggingContact.frequency}</p>
                  </div>
                </div>
                <div class="mt-4 flex">
                  <div>
                    <div class="text-sm font-bold text-gray-600">NOTES</div>
                      <p>📝 ${laggingContact.notes}</p>      
                    </div>
                  </div>
              </div>
              <div class="m-4 w-1/2 text-right">
                  <h1 class="rounded-xl underline text-2xl bg-clip-text text-left">
                    <span>Actions:</span>
                  </h1>
                  <button id = "add-touchpoint-${laggingContact.contactId}" class="block mt-4 text-white bg-green-700 rounded px-4 py-2 ">Add Touchpoint</button>
                  <button id = "retire-${laggingContact.contactId}" class="block mt-4 text-white bg-red-700 rounded px-4 py-2 ">Stop Tracking</button>
              </div>
            </div>
            `
            )

            // Get a reference to the add touchpoint button
            let addTouchpoint = document.querySelector(`#add-touchpoint-${laggingContact.contactId}`)

                //  Handle the button 
                addTouchpoint.addEventListener(`click`, function(event) {
                
                console.log(laggingContact.contactId)
                console.log(user.uid)
                
                  // Redirect to the HTML
                document.location.href = `add-touchpoint.html?contactId=${laggingContact.contactId}&userId=${user.uid}`

            })

            // Get a reference to the stop tracking button
            let retireContact = document.querySelector(`#retire-${laggingContact.contactId}`)

                // Handle the button
                retireContact.addEventListener(`click`, async function(event){

                  // Build URL for retire API
                  let retireContactUrl = `/.netlify/functions/retire_contact?contactId=${laggingContact.contactId}`

                  // Run API to deactivate contact
                  let retireResponse = await fetch(retireContactUrl)

                  // Refresh the page
                  location.reload()

                })


          }

          

      // END FIND AND DISPLAY LAGGING TOUCHPOINTS

          
      // START FIND UPCOMING TOUCHPOINTS

          // Build url for API for finding lagging touchpoints
          // let upcomingUrl = `/.netlify/functions/find_upcoming?userId=${user.uid}`

          // Fetch the url, wait for a response, store the response in memory
          // let upcomingTouchpoints = await fetch(upcomingUrl)

      // END FIND UPCOMING TOUCHPOINTS
      
      
      
      
  
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
  