let db = firebase.firestore()

window.addEventListener('DOMContentLoaded', async function(event) {
  

  })

firebase.auth().onAuthStateChanged(async function(user) {
 

  if (user) {
    // Signed in
    let apiKey = '773ed246f01245a8bd863d1051367936'
    console.log('signed in')

    document.querySelector('.football').insertAdjacentHTML('beforeend', `
    <h1 class = "uppercase m-4 text-center text-5xl font-bold text-blue-700">Welcome To Fantasy Team Builder!</h1>

    <img src="https://wallpapercave.com/wp/wp6491651.jpg" alt=""></img>

    `)

    document.querySelector('.resultsTable').insertAdjacentHTML('beforeend', `
    <div class="grid grid-cols-4 grid-rows-1 gap-4 border-2 text-center text-green m-4 p-4">
      <div class="font-bold">Position</div>
      <div class="font-bold">Name</div>
      <div class="font-bold">Team</div>
      <div class="font-bold">Fantasy Points</div>
    </div>
    `)

    document.querySelector('.buttons').insertAdjacentHTML('beforeend', `
    <div class="flex">
      <div class="block text-left text-green-500 text-3xl w-1/5 m-4 px-4 py-2 rounded">Position: </div>
      <a href="#" class="QB-button block text-center text-white bg-green-500 w-1/5 m-4 px-4 py-4 rounded">QB</a>
      <a href="#" class="RB-button block text-center text-white bg-green-500 w-1/5 m-4 px-4 py-4 rounded">RB</a>
      <a href="#" class="WR-button block text-center text-white bg-green-500 w-1/5 m-4 px-4 py-4 rounded">WR</a>
      <a href="#" class="TE-button block text-center text-white bg-green-500 w-1/5 m-4 px-4 py-4 rounded">TE</a>
    </div>

    <div class="flex">
      <div class="block text-left text-green-500 text-3xl w-1/5 m-4 px-4 py-2 rounded">Metric: </div>
      <a href="#" class="FantasyPoints-button block text-center text-white bg-green-500 w-1/5 m-4 px-4 py-4 rounded">Fantasy Points</a>
      <a href="#" class="PassingTouchdowns-button block text-center text-white bg-green-500 w-1/5 m-4 px-4 py-4 rounded">Passing Touchdowns</a>
      <a href="#" class="RushingTouchdowns-button block text-center text-white bg-green-500 w-1/5 m-4 px-4 py-4 rounded">Rushing Touchdowns</a>
      <a href="#" class="ReceivingTouchdowns-button block text-center text-white bg-green-500 w-1/5 m-4 px-4 py-4 rounded">Receiving Touchdowns</a>
      <a href="#" class="PassingYards-button block text-center text-white bg-green-500 w-1/5 m-4 px-4 py-4 rounded">Passing Yards</a>
      <a href="#" class="RushingYards-button block text-center text-white bg-green-500 w-1/5 m-4 px-4 py-4 rounded">Rushing Yards</a>
      <a href="#" class="ReceivingYards-button block text-center text-white bg-green-500 w-1/5 m-4 px-4 py-4 rounded">Receiving Yards</a>
    </div>
    
      <a href="#" class="search-button block text-center text-white bg-green-500 ml-64 mr-64 px-4 py-4 rounded">Go! (this may take a minute...)</a>
    `)

    let positions = ["QB", "RB", "WR", "TE"]
    for (let i=0; i<positions.length; i++) { 

    document.querySelector(`.${positions[i]}-button`).addEventListener('click', async function(event) {
      event.preventDefault()
      document.querySelector(`.${positions[i]}-button`).classList.add('opacity-20')
      let currentUser = firebase.auth().currentUser
        await db.collection('footballUsers').doc(user.uid).update({
          Position: positions[i]     
        })
      }) 
    }

    let metrics = ["FantasyPoints", "PassingTouchdowns", "RushingTouchdowns", "ReceivingTouchdowns", "PassingYards", "RushingYards", "ReceivingYards"]
    for (let i=0; i<metrics.length; i++) { 

      document.querySelector(`.${metrics[i]}-button`).addEventListener('click', async function(event) {
        event.preventDefault()
        document.querySelector(`.${metrics[i]}-button`).classList.add('opacity-20')
        let currentUser = firebase.auth().currentUser
          await db.collection('footballUsers').doc(user.uid).update({
            Metric: metrics[i]     
          })
        }) 
      }
        document.querySelector(`.search-button`).addEventListener('click', async function(event) {
          event.preventDefault()
          console.log('You clicked the search button')
          let currentUser = firebase.auth().currentUser
          let querySnapshot = await db.collection('footballUsers').doc(user.uid).get() 
          // let searchDoc = querySnapshot.doc(user.uid)
          let searchData = querySnapshot.data()
          let metric = searchData.Metric
          console.log(metric)
          let position = searchData.Position
          console.log(position)
          let sportsDB = await fetch(`https://api.sportsdata.io/v3/nfl/stats/json/SeasonLeagueLeaders/2019REG/${position}/${metric}?key=${apiKey}`)
          let sportsJson = await sportsDB.json()
          console.log(sportsJson[0].Name)
          let resultName = sportsJson[0].Name
          let resultPosition = sportsJson[0].Position
          let resultTeam = sportsJson[0].Team
          let resultFP = sportsJson[0].FantasyPoints
          document.querySelector('.buttons').insertAdjacentHTML('beforeend', `
          <h1 class = "uppercase m-4 text-center text-5xl font-bold text-blue-700">Name: ${resultName}</h1>
          <h1 class = "uppercase m-4 text-center text-2xl font-bold text-blue-700">Position: ${resultPosition}</h1>
          <h1 class = "uppercase m-4 text-center text-2xl font-bold text-blue-700">Team: ${resultTeam}</h1>
          <h1 class = "uppercase m-4 text-center text-2xl font-bold text-blue-700">2019 Fantasy Points: ${resultFP}</h1>
          <a href="#" class="team-button block text-center text-white bg-green-500 ml-64 mr-64 px-4 py-4 rounded">Add to Team</a>
          <a href="#" class="reset-button block text-center text-white bg-green-500 mt-16 ml-64 mr-64 px-4 py-4 rounded">Try Another Search</a>
          `
          )
          
        document.querySelector(`.team-button`).addEventListener('click', async function(event) {
          event.preventDefault()
          
          let currentUser = firebase.auth().currentUser
          let querySnapshot2 = await db.collection('footballUsers').doc(user.uid).get() 
          let userData = querySnapshot2.data()

          if (typeof userData.NumberClicks == 'undefined') {
            let numberOfClicks = 1
            let x = numberOfClicks
            console.log(numberOfClicks)
            await db.collection('footballUsers').doc(user.uid).update({
              NumberClicks: numberOfClicks,
              ["PlayerName" + x]: resultName,
              ["PlayerPosition" + x]: resultPosition,
              ["PlayerTeam" + x]: resultTeam,
              ["PlayerFP" + x]: resultFP   
            })
            }
            
          else {
            numberOfClicks = userData.NumberClicks
            numberOfClicks = numberOfClicks + 1
            x = numberOfClicks
            console.log(numberOfClicks) 
            await db.collection('footballUsers').doc(user.uid).update({
              NumberClicks: numberOfClicks,
              ["PlayerName" + x]: resultName,
              ["PlayerPosition" + x]: resultPosition,
              ["PlayerTeam" + x]: resultTeam,
              ["PlayerFP" + x]: resultFP   
          })
          }

          // Print the details of all the players in the Firestore collection
          for (let i=1; i < (userData.NumberClicks + 2); i++) {
            let currentPlayerPosition = "PlayerPosition" + i
            let currentPlayerName = "PlayerName" + i
            let currentPlayerTeam = "PlayerTeam" + i
            let currentPlayerFP = "PlayerFP" + i
            // console.log(currentPlayerName)
            let positionRequest = `userData.${currentPlayerPosition}`
            let playerNameRequest = `userData.${currentPlayerName}`
            let playerTeamRequest = `userData.${currentPlayerTeam}`
            let playerTeamFP = `userData.${currentPlayerFP}`
            
            console.log(eval(positionRequest)) 
            console.log(eval(playerNameRequest)) 
            console.log(eval(playerTeamRequest)) 
            console.log(eval(playerTeamFP)) 

            console.log(i)

            document.querySelector('.resultsTable').insertAdjacentHTML('beforeend', `
              <div class="grid grid-cols-4 grid-rows-1 gap-4 border-2 text-center text-green  mx-4 px-4">
                <div class="QB1Position">${eval(positionRequest)}</div>
                <div class="QB1Name">${eval(playerNameRequest)}</div>
                <div class="QB1Team">${eval(playerTeamRequest)}</div>
                <div class="QB1FP">${eval(playerTeamFP)}</div>
              </div>
        `)
          }

          // if (userData.Position == "QB") {
      
          //   document.querySelector('.QB1Name').insertAdjacentHTML('beforeend', `
          //   ${userData.PlayerName1}
          //   `)
          //   document.querySelector('.QB1Team').insertAdjacentHTML('beforeend', `
          //   ${userData.PlayerTeam1}
          //   `)
          //   document.querySelector('.QB1FP').insertAdjacentHTML('beforeend', `
          //   ${userData.PlayerFP1}
          //   `)
          
          // } else if (userData.Position == "RB") {

          //   document.querySelector('.RB1Name').insertAdjacentHTML('beforeend', `
          //   ${userData.PlayerName2}
          //   `)
          //   document.querySelector('.RB1Team').insertAdjacentHTML('beforeend', `
          //   ${userData.PlayerTeam2}
          //   `)
          //   document.querySelector('.RB1FP').insertAdjacentHTML('beforeend', `
          //   ${userData.PlayerFP2}
          //   `)

          // } else if (userData.Position == "WR") {

          //   document.querySelector('.WR1Name').insertAdjacentHTML('beforeend', `
          //   ${userData.PlayerName3}
          //   `)
          //   document.querySelector('.WR1Team').insertAdjacentHTML('beforeend', `
          //   ${userData.PlayerTeam3}
          //   `)
          //   document.querySelector('.WR1FP').insertAdjacentHTML('beforeend', `
          //   ${userData.PlayerFP3}
          //   `)

          // } else {

          //   document.querySelector('.TE1Name').insertAdjacentHTML('beforeend', `
          //   ${userData.PlayerName4}
          //   `)
          //   document.querySelector('.TE1Team').insertAdjacentHTML('beforeend', `
          //   ${userData.PlayerTeam4}
          //   `)
          //   document.querySelector('.TE1FP').insertAdjacentHTML('beforeend', `
          //   ${userData.PlayerP4}
          //   `)

          // }



        })

        document.querySelector(`.reset-button`).addEventListener('click', async function(event) {
          event.preventDefault()
          location.reload();
        })
        }) 
          

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
    }, {merge: true})
  


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
