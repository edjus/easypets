import firebase from './firebase';



export const signIn = async (email, password) => {
    var userExists=false;
    console.log("email reciebed ", email)
     await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(result){
      //return result.currentUser;
      userExists=true;
    })
   .catch(function(error) {
     console.log(error);
   });
   //console.log("respuesta de auth", firebase.auth().currentUser)
   //return firebase.auth().currentUser;
   return userExists;
 }
 
 export const signOut = async () => {
     var reponse=false;

    await firebase.auth().signOut().then(function() {
      reponse=true;
      console.log("Sign-out successful");
    }).catch(function(error) {
      console.log("Error", error);
    });

    return reponse;
  
  }

  export const signUp = async (email, password) => {
    var userCreated=false;
     await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(result){
      //return result.currentUser;
      userCreated=true;
    })
   .catch(function(error) {
     console.log("Error register:",error.message);
   });

   return userCreated;
 }


 
export const createBusinessWithUser= async (businessData, userData)=>{

  var userCreated=false;
  const db = firebase.firestore()
  const userRef = db.doc(`users/${userData.email}`);
  const auth = firebase.auth()
  
  await auth.createUserWithEmailAndPassword(userData.email, userData.password)
  
  .then(async function(value) {
      const docRef = db.collection('businesses');

      await docRef.add({
          ...businessData,
          ownerEmail:userData.email,
          timestampCreated: new Date(),
      })
      .then(async function(docRef) {
          console.log("Document written with ID: ", docRef.id);
  
          await userRef.set({
              name: userData.name,
              lastName: userData.lastName,
              password: userData.password,
              email:userData.email,
              active:true,
              bussinessID:  docRef.id,
              bussinessName:businessData.bussinessName,
              timestampCreated: new Date(),
              timestampModified: new Date(),
          })
          userCreated=true;

      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });

  }
  )
  
  .catch(function(error) {
 
      var errorCode = error.code;
      var errorMessage = error.message;
      //alert('User already exists!');
      console.log('ERROR: ', errorCode, ": ", errorMessage);
     
    });
    return userCreated;

}



const colectionName='users';


export const saveUser= async ( businessID, userData)=>{
    var userCreated=false;
    const id= userData.email;
    const db = firebase.firestore();
  

    const userRef = await db.doc(`users/${id}`);
    const docRef = await db.collection('businesses').doc(businessID).collection(colectionName).doc(id);


    userRef.get()
    .then(function(doc) {
        if (doc.exists) {
            ///alert('User already exists!!')
            console.log("Error, user already exists!")
            
        } else {
          //create user authentification
          const  userAuth =  signUp(userData.email, userData.password);
          if(userAuth===false){
            console.log("Error auth , user already exists!")
          }else{
            // doc.data() will be undefined in this case
              userRef.set({
                ...userData,
                active: true,
                bussinessID:  businessID,
                bussinessName: user.bussinessName,
                timestampCreated: new Date()
            })

            

              docRef.set({
                ...userData,
                timestampCreated: new Date()
            })
            userCreated=true;
          }
        }
    }).catch(function(error) {
        alert('Error occurred')
        console.log("Error getting document:", error);
    });
    return userCreated;
}



export const deleteProfilePicture = (id) => {
  var pictureDeleted=false;

  var desertRef = storage.ref().child('profilePictures').child(id);

      // Delete the file
      desertRef.delete().then(function() {
        // File deleted successfully
        pictureDeleted=true;
        }).catch(function(error) {
           console.log("Error", error);
      });

      return pictureDeleted;

 
}


export const updateUser = async (businesID,userData) => {
    var userUpdated=false;
    const id=userData.email;
    const db = firebase.firestore();
   
    const docRef= await db.collection('businesses').doc(businessID).collection(colectionName).doc(id)
    docRef.get()
    .then(function(doc) {
        if (!doc.exists) {

            console.log("Error, user donts exists!")
            
        } else {
 
          const updateTimestamp =  docRef.update({
            ...userData,
            timestampModified: new Date(),
          });
          const userRef =  db.doc(`users/${id}`);
           const updateTimestamp2 = userRef.update({
              ...userData,
              timestampModified: new Date(),
            });
          userUpdated=true;
    }
    
    })
    .catch((error)=>{
      console.log("Error updating user ", error)
    })

    return userUpdated;
  }


  
  export const fetchUsers = async (businessID) => {

  
    const db = firebase.firestore();
   
    const docRef= await db.collection('businesses').doc(businessID).collection(colectionName)
    
     return docRef.get();

  };

  export const fetchUserByEmail = async (businessID, id) => {
    
    const db = firebase.firestore();
   
    const docRef= await db.collection('businesses').doc(businessID).collection(colectionName).doc(id);
    
     return docRef.get();


  };

  export const deleteUser = async (businessID, id) => {

    var userDeleted=false;
    //delete de picture from storage
    deleteProfilePicture(id);

    
    const db = firebase.firestore();
   
    const docRef= await db.collection('businesses').doc(businessID).collection(colectionName).doc(id)
    .then((doc)=>{

      if(doc.exists){

        const res =  docRef.delete();
      //I update user in user collection  to active: false, so next time he logs
       //in it will be erased
      const userRef =  db.doc(`users/${id}`);
      const updateTimestamp2 = userRef.update({
        active:false,
        lastUpdatedTimestamp: new Date(),
      });
        userDeleted=true;
    }

    })
    .catch((error)=>{

      console.log("Error deleting user", error);
    })
    
    
    
    return userDeleted;
  };
