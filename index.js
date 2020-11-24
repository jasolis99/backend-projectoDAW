const { request, response } = require('express')
const express = require('express')
const adminfirebase = require('firebase-admin')

const app =  express()


const port = process.env.PORT || 3000;

const admin = adminfirebase.initializeApp({
    credential: adminfirebase.credential.cert('./proyecto-daw-eba1d-firebase-adminsdk-wou3o-b71ea1cfcd.json'),
    databaseURL: "https://proyecto-daw-eba1d.firebaseio.com"

})

app.use(express.json())

const listAllUsers = (nextPageToken) => {
    // List batch of users, 1000 at a time.
    return admin.auth().listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        return listUsersResult.users
      })
      .catch((error) => {
        console.log('Error listing users:', error);
      });
  }

const deluser = (uid) => {
  admin.auth().deleteUser(uid)
  .then(()=> {
    console.log('Successfully deleted user');
  })
  .catch((error) => {
    console.log('Error deleting user:', error);
  });

}

app.get('/users',(request, response)=>{
    
    const users = listAllUsers().then((data)=>{

        response.json(data)
    })
    
})
app.post('/deleteuser',(request,response)=>{
  deluser(request.body.uid)
})

app.listen(3000,()=>{
    console.log("server hosted in port 3000")
})

