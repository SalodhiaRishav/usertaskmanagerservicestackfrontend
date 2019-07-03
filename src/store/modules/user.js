import axios from 'axios';

const state = {
    users:null,
    loginStatus: false,
}

const mutations = {
    changeLoginStatus: (state, value) => {
        state.loginStatus = value;
    },
    setUsers:(state,users)=>{
        state.users=users
    }
}

const getters = {
    loginStatus: (state) => {
        return state.loginStatus;
    },
    users:(state)=>{
        return state.users
    }
}

const actions = {
    changeLoginStatus: (context, value) => {
        context.commit('changeLoginStatus', value)
    },
    getUsers:(context)=>{
        return new Promise((resolve,reject)=>{
            const url="http://localhost:56329/user";
            axios.get(url).then((response)=>{
                context.commit('setUsers',response.data.Result.Data)
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



