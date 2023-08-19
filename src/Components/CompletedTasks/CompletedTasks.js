import React,{useCallback, useEffect, useState} from "react";
import { useSelector } from "react-redux";
import TaskDetails from "../AddTasks/TaskDetails";

const Completedtasks=()=>{
    const [completed,setCompleted]=useState([])
    const userId=useSelector((state)=>state.Auth.UID)
    console.log(userId)

    const fetchCompletedTasks= useCallback( async ()=>{
        try{
            const response =await fetch(`https://to-do-list-3e614-default-rtdb.asia-southeast1.firebasedatabase.app/Completed/${userId}.json`)
            if(!response.ok){
                throw new Error('Could not fetch completed tasks')
            }
            const data= await response.json()
            const loadedTasks=[]
            for(const key in data){
                loadedTasks.push({
                    id: key,
                    tasks: data[key].title,
                    startDate: data[key].startDate,
                    endDate: data[key].endDate,
                    description: data[key].description
                })
            }
            setCompleted(loadedTasks)
        }catch(err){
            alert(err.message)
        }
    },[userId])

    useEffect(()=>{
        fetchCompletedTasks()
    },[fetchCompletedTasks])

    const DeleteTaskHandler=async (id)=>{
        try{
            const response =await fetch(`https://to-do-list-3e614-default-rtdb.asia-southeast1.firebasedatabase.app/Completed/${userId}/${id}.json`,{
              method: 'DELETE'
            })
            if(response.ok){
              alert('Deleted')
            }else{
              throw new Error('Something Went Wrong')
            }
          }catch(err){
            alert(err.message)
          }
          setCompleted((prevTasks)=>prevTasks.filter((t)=>t.id !== id))
    }

    return(
        <React.Fragment>
            <h1 style={{textAlign: 'center', color: 'aliceblue'}}>Completed Tasks</h1>
            {completed.map((entTask) => (
          <TaskDetails
            key={entTask.id}
            id={entTask.id}
            startDate={entTask.startDate}
            endDate={entTask.endDate}
            description={entTask.description}
            task={entTask.tasks}
            completedTask={true}
            onDelete={DeleteTaskHandler.bind(null, entTask.id)}
          />))}
        </React.Fragment>
    )
}

export default Completedtasks