import axios from 'axios';

const state = {
    userTasks: null,
    newTaskAddedStatus:false
}

const mutations = {
    setUserTasks: (state, tasks) => {     
        state.userTasks = tasks;
    },
    changeNewTaskAddedStatus:(state,value)=>{
        state.newTaskAddedStatus=value
    }
}

const getters = {
    userTasks: (state) => {
        return state.userTasks;
    },
    newTaskAddedStatus:(state)=>{
        return state.newTaskAddedStatus
    }
}

const actions = {
    postNewTask: (context, task) => {
        return new Promise((resolve,reject)=>{
            const url = "http://localhost:56329/json/oneway/CreateTaskRequestDTO" 
            let config = {
                headers: { 'Content-Type': 'application/json' },
              };
            
            axios.post(url, task,config)
            .then((response)=>{
                context.commit('changeNewTaskAddedStatus',true)
               
                resolve(response)
            })
            .catch((error)=>{
                context.commit('changeNewTaskAddedStatus',false)
                reject(error)
            })
            
        })
      
    },
    setUserTasks: (context, userId) => {
        return new Promise(
            (resolve, reject) => {
                const url = "http://localhost:56329/user/" + userId;
                axios.get(url)
                    .then((response => {
                        context.commit('setUserTasks', response.data.Result.Data.Tasks);
                        resolve({ dataFetched: true });
                    }))
                    .catch((error)=>{
                        reject({dataFeteched:false,error:error});
                    })
            }
        );

    }
}

export default {
    state,
    mutations,
    getters,
    actions
};



