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
        <form class="items-center">
            <label class="block mt-4 font-semibold" for="name">Contact Name</label>
            <input class="p-2 mt-2 w-96 border border-gray-400 rounded focus:outline-none focus:ring-green-700 focus:border-purple-500" type="text" id="name" name="name">

            <label class="block mt-4 font-semibold" for="email">Email</label>
            <input class="p-2 mt-2 w-96 border border-gray-400 rounded focus:outline-none focus:ring-green-700 focus:border-purple-500" type="email" id="email" name="email">

            <label class="block mt-4 font-semibold" for="phone">Phone Number</label>
            <input class="p-2 mt-2 w-96 border border-gray-400 rounded focus:outline-none focus:ring-green-700 focus:border-purple-500" type="tel" id="phone" name="phone">

            <label class="block mt-4 font-semibold" for="birthday">Birthday</label>
            <input class="p-2 mt-2 w-96 border border-gray-400 rounded focus:outline-none focus:ring-green-700 focus:border-purple-500" type="date" id="birthday" name="birthday">
            
            <label class="block mt-4 font-semibold" for="frequency">Touchpoint Frequency</label>
            <select class="p-2 mt-2 w-96 border border-gray-400 rounded focus:outline-none focus:ring-green-700 focus:border-purple-500" type="text" id="frequency" name="frequency">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
            </select>

            <label class="block mt-4 font-semibold" for="notes">Notes</label>
            <input class="p-2 mt-2 w-96 h-52 border border-gray-400 rounded focus:outline-none focus:ring-green-700 focus:border-purple-500" type="text" id="notes" name="notes">

            <button class="block mt-4 text-white bg-green-700 rounded px-4 py-2 add-contact">Add Contact</button>
        </form>`

      // UPDATE LANDING PAGE

      // PROCESS CONTACT CREATION VIA API

        // Get a reference to the Add Contact button
        let addContactButton = document.querySelector(`.add-contact`)
        
        // Add event listener to button
        addContactButton.addEventListener(`click`, async function(event){

            // Ignore default behavior
            event.preventDefault()

            // Get references to form inputs
            let name = document.querySelector(`#name`).value
            let email = document.querySelector(`#email`).value
            let phone = document.querySelector(`#phone`).value
            let birthday = document.querySelector(`#birthday`).value
            let frequency = document.querySelector(`#frequency`).value
            let notes = document.querySelector(`#notes`).value

            // Build url for contacts API
            let url = `/.netlify/functions/create_contact?userId=${user.uid}&name=${name}&email=${email}&phone=${phone}&birthday=${birthday}&frequency=${frequency}&notes=${notes}`

            // Fetch the url, wait for a response, store the response in memory
            let response = await fetch(url)
            console.log(response)

            // 🔥 NOTE TO CONNOR: Tried to display confirmation message w/ below; didn't work :/ 🔥
            // Display return message
            // document.querySelector(`.landing-page`).insertAdjacentHTML(`beforeend`, `
            //   <h1>${toString(response)}</h1>  
            // `)

        })
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
  