<template>
  <b-modal id="signup" title="signup" @ok="submit">
    <b-form>
      <b-form-input v-model="form.name" placeholder="name"></b-form-input>
      <b-form-input v-model="form.email" placeholder="Enter your email"></b-form-input>
      <b-form-input type="password" v-model="form.password" placeholder="Enter your password"></b-form-input>
    </b-form>
  </b-modal>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.form.name
            })
            .then(() => {
              this.form.name = ''
              this.form.email = ''
              this.form.password = ''
            });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>