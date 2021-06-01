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
        <button id = "add-contact-${user.uid}" class="block mt-4 text-center text-white bg-green-700 rounded px-4 py-2 ">Add Contact</button>
        `)

      // Get reference to add-contact button
      let addContactButton = document.querySelector(`#add-contact-${user.uid}`)

      // Handle the button
      addContactButton.addEventListener(`click`, async function(event){

        // Redirect to the add contact HTML
        document.location.href = `add-contact.html`

      })
      
      // END UPDATE LANDING PAGE TITLE

      // START FIND AND DISPLAY LAGGING TOUCHPOINTS
         
      
          // Build url for API for finding lagging touchpoints
          let laggingUrl = `/.netlify/functions/find_lagging?userId=${user.uid}`

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
            <h1> Lagging Contacts </h1>
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
                  <button id = "add-touchpoint-${laggingContact.contactId}" class="block mt-4 text-white bg-green-400 rounded px-4 py-2 ">Mark Complete</button>
                  <button id = "snooze-${laggingContact.contactId}" class="block mt-4 text-white bg-yellow-400 rounded px-4 py-2 ">Snooze</button>
                  <button id = "retire-${laggingContact.contactId}" class="block mt-4 text-white bg-red-400 rounded px-4 py-2 ">Stop Tracking</button>
              </div>
            </div>
            `
            )

            // Get a reference to the add touchpoint button
            let addTouchpoint = document.querySelector(`#add-touchpoint-${laggingContact.contactId}`)

                //  Handle the button 
                addTouchpoint.addEventListener(`click`, function(event) {
                
                // Prevent default
                event.preventDefault()

                // Redirect to the HTML
                document.location.href = `add-touchpoint.html?contactId=${laggingContact.contactId}&userId=${user.uid}`

            })

            // Get a reference to the snooze button
            let snoozeContact = document.querySelector(`#snooze-${laggingContact.contactId}`)

            // console.log(snoozeContact)

                // Handle the button
                snoozeContact.addEventListener(`click`, async function(event){
                              
                // Prevent default
                event.preventDefault()

                console.log(`${laggingContact.contactId}`)

                // Build URL for retire API
                let snoozeContactUrl = `/.netlify/functions/snooze_contact?contactId=${laggingContact.contactId}`

                // Run API to deactivate contact
                let snoozeResponse = await fetch(snoozeContactUrl)

                // Refresh the page
                location.reload()

                })
            
            // Get a reference to the stop tracking button
            let retireContact = document.querySelector(`#retire-${laggingContact.contactId}`)

            // console.log(retireContact)

                // Handle the button
                retireContact.addEventListener(`click`, async function(event){

                  // Prevent default
                  event.preventDefault()

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
          let upcomingUrl = `/.netlify/functions/find_upcoming?userId=${user.uid}`

          // Fetch the url, wait for a response, store the response in memory
          let upcomingTouchpoints = await fetch(upcomingUrl)
          let upcomingContacts = await upcomingTouchpoints.json()
          // console.log(upcomingContacts)

          // Loop through the lagging contacts to display them
          for (let uc=0; uc < upcomingContacts.length; uc++){

            let upcomingContact = upcomingContacts[uc]
            console.log(upcomingContact)

            // Create element for landing page
            let element = document.querySelector(`.upcoming-contacts`)

            element.insertAdjacentHTML(`beforeend`,`
            <h1> Upcoming Contacts </h1>
            <div class=" p-2 m-8 flex border-2 border-black rounded">
              <div class="p-4 bg-gray-200 rounded w-1/2 text-left">
                <h1 class="rounded-xl underline text-2xl bg-clip-text text-left">
                  <span>${upcomingContact.name}</span>
                </h1>  
                <div class="flex">
                  <div class="w-1/2">
                    <h2 class="text-2xl py-1">📧 ${upcomingContact.email}  ☎️${upcomingContact.phone}</h2>
                    <p class="font-bold text-gray-600">🎂 ${upcomingContact.birthday}</p>
                    <p class="font-bold text-gray-600">⏲️ ${upcomingContact.frequency}</p>
                  </div>
                </div>
                <div class="mt-4 flex">
                  <div>
                    <div class="text-sm font-bold text-gray-600">NOTES</div>
                      <p>📝 ${upcomingContact.notes}</p>      
                    </div>
                  </div>
              </div>
              <div class="m-4 w-1/2 text-right">
                  <h1 class="rounded-xl underline text-2xl bg-clip-text text-left">
                    <span>Actions:</span>
                  </h1>
                  <button id = "add-touchpoint-${upcomingContact.contactId}" class="block mt-4 text-white bg-green-400 rounded px-4 py-2 ">Mark Complete</button>
                  <button id = "snooze-${upcomingContact.contactId}" class="block mt-4 text-white bg-yellow-400 rounded px-4 py-2 ">Snooze</button>
                  <button id = "retire-${upcomingContact.contactId}" class="block mt-4 text-white bg-red-400 rounded px-4 py-2 ">Stop Tracking</button>
              </div>
            </div>
            `
            )

            // Get a reference to the add touchpoint button
            let addTouchpoint = document.querySelector(`#add-touchpoint-${upcomingContact.contactId}`)

                //  Handle the button 
                addTouchpoint.addEventListener(`click`, function(event) {
                
                // Prevent default
                event.preventDefault()

                // Redirect to the HTML
                document.location.href = `add-touchpoint.html?contactId=${upcomingContact.contactId}&userId=${user.uid}`

            })

            // Get a reference to the snooze button
            let snoozeContact = document.querySelector(`#snooze-${upcomingContact.contactId}`)

            // console.log(snoozeContact)

                // Handle the button
                snoozeContact.addEventListener(`click`, async function(event){
                              
                // Prevent default
                event.preventDefault()

                console.log(`${upcomingContact.contactId}`)

                // Build URL for retire API
                let snoozeContactUrl = `/.netlify/functions/snooze_contact?contactId=${upcomingContact.contactId}`

                // Run API to deactivate contact
                let snoozeResponse = await fetch(snoozeContactUrl)

                // Refresh the page
                location.reload()

                })
            
            // Get a reference to the stop tracking button
            let retireContact = document.querySelector(`#retire-${upcomingContact.contactId}`)

            // console.log(retireContact)

                // Handle the button
                retireContact.addEventListener(`click`, async function(event){

                  // Prevent default
                  event.preventDefault()

                  // Build URL for retire API
                  let retireContactUrl = `/.netlify/functions/retire_contact?contactId=${upcomingContact.contactId}`

                  // Run API to deactivate contact
                  let retireResponse = await fetch(retireContactUrl)

                  // Refresh the page
                  location.reload()

                })

            

          }       

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
  