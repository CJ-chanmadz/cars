<template>
    
            <div class="shadow p-3 mb-5 bg-white rounded">
                <div class="dashboard_form">
                <h1>Add Posts</h1>

                <form @submit.prevent="submitHandler">
                    <div class="form-row">
                        <div class="col-md-6">
                            <div v-if="imageUpload">
                                <img :src="imageUpload"/>
                            </div>

                            <div class="input_field">
                                <input
                                    type="file"
                                    @change="processFile($event)"
                                    ref="myFileInput"
                                />
                            </div>

                            <div 
                                class="input_field"
                                :class="{invalid: $v.formdata.title.$error}"
                            >
                                <label>Title</label>
                                <input
                                    type="text"
                                    @blur="$v.formdata.title.$touch()"
                                    v-model="formdata.title"
                                >

                                <p class="error_label" v-if="$v.formdata.title.$error">
                                    This input is required
                                </p>
                            </div>

                            <div 
                                class="input_field"
                                :class="{invalid: $v.formdata.desc.$error}"
                            >
                                <label>Description</label>
                                <input
                                    type="text"
                                    @blur="$v.formdata.desc.$touch()"
                                    v-model="formdata.desc"
                                >

                                <p class="error_label" v-if="$v.formdata.desc.$error">
                                    This input is required
                                </p>
                                <p class="error_label" v-if="!$v.formdata.desc.maxLength">
                                    Must not be greater than {{
                                        $v.formdata.desc.$params.maxLength.max
                                    }} characters
                                </p>

                                <div 
                                    style="margin-top: 30px;"
                                    class="input_field"
                                    :class="{invalid:$v.formdata.rating.$error}"
                                >
                                    <label>Rating</label>
                                    <select
                                        @blur="$v.formdata.rating.touch()"
                                        v-model="formdata.rating"
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>

                                    <p class="error_label" v-if="$v.formdata.desc.$error">
                                        You need to select atleast one.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="input_field">
                                <wysiwyg
                                    v-model="formdata.content"
                                />  
                            </div>
                            
                            <button style="background: #097054;" type="submit">
                                Add post
                            </button>
                        </div>
                    </div>
                </form>

                <md-dialog :md-active="dialog">
                    <p>
                        Your post has no content, are you sure you want to post this ?
                    </p>

                    <md-dialog-actions>
                        <md-button class="md-primary" @click="dialogOnCancel">Oop, I want to add it.</md-button>
                        <md-button class="md-primary" @click="dialogOnConfirm">Yes I am sure</md-button>
                    </md-dialog-actions>
                </md-dialog>

                <div v-if="addpost" class="post_succesfull">
                    Posted Succesfully
                </div>
            </div>

            </div>
    
</template>

<script>
import {required, maxLength} from 'vuelidate/lib/validators';

export default {
    data() {
        return {
            dialog:false,
            formdata: {
                img:'',
                title: '',
                desc: '',
                content: '',
                rating: ''
            }
        }
    },
    validations: {
        formdata: {
            title: {
                required
            },
            desc: {
                required,
                maxLength:maxLength(200)
            },
            rating: {
                required
            }
        }
    },
    computed: {
        addpost() {
            let status = this.$store.getters['Admin/addPostStatus'];

            if(status) {
                this.clearPost()
                this.$store.commit('Admin/clearImageUpload')
            }

            return status
        },
        imageUpload() {
            let imageUrl = this.$store.getters['Admin/imageUpload'];

            this.formdata.img = imageUrl;

            return imageUrl;
        }
    },
    methods: {
        submitHandler(){
            if(!this.$v.$invalid) {
                if(this.formdata.content === '') {
                    //show dialog
                    this.dialog = true
                } else {
                    this.addPost()
                }
            } else {
                alert('Something is wrong!')
            }
        },

        dialogOnCancel() {
            this.dialog = false;
        },

        dialogOnConfirm() {
            this.dialog = false;
            this.addPost()
        },

        addPost() {
            this.$store.dispatch('Admin/addPost', this.formdata)
        },

        clearPost() {
            this.$v.$reset()
            this.$refs.myFileInput.value = '';
            this.formdata = {
                title: '',
                desc: '',
                content: '',
                rating: ''
            }
        },

        processFile(event) {
            let file = event.target.files[0];
            this.$store.dispatch('Admin/imageUpload', file)
        }
    },
    destroyed() {
        this.$store.commit('Admin/clearImageUpload')
    }
}
</script>

<style scoped>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css";

    .input_field.invalid input,
    .input_field.invalid select {
        border: 1px solid red;
    }

    .editr {
        border: 1px solid #e4e4e4;
        width: 100%;
        min-height: 280px;
    }
    .button {
        background: #ff8c00;
    }
</style>