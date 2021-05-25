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

    // CODE FOR ROUTING TO 2 USER OPTIONS
    
        // Display the two main options

        document.querySelector(`.main-options`).innerHTML = `
          <button class="text-pink-500 underline touchpoint-tracker">Track Touchpoints</button>
          
          <button class="text-pink-500 underline contact-manager">Manage Contacts</button>
          `
        
        // Get a reference for the Touchpoint Tracker button
        let touchpointTrackerButton = document.querySelector(`.touchpoint-tracker`)


        // Handle the Touchpoint Tracker button
        touchpointTrackerButton.addEventListener(`click`, async function(event){

          // Redirect to the tracker page
          document.location.href = `tracker.html`

        })
        
        // Get a reference for the Contact Manager button
        let contactManagerButton = document.querySelector(`.contact-manager`)

        // Handle the Touchpoint Tracker button

        contactManagerButton.addEventListener(`click`, async function(event){

          // Redirect to the tracker page
          document.location.href = `contact.html`

        })

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
