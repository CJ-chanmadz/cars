<template>
    <div class="container">
        <div class="signin_container">

            <h1>Sign in</h1>

            <form @submit.prevent="onSubmit">
                <div 
                    class="input_field"
                    :class="{invalid: $v.formdata.email.$error}"
                    >

                    <label>Email</label>

                    <input 
                        type="email" 
                        @blur="$v.formdata.email.$touch()"
                        v-model.trim="formdata.email"
                    >

                    <div v-if="$v.formdata.email.$error">
                        <p class="error_label" v-if="!$v.formdata.email.required">
                            This field is required!
                        </p>
                        <p class="error_label" v-if="!$v.formdata.email.email">
                            This is not a valid email!
                        </p>
                    </div>
                </div>

                <div 
                    class="input_field"
                    :class="{invalid: $v.formdata.password.$error}"
                >

                    <label>Password</label>

                    <input 
                        type="password" 
                        @blur="$v.formdata.password.$touch()"
                        v-model="formdata.password"
                    >

                    <div v-if="$v.formdata.password.$error">
                        <p class="error_label" v-if="!$v.formdata.password.required">
                            This field is required!
                        </p>

                        <p class="error_label" v-if="!$v.formdata.password.minLength">
                            Atleast 4 characters!
                        </p>
                    </div>
                </div>

                <button style="background: #ff8c00" type="submit">
                    Sign in
                </button>

                <p class="error_label" v-if="error">
                    Something is wrong!
                </p>

                <p class="error_label" v-if="authFailed">
                    Please check your email and password!
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            error: false,
            formdata: {
                email:'',
                password:''
            }
        }
    },
    computed: {
        authFailed() {
            return this.$store.state.Admin.authFailed
        }
    },
    destroyed() {
        this.$store.commit('admin/authFailed','reset')
    },
    validations: {
        formdata: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(4)
            }
        }
    },
    methods: {
        onSubmit() {
            if(!this.$v.$invalid) {
                this.$store.dispatch('Admin/signIn', this.formdata)
            } else {
                this.error = true;
                setTimeout(() => {
                    this.error = false
                },2000)
            }
        }
    }
}
</script>

<style scoped>
    .input_field.invalid input,
    .input_field.invalid select {
        border: 1px solid red;
    }
</style>