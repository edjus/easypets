import firebase from './firebase';

const PARENTCOLLECIONNAME='businesses';
const COLLECTIONNAME='task';
const PICTURESFOLDER='taskPictures';



export const saveTask=async (businessID, taskData)=>{

    var taskSaved=false;
    const db = firebase.firestore()
    const docRef = db.collection(PARENTCOLLECIONNAME).doc(businessID).collection(COLLECTIONNAME);

    try{
        const updateTimestamp =  await docRef.add({
            ...taskData,
            timestampCreated: new Date(),
          }).then(()=>{
                
                taskSaved=true;
          })
          .catch((error)=>{
            console.log("Error saving task: ",error );
        })
    }
    catch(error){
        console.log("Error saving task: ",error );
    }

    return taskSaved;

}


export const deleteTask=async (businessId, taskId)=>{

    var taskDeleted=true;
    const db = firebase.firestore()
    const taskRef = await db.collection('business').doc(businessId).collection(COLLECTIONNAME).doc(taskId).get()

    .then((doc)=>{
        if(doc.exists){
        const updateTimestamp =  docRef.delete()
        .then(()=>{
            taskDeleted=true;
        })

       
        }else{
            console.log("Error, task id wasn´t founded  ",error );
        }
    })
    .catch((error)=>{
        console.log("Error deleting task: ",error );
    })

    return taskDeleted;

}



export const updateTask = async (businessID, taskData) => {
    
    var taskUpdated=false;
    const db = firebase.firestore();
    const docRef = await db.collection('businesses').doc(businessID).collection(COLLECTIONNAME).doc(taskData.id).get()

    .then((doc)=>{
        if (doc.exists){

            const updateTimestamp = docRef.update({
                ...taskData,
                timestampModified: new Date(),
              })
              .then(()=>{
                taskUpdated=true;
              })

        }

    })
    .catch((error)=>{
        console.log("Error updating task: ",error );
    })

    return taskUpdated;
    
  
  };


  export const fetchTasks = async (businessID)=> {

    var data=[];
    const db = firebase.firestore();
    const docRef = await db.collection('businesses').doc(businessID).collection(COLLECTIONNAME)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            data.push(doc.data())
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    return data;
    
  }
  export const fetchTaskByID = async (businessID, id)=> {
  
    var data={}
    const db = firebase.firestore();
    const docRef = await db.collection('businesses').doc(businessID).collection(COLLECTIONNAME).get()
    .then((doc)=>{
        if(doc.exists){
            data= doc.data();
        }
    })
    .catch((error)=>{
        console.log("Error getting document: ", error);
    })
    return data;
    
  }