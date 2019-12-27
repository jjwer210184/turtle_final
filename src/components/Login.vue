<template>
  <b-modal id="login" title="login" @ok="submit">
    <b-container>
      <b-row class="mb-3 d-flex align-items-center">
        <b-col cols="2">
          <div>email</div>
        </b-col>
        <b-col cols="10">
          <b-form-input v-model="form.email" placeholder="Enter your email"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mb-3 d-flex align-items-center">
        <b-col cols="2">
          <div>password</div>
        </b-col>
        <b-col cols="10">
          <b-form>
            <b-form-input type="password" v-model="form.password" placeholder="Enter your password"></b-form-input>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
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
        .signInWithEmailAndPassword(this.form.email, this.form.password)
          .then(data => {
            this.$store.dispatch('fetchUser', data.user).then(() => {
              this.form.email = ''
              this.form.password = ''
            })
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>