const { request } = require('express')
const express = require('express')
const adminfirebase = require('firebase-admin')

const app =  express()
const admin = adminfirebase.initializeApp({
    credential: adminfirebase.credential.cert('./proyecto-daw-eba1d-firebase-adminsdk-wou3o-b71ea1cfcd.json'),
    databaseURL: "https://proyecto-daw-eba1d.firebaseio.com"

})

app.use(express.json())

const listAllUsers = (nextPageToken)=> {
    // List batch of users, 1000 at a time.
    return admin.auth().listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        return listUsersResult.users
      })
      .catch((error) => {
        console.log('Error listing users:', error);
      });
  }

app.get('/users',(request, response)=>{
    
    const users = listAllUsers().then((data)=>{

        response.json(data)
    })
    
})
app.post('/deleteuser',(request,response)=>{
  console.log(request.body.mail)
})

app.listen(3000,()=>{
    console.log("server hosted in port 3000")
})

