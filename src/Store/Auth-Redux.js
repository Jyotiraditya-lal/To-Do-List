import {configureStore, createSlice} from '@reduxjs/toolkit'

const initialState= localStorage.getItem('token')
const nameState=localStorage.getItem('name')
const emailState=localStorage.getItem('email')
const AuthState={isLoggedin: initialState, idToken: '', UID: '', Name: nameState, email: emailState}
const TaskState={Tasks: '', StartDate: '', EndDate: '', description : ''}

const AuthSlice= createSlice({
    name: 'Auth',
    initialState: AuthState,
    reducers: {
        login(state,action){
            localStorage.setItem('token', action.payload);
            localStorage.setItem('name', action.payload.Name)
            localStorage.setItem('email', action.payload.email)
            state.isLoggedin=true;
            state.idToken=action.payload.idToken;
            state.UID=action.payload.UID
            state.Name=action.payload.Name
            state.email=action.payload.email
            console.log(state.Name, state.email,state.UID)
        },

        logout(state){
            localStorage.removeItem('token');
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            state.isLoggedin=false;
            state.idToken=undefined;
            state.UID=undefined
            state.Name=undefined
            state.email=undefined
        }
    }
})

const TaskSlice=createSlice({
    name: 'Tasks',
    initialState: TaskState,
    reducers: {
        Tasks(state,action){
            state.Tasks=action.payload
        },

        StartDate(state,action){
            state.StartDate=action.payload
        },

        EndDate(state,action){
            state.EndDate=action.payload
        },

        description(state,action){
            state.description=action.payload
        }
    }
})


const store=configureStore({
    reducer: {Auth: AuthSlice.reducer, Tasks: TaskSlice.reducer}
})

export const AuthActions=AuthSlice.actions
export const TaskActions=TaskSlice.actions

export default store