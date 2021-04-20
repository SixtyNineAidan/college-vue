<template>
  <div>
    <b-form @submit="onSubmit"
    @reset="onReset" v-if="show">
    <b-form-group id="input-group-1" label="Lecturer name:" label-for="input-1" description="We'll never share your email with anyone else.">
      <b-form-input id="input-1" v-model="lecturer.name" type="text" placeholder="Enter name" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="Lecturer address:" label-for="input-1" description="We'll never share your email with anyone else.">
      <b-form-input id="input-1" v-model="lecturer.address" type="text" placeholder="Enter address" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="Lecturer email:" label-for="input-1" description="We'll never share your email with anyone else.">
      <b-form-input id="input-1" v-model="lecturer.email" type="text" placeholder="Enter email" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="Lecturer phone:" label-for="input-1" description="We'll never share your email with anyone else.">
      <b-form-input id="input-1" v-model="lecturer.phone" type="text" placeholder="Enter phone" required></b-form-input>
    </b-form-group>






    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        lecturer: {
          name: '',
          email: '',
          phone: '',

        },

        show: true
      }
    },
    created() {
      this.getLecturer();
    },
    methods: {
      getLecturer() {
        let token = localStorage.getItem('token');
        let id = this.$route.params.id;

        axios.get('http://college.api:8000/api/lecturers/' + id, {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          .then(response => {
            console.log(response.data);
            this.lecturer = response.data.data;

          })
          .catch(error => {
            console.log(error)
            console.log(error.response.data)
          })
      },
      onSubmit(event) {
        let id = this.$route.params.id;
        let token = localStorage.getItem('token');
        event.preventDefault()
        axios.put('http://college.api:8000/api/lecturers/' + id, {
            name: this.lecturer.name,
            address: this.lecturer.address,
            email: this.lecturer.email,
            phone: this.lecturer.phone,
          }, {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          .then(response => {
            console.log(response.data);
            this.$router.push({
              name: 'lecturers_index'
            });
          })
          .catch(error => {
            console.log(error)
            console.log(error.response.data)
            if (error.response.data.errors) {
              this.errors = error.response.data.errors
            }
          })
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>
