<template>
    <div>
        <table class="content-table">
        <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Rating</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(post,index) in posts" :key="index">
                <td>{{post.title}}</td>
                <td>{{post.desc}}</td>
                <td>{{post.rating}}</td>
                <td>
                    <div class="post_delete" @click="deleteHandler(post.id)">
                        Delete
                    </div>
                </td>
            </tr>
        </tbody>
        </table>

        <md-dialog-confirm
            :md-active.sync="confirmDelete"
            md-title="Confirm delete?"
            md-content="Are you sure you wnat to delete this post? ( there is no turning back )"
            md-confirm-text="Delete"
            md-cancel-text="No, do note delete it"
            @md-cancel="onCancel"
            @md-confirm="onConfirm" 
        />



    </div>
</template>

<script>
export default {
    data() {
        return {
            confirmDelete: false,
            toDelete: ''
        }
    },
    computed: {
        posts() {
            let posts = this.$store.getters['Admin/getAdminPosts']
            return posts
        }
    },
    methods: {
        deleteHandler(id) {
            this.toDelete = id
            this.confirmDelete = true
        },
        onConfirm() {
            this.$store.dispatch('Admin/deletePost', this.toDelete)
            this.confirmDelete = false
        },
        onCancel() {
            this.toDelete = ''
            this.confirmDelete = false
        }
    },
    created() {
        this.$store.dispatch('Admin/getAdminPosts')
    }
}
</script>

<style scoped>
    .content-table {
        border-collapse: collapse;
        margin: 25px 0;
        font-size: 0.9em;
        min-width: 400px;
        border-radius: 5px 5px 0 0;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    }

    .content-table thead tr {
        background-color: #097054;
        color: #ffffff;
        text-align: left;
        font-weight: bold;
    }

    .content-table th,
    .content-table td {
        padding: 30px 15px;
        font-size: 15px;
    }

    .content-table tbody tr {
        border-bottom: 1px solid #dddddd;
    }

    .content-table tbody tr:nth-of-type(even) {
        background-color: #f3f3f3;
    }

    .content-table tbody tr:last-of-type {
        border-bottom: 2px solid #009879;
    }

</style>