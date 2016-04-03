function assig(userID) {
  var projID = window.location.hash.substring(1);

  var userRef = new Firebase('https://prolanner.firebaseio.com').child("users").child("github:"+userID)
  userRef.once('value', function(snapshot){
      var pid = snapshot.child("projectIDs").val()
      pid.push(projID)

      userRef.child('projectIDs').set(pid)
  })

  var projRef = new Firebase('https://prolanner.firebaseio.com').child("projects").child(projID)
  projRef.once('value', function(snapshot){
    var pmem = snapshot.child("projectMetaData").child("projectMembers").val()
    var uid = "github:"+userID

    pmem.push(uid)
    projRef.child("projectMetaData").child("projectMembers").set(pmem)

    var chatRoomID = snapshot.child("projectMetaData").child("relatedChatRoom").val()
    var chatRoomref = new Firebase('https://prolanner.firebaseio.com').child("chatrooms").child(chatRoomID)
    chatRoomref.once('value', function(snapshot){
        var cmem = snapshot.child("roomMetaData").child("roomMembers").val()
        var uid = "github:"+userID

        cmem.push(uid)
        chatRoomref.child("roomMetaData").child("roomMembers").set(cmem)

    })
  })
}