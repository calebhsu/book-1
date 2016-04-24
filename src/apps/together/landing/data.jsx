// a single 'data' object that holds the data of your entire app, with initial values
var data = {
  projects: [],
}

// a single 'handlers' object that holds all the actions of your entire app
var actions;
if (localStorage.getItem('prolanner::user') != null) {
  actions = {
    logged: true
  };
  data.user = JSON.parse(localStorage.getItem('prolanner::user'))
} else {
  actions = {
    logged: false
  }
}

// the main render() function. call this function whenever the app's UI
// needs to to re-rendered
// 'data' and 'actions' are injected into the app
function render(){
  ReactDOM.render(
    <MyComponents.App
        data={data}
        actions={actions}/>,
    $('#app-container').get(0)
  )
}

//
// DATA
//

var firebaseRef = new Firebase('https://prolanner.firebaseio.com')

// Real-time Data (load constantly on changes)
firebaseRef.on('value', function(snapshot){
   
    if(actions.logged) {
      data.projects=[]
      var userid = "github:"+data.user.userID
      var userProjRef = firebaseRef.child("users").child(userid).child("projectIDs")
      userProjRef.on('value', function(snapshot){
        for(var i in snapshot.val()){
          var projRef = firebaseRef.child("projects").child(snapshot.val()[i])
          projRef.on('value',function(s){
            data.projects.push(s.val())
            render()
          })
        }
      })
    }

    else {
      data.projects= _.values(snapshot.val().projects)
      render()
    }
  })

actions.login = function(){

  firebaseRef.authWithOAuthPopup("github", function(error, authData){

    // handle the result of the authentication
    if (error) {
      console.log("Login Failed!", error);
      actions.logged = false
    } else {
      actions.logged = true
      console.log("Authenticated successfully with payload:", authData);

      // create a user object based on authData
      var user = {
        displayName: authData.github.displayName,
        userName: authData.github.username,
        userID: authData.github.id,
        status: 'online'
      }

      var userRef = firebaseRef.child('users')
      var isUserPresent;
      var gid = "github:"+authData.github.id

      userRef.on('value', function(snapshot){
        if(snapshot.child(gid).exists()==true) {
          isUserPresent = true
          var uref = firebaseRef.child("users").child(gid)
          firebaseRef.child("users").child(gid).update({status:"online"});
          uref.on('value', function(snapshot){
            data.user = snapshot.val()
            localStorage.setItem('prolanner::user', JSON.stringify(data.user))
            var projects = _.values(snapshot.val().projectIDs)
            data.projects=[]
            for (var i in projects) {
              if(projects[i] && projects[i]!="undefined") {
                var projRef = firebaseRef.child("projects").child(projects[i])
                projRef.on('value',function(snapshot){
                  data.projects.push(snapshot.val())
                  render()
                })
              }
            }
          })
        }
        else {
          isUserPresent = false
          data.projects=[]
          var uref = firebaseRef.child("users").child(gid)
          uref.set(user)
          uref.on('value', function(snapshot){
            data.user = snapshot.val()
            render()
          })

        }
      })
    }
  })
}

actions.logout = function(){

  if (data.user){

    actions.logged = false
    firebaseRef.unauth()

    var gid = "github:"+data.user.userID
    var userRef = firebaseRef
      .child('users')
      .child(gid)

    // unsubscribe to the user data
    userRef.off()

    // set the user's status to offline
    userRef.child('status').set('offline')
    localStorage.removeItem('prolanner::user')

    data.user = null

    render()

  }

}