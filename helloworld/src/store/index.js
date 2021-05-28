import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleA = {
    state:{
        countA:0
    },
    getters:{
        countA(){
            return state.countA
        }
    },
    mutations:{
        add(state,){

        }
    },
}

const store = new Vuex.Store({
    modules:{
        a:moduleA,
        b:moduleB
    }
    },

})

export default store
