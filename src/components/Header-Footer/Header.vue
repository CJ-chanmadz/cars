<template>

    <header>
        <b-navbar class="header_container" toggleable="lg" type="dark" variant="info">
            <div class="container fixed-header">
                
                <b-navbar-brand>
                    <router-link class="logoName" to="/">
                        ChanMadz
                    </router-link>
                </b-navbar-brand>

                <div class="login" v-if="!isAuth">
                    <router-link to="./signin">
                        <img style="width: 35px; height:35px" :src="require('../../assets/images/login.png')">
                    </router-link>
                </div>

                <div v-if="isAuth">
                    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                    <b-collapse id="nav-collapse" is-nav>
                        <b-navbar-nav>
                            <b-nav-item @click="logoutUser">Logout</b-nav-item>
                            <b-nav-item><router-link to="/dashboard">Dashboard</router-link></b-nav-item>
                        </b-navbar-nav>
                    </b-collapse> 
                </div>
                
            </div>
        </b-navbar>
    </header>

    <!-- <header>
        <div class="container header_container">
            <div class="logo">
                <router-link to="/">
                    ChanMadz
                </router-link>
            </div>
            <div class="login" v-if="!isAuth">
                <router-link to="./signin">
                    <img :src="require('../../assets/images/login.png')">
                </router-link>
            </div>
            <div v-if="isAuth">
                <ul>
                    <li><span @click="logoutUser">Logout</span></li>
                    <li><router-link to="/dashboard">Dashboard</router-link></li>
                </ul>
            </div>
        </div>
    </header> -->
</template>

<script>
export default {
    computed: {
        isAuth() {
            return this.$store.getters['Admin/isAuth']
        }
    },
    methods: {
        logoutUser() {
            this.$store.commit('Admin/logoutUser')
        }
    }
}
</script>

<style scoped>
    .bg-info {
        background-color: #000000 !important;
        line-height: 45px;
        font-size: 20px;
    }

    .logoName {
        color:white;
        text-decoration: none;
        font-size: 24px;
    }

    .logoName:hover {
        color:white;
        text-decoration: none;
    }

    ul li a {
        color:white;
        text-decoration: none;
    }

    ul li a:hover {
        color:white;
        text-decoration: none;
    }

    @media (max-width: 991.98px) {
        .navbar-expand-lg > .container, .navbar-expand-lg > .container-fluid {
            padding-right: 15px;
            padding-left: 15px;
        }
    }
    

</style>