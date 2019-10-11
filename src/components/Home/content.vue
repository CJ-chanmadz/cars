<template>
    <div class="container">
        <div class="home_container">
            <md-card v-for="(post,index) in posts" :key="index">
                <md-card-media md-ratio="4:3">
                    <img :src="post.img"/>
                </md-card-media>

                <md-card-header>
                    <h2 class="md-title">{{ post.title }}</h2>

                    <div class="md-subhead">
                        <div>{{ post.desc }}</div>
                    </div>

                    <md-card-actions>
                        <app-button
                            type="link"
                            :linkTo="`/post/${post.id}`"
                            :addClass="['small_link']"
                        >
                            See Review
                        </app-button>
                    </md-card-actions>
                </md-card-header>
            </md-card>
        </div>

        <div class="load_more">
            <app-button
                type="btn"
                :addClass="['small_link']"
                :action="loadMore"
            >
            Load more
            </app-button>
        </div>
    </div>
</template>

<script>
// import posts from '../../assets/posts';

export default {
    computed: {
        posts() {
            return this.$store.getters['posts/getAllPosts']
        }
    },
    methods: {
        loadMore() {
           this.$store.dispatch('posts/getAllPosts',{
               limit: this.posts.length + 3
           }) 
        }
    },
    created() {
        this.$store.dispatch('posts/getAllPosts', {
            limit: 3
        })
    }
}
</script>

<style scoped>

    .md-card-media+.md-card-header {
        padding-top: 0px;
    }

    @media (max-width: 991.98px) {
        .home_container .md-card {
            width: 100%;
        }
    }

    @media only screen and (max-width: 600px) {
        .slider_bck {
            height: 272px;
            background-size: cover !important;
            background-repeat: no-repeat !important;
            position: relative;
        }
    }

</style>