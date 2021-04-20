Enrolment<template>
  <div>
    <b-form @submit="onSubmit"
    @reset="onReset" v-if="show">
    <b-form-group id="input-group-1" label="Enrolment data:" label-for="input-1" description="We'll never share your data with anyone else.">
      <b-form-input id="input-1" v-model="enrolment.date" type="text" placeholder="Enter data" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="Enrolment time:" label-for="input-1" description="We'll never share your time with anyone else.">
      <b-form-input id="input-1" v-model="enrolment.time" type="text" placeholder="Enter time" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="Enrolment status:" label-for="input-1" description="We'll never share your status with anyone else.">
      <b-form-input id="input-1" v-model="enrolment.status" type="text" placeholder="Enter status" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="Enrolment course_id:" label-for="input-1" description="We'll never share your course_id with anyone else.">
      <b-form-input id="input-1" v-model="enrolment.course_id" type="text" placeholder="Enter course_id" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="Enrolment lecturer_id:" label-for="input-1" description="We'll never share your lecturer_id with anyone else.">
      <b-form-input id="input-1" v-model="enrolment.lecturer_id" type="text" placeholder="Enter lecturer_id" required></b-form-input>
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
        enrolment: {
          date: '',
          time: '',
          status: '',
          course_id: '',
          lecturer_id: '',

        },

        show: true
      }
    },
    created() {
      this.getEnrolment();
    },
    methods: {
      getEnrolment() {
        let token = localStorage.getItem('token');
        let id = this.$route.params.id;

        axios.get('http://college.api:8000/api/enrolments/' + id, {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          .then(response => {
            console.log(response.data);
            this.enrolment = response.data.data;

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
        axios.put('http://college.api:8000/api/enrolments/' + id, {
            date: this.enrolment.date,
            time: this.enrolment.time,
            status: this.enrolment.status,
            course_id: this.enrolment.course_id,
            lecturer_id: this.enrolment.lecturer_id,
          }, {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          .then(response => {
            console.log(response.data);
            this.$router.push({
              name: 'enrolments_index'
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
