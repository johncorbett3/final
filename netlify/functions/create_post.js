let firebase = require('./firebase')

exports.handler = async function(event) {
    let db = firebase.firestore()
    
let body = JSON.parse(event.body)

let userId = body.userId
    
    let userName = body.userName
    let imageUrl = body.imageUrl

    console.log("post id is ${userName}")
    console.log("post id is ${userId}")  

let newPost = {
    userId: userId,
    username: userName,
    imageUrl: imageUrl,
    created: firebase.firestore.FieldValue.serverTimestamp()

  } // sample only...

  let docRef = await db.collection("posts").add(newPost)

  let postId = docRef.id 

  newPost.postId  = postId

  console.log(newPost)
  
  return {
    statusCode: 200,
    body: JSON.stringify(newPost)
  }
}