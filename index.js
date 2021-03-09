window.addEventListener('DOMContentLoaded', async function(event) {
  let apiKey = '773ed246f01245a8bd863d1051367936'
  // let db = firebase.firestore()
  // let position = 'QB'
  // let metric = 'FantasyPoints'
  // let sportsDB = await fetch(`https://api.sportsdata.io/v3/nfl/stats/json/SeasonLeagueLeaders/2019REG/${position}/${metric}?key=${apiKey}`)
  // let sportsJson = await sportsDB.json()
  // console.log(sportsJson[0].Name)
})
firebase.auth().onAuthStateChanged(async function(user) {
 
  document.querySelector(".sign-in-or-sign-out").innerHTML = `
  <button class="text-pink-500 underline sign-out">Sign Out</button>
  `
  document.querySelector(".sign-out").addEventListener("click", function(event) {
    console.log("sign out clicked")
    firebase.auth().signOut()
    document.location.href = "index.html"
  })

  if (user) {
    // Signed in
    console.log('signed in')
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
