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

    // UPDATE LANDING PAGE

    document.querySelector(`.landing-page`).innerHTML = `
      <div class="md:w-1/2 m-auto md:p-16">
        <img class="rounded-xl" src="assets/what-would-you-like-to-do.jpg">
      </div>
      <div class="md:w-1/2 p-8 space-y-4">
        <button class="block mt-4 text-white bg-green-700 rounded px-4 py-2 touchpoint-tracker">View Touchpoint Tracker</button>
        <p>See upcoming touchpoints to continue building relationships</p>
        <button class="block mt-4 text-white bg-green-700 rounded px-4 py-2 add-contact">Add Contact(s)</button>
        <p>Yay for new friends!</p>
        <button class="block mt-4 text-white bg-green-700 rounded px-4 py-2 edit-contact">View and Edit Contact(s)</button>
        <p>Relationships evolve and so must we</p>
      </div>
          `
    // UPDATE LANDING PAGE
    
    // CODE FOR DIRECTING TO APPROPRIATE HTMLS

        // TOUCHPOINT TRACKER PAGE

            // Get a reference to the button
            let touchpointTrackerButton = document.querySelector(`.touchpoint-tracker`)

            //  Handle the button 
            touchpointTrackerButton.addEventListener(`click`, function(event) {
              
              // Redirect to the HTML
              document.location.href = `touchpoint-tracker.html`

            })     

        // TOUCHPOINT TRACKER PAGE

        // ADD CONTACT PAGE

            // Get a reference to the button
            let addContactButton = document.querySelector(`.add-contact`)

            //  Handle the button 
            addContactButton.addEventListener(`click`, function(event) {
              
              // Redirect to the HTML
              document.location.href = `add-contact.html`

            }) 

        // ADD CONTACT PAGE

        // EDIT CONTACT PAGE

            // Get a reference to the button
            let editContactButton = document.querySelector(`.edit-contact`)

            //  Handle the button 
            editContactButton.addEventListener(`click`, function(event) {
              
              // Redirect to the HTML
              document.location.href = `edit-contact.html`

            })

        // EDIT CONTACT PAGE

    // CODE FOR DIRECTING TO APPROPRIATE HTMLS

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
