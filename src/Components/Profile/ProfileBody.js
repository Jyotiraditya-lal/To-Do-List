import React, {useState} from "react";
import './ProfileBody.css'
import { useSelector } from "react-redux";
import TaskDetails from "../AddTasks/TaskDetails";

const ProfileBody = () => {
    const [enteredTask, setEnteredTask] = useState([]);
    const [CompletedTask, setCompletedTask] = useState([]);
    const [AddedTasks,setAddedTasks]= useState(false)
    const [Completed,setCompleted]=useState(false)
    const userId=useSelector((state)=>state.Auth.UID)


    const fetchTaskHandler= async ()=>{
        try{
            const response =await fetch(`https://to-do-list-3e614-default-rtdb.asia-southeast1.firebasedatabase.app/Tasks/${userId}.json`)
            if (response.ok) {
                const data = await response.json();
                
                const AddedTasks = [];
                for (const key in data) {
                    AddedTasks.push({
                      id: key,
                      tasks: data[key].tasks,
                      startDate: data[key].startDate,
                      endDate: data[key].endDate,
                      description: data[key].description
                    });
                 
                }
               
                setEnteredTask(AddedTasks);
                
              } else {
                throw new Error('Failed to fetch Tasks');
              }
        }catch(err){
            alert(err.message)
        }
    }

    const fetchCompletedTaskHandler= async ()=>{
        try{
            const response =await fetch(`https://to-do-list-3e614-default-rtdb.asia-southeast1.firebasedatabase.app/Completed/${userId}.json`)
            if(!response.ok){
                throw new Error('Could not fetch completed tasks')
            }
            const data= await response.json()
            const CompletedTasks=[]
            for(const key in data){
                CompletedTasks.push({
                    id: key,
                    tasks: data[key].title,
                    startDate: data[key].startDate,
                    endDate: data[key].endDate,
                    description: data[key].description
                })
            }
            setCompletedTask(CompletedTasks)
        }catch(err){
            alert(err.message)
        }
    }

    const AddedTaskHandler=()=>{
        setAddedTasks((prevState)=>!prevState)
        fetchTaskHandler()
    }

    const CompletedTaskHandler=()=>{
        setCompleted((prevState)=>!prevState)
        fetchCompletedTaskHandler()
    }
   
  
    return (
    <React.Fragment>
        <div className="task-list" onClick={AddedTaskHandler}>
          <h2>Added Tasks</h2>
        </div>
        <ul>
            {AddedTasks && enteredTask.map((entTask)=>(
                <TaskDetails
                key={entTask.id}
                id={entTask.id}
                startDate={entTask.startDate}
                endDate={entTask.endDate}
                description={entTask.description}
                task={entTask.tasks}
                completedTask={false}
                AddedTasks={false}
              />
            ))}
        </ul>
        <div className="task-list" onClick={CompletedTaskHandler}>
          <h2>Completed Tasks</h2>
        </div>
        <ul>
            {Completed && CompletedTask.map((entTask)=>(
                <TaskDetails
                key={entTask.id}
                id={entTask.id}
                startDate={entTask.startDate}
                endDate={entTask.endDate}
                description={entTask.description}
                task={entTask.tasks}
                completedTask={false}
                AddedTasks={false}
              />
            ))}
        </ul>
    </React.Fragment>  
    );
  };
  
  export default ProfileBody;
  
