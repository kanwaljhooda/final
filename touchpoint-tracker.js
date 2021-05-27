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
  
      // UPDATE LANDING PAGE TITLE

      // document.querySelector(`.landing-page-title`).insertAdjacentHTML(`afterbegin`,`
      // <hr>
      // <div class="p-8 text-center space-y-4">
      //   <p class="block mt-4 text-white bg-green-700 rounded px-4 py-2 add-contact">Welcome, ${user.displayName}</p>
      // </div>     
      // `)

      // UPDATE LANDING PAGE TITLE
      
      // FIND AND DISPLAY LAGGING TOUCHPOINTS

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

            element.insertAdjacentHTML(`beforeend`,
            `
            
            <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-500">
              <i class="fas fa-car-side"></i>
              <span>${laggingContact.name}</span>
            </h1>
            
            <div class="border-4 border-purple-500 p-4 my-4 text-left">
              <div class="flex">
                <div class="w-1/2">
                  <h2 class="text-2xl py-1">${laggingContact.email} ${laggingContact.phone}</h2>
                  <p class="font-bold text-gray-600">${laggingContact.birthday}</p>
                </div>
                <div class="w-1/2 text-right">
                  <span class="rounded-xl bg-gray-600 text-white p-2">
                    ${laggingContact.frequency}
                  </span>
                </div>
              </div>
              <div class="mt-4 flex">
                <div>
                  <div class="text-sm font-bold text-gray-600">NOTES</div>
                  <p>${laggingContact.notes}</p>
                  
                </div>
                
              </div>
            </div>`
            )

          }

      // FIND AND DISPLAY LAGGING TOUCHPOINTS

          
      // FIND UPCOMING TOUCHPOINTS

          // Build url for API for finding lagging touchpoints
          // let upcomingUrl = `/.netlify/functions/find_upcoming?userId=${user.uid}`

          // Fetch the url, wait for a response, store the response in memory
          // let upcomingTouchpoints = await fetch(upcomingUrl)

      // FIND UPCOMING TOUCHPOINTS
      
      
      
      
  
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
  