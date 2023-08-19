// When Page is rendered for the first time, data is not being fetched.
import React, { useCallback, useEffect, useState } from "react";
import "./AddTaskForm.css"; 
import { useDispatch, useSelector } from "react-redux";
import { TaskActions } from "../../Store/Auth-Redux";
import TaskDetails from "./TaskDetails";


const AddTaskForm = (props) => {
  const [enteredTask, setEnteredTask] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dispatch= useDispatch()
  const [enteredtasks,setTasks]=useState([])
  const [description,setDescription]=useState('')
  const userId=useSelector((state)=>state.Auth.UID)
  console.log(userId)


  const fetchtask= useCallback( async ()=>{

    try{
        const response =await fetch(`https://to-do-list-3e614-default-rtdb.asia-southeast1.firebasedatabase.app/Tasks/${userId}.json`)
        if (response.ok) {
            const data = await response.json();
            
            const loadedTasks = [];
            for (const key in data) {
                loadedTasks.push({
                  id: key,
                  tasks: data[key].tasks,
                  startDate: data[key].startDate,
                  endDate: data[key].endDate,
                  description: data[key].description
                });
             
            }
           
            setTasks(loadedTasks);
            
          } else {
            throw new Error('Failed to fetch Tasks');
          }
    }catch(err){
        alert(err.message)
    }
  },[userId])

  useEffect(() => {
    fetchtask();
  }, [fetchtask]);
  
  

  const TaskChangeHandler = (event) => {
    setEnteredTask(event.target.value);
    dispatch(TaskActions.Tasks(event.target.value))
  };

  const DescriptionChangeHandler = (event) => {
    setDescription(event.target.value);
    dispatch(TaskActions.description(event.target.value))
  };

  const StartDateHandler = (event) => {
    setStartDate(event.target.value);
    dispatch(TaskActions.StartDate(event.target.value))
  };

  const EndDateHandler = (event) => {
    setEndDate(event.target.value);
    dispatch(TaskActions.EndDate(event.target.value))
  };

  const ResetHandler = (event) => {
    event.preventDefault();
    props.onStateChange(false);
  };

  const SubmitNewTask= async ()=>{
    try{
        const response =await fetch(`https://to-do-list-3e614-default-rtdb.asia-southeast1.firebasedatabase.app/Tasks/${userId}.json`,{
            method: 'POST',
            body: JSON.stringify({
                tasks: enteredTask,
                startDate: startDate,
                endDate: endDate,
                description: description
            })
        })
        if (response.ok) {
            alert('Task has been updated');
            
            fetchtask();
          } else {
            throw new Error('Could not store the Task');
          }
    }catch(err){
        alert(err.message)
    }
  }

  

  const SubmitHandler =  (event) => {
    event.preventDefault();
    SubmitNewTask()
    setDescription('')
    setEndDate('')
    setEnteredTask('')
    setStartDate('')
    
  };

  const UpdateCompletedTask= async(task,stDate,enDate,des)=>{
    try{
      const response =await fetch(`https://to-do-list-3e614-default-rtdb.asia-southeast1.firebasedatabase.app/Completed/${userId}.json`,{
        method: 'POST',
        body: JSON.stringify({
          title: task,
          startDate: stDate,
          endDate: enDate,
          description: des
        })
      })
      if(!response.ok){
        throw new Error('SOmething went wrong too')
      }
    }catch(err){
      alert(err.message)
    }
  }

  const CompleteHandler=async (id,task,stDate,enDate,des)=>{
    try{
      const response =await fetch(`https://to-do-list-3e614-default-rtdb.asia-southeast1.firebasedatabase.app/Tasks/${userId}/${id}.json`,{
        method: 'DELETE'
      })
      if(response.ok){
        alert('Updated')
      }else{
        throw new Error('Something Went Wrong')
      }
    }catch(err){
      alert(err.message)
    }
    const index=enteredtasks.findIndex((i)=>i.id===id)
    enteredtasks.splice(index,1)
    UpdateCompletedTask(task,stDate,enDate,des)
    setEnteredTask(enteredtasks)
  }

  

  return (
    <React.Fragment>
    <form onSubmit={SubmitHandler} onReset={ResetHandler} className="add-task-form">
      <div className="new-task-controls">
        <div className="new-task-control">
          <label htmlFor="task">Enter Task:</label>
          <input id="task" type="text" value={enteredTask} onChange={TaskChangeHandler} />
        </div>
        <div className="new-task-control">
          <label htmlFor="StartDate">Start Date:</label>
          <input id="StartDate" type="date" value={startDate} onChange={StartDateHandler} />
        </div>
        <div className="new-task-control">
          <label htmlFor="EndDate">End Date:</label>
          <input id="EndDate" type="date" value={endDate} onChange={EndDateHandler} />
        </div>
        <div className="new-task-control">
          <label htmlFor="description">Description:</label>
          <input id="description" type="text" value={description} onChange={DescriptionChangeHandler} />
        </div>
      </div>
      <div className="new-task-actions">
        <button type="reset">Cancel</button>
        <button type="submit">Add Task</button>
      </div>
    </form>
    <ul>
    {enteredtasks.map((enttask) => (
          <TaskDetails
            key={enttask.id}
            id={enttask.id}
            startDate={enttask.startDate}
            endDate={enttask.endDate}
            description={enttask.description}
            task={enttask.tasks}
            completedTask={false}
            onCompleted={CompleteHandler.bind(null, enttask.id,enttask.tasks,enttask.startDate,enttask.endDate,enttask.description)}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default AddTaskForm;
