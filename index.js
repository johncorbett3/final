let db = firebase.firestore()
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
 

  if (user) {
    // Signed in
    console.log('signed in')
    document.querySelector('.football').insertAdjacentHTML('beforeend', `
    <h1 class = "uppercase m-4 text-center text-5xl font-bold text-blue-700">Welcome To Fantasy Team Builder!</h1>
    <img src="https://wallpapercave.com/wp/wp6491651.jpg" alt=""></img>
    
    <div class="flex">
      <div class="block text-center text-green-500 text-3xl w-1/5 m-4 px-4 py-2 rounded">Position: </div>
      <a href="#" class="QB-button block text-center text-white bg-green-500 w-1/5 m-4 px-4 py-4 rounded">QB</a>
      <a href="#" class="RB-button block text-center text-white bg-green-500 w-1/5 m-4 px-4 py-4 rounded">RB</a>
      <a href="#" class="WR-button block text-center text-white bg-green-500 w-1/5 m-4 px-4 py-4 rounded">WR</a>
      <a href="#" class="TE-button block text-center text-white bg-green-500 w-1/5 m-4 px-4 py-4 rounded">TE</a>
    </div>


    `)

    document.querySelector(".sign-in-or-sign-out").innerHTML = `
    <button class="text-pink-500 underline sign-out">Sign Out</button>
    `
    document.querySelector(".sign-out").addEventListener("click", function(event) {
      console.log("sign out clicked")
      firebase.auth().signOut()
      document.location.href = "index.html"
    })
    db.collection('footballUsers').doc(user.uid).set({
      Id: user.uid,
      name: user.displayName,
      email: user.email      
    })
  } else {
    // Signed out
    console.log('signed out')
    document.querySelector('.football').classList.add('Nothing')
    

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
