import axios from 'axios';

const state = {
    taskcategories:null,  
}

const mutations = {   
    setTaskCategories:(state,taskcategories)=>{
        state.taskcategories=taskcategories
    }
}

const getters = {   
    taskcategories:(state)=>{
        return state.taskcategories
    }
}

const actions = {
    getTaskCategories:(context)=>{
        return new Promise((resolve,reject)=>{
            const url="http://localhost:56329/taskcategory";
            axios.get(url).then((response)=>{
                context.commit('setTaskCategories',response.data.Result.Data)
                resolve({isFetched:true});
            })
            .catch((error)=>{
                reject({isFetched:false,error:error});
            })
        })
        
    }
}

export default {
    state,
    mutations,
    getters,
    actions
};



