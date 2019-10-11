/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import Admin from './Modules/admin';
import posts from './Modules/posts';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Admin,
        posts
    }
})