<template>
  <div>
    <b-form @submit="onSubmit"
    @reset="onReset" v-if="show">
    <b-form-group id="input-group-1" label="Course title:" label-for="input-1" description="We'll never share your email with anyone else.">
      <b-form-input id="input-1" v-model="course.title" type="text" placeholder="Enter title" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="Course code:" label-for="input-1" description="We'll never share your email with anyone else.">
      <b-form-input id="input-1" v-model="course.code" type="text" placeholder="Enter code" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="description:" label-for="input-1" description="We'll never share your email with anyone else.">
      <b-form-input id="input-1" v-model="course.description" type="text" placeholder="Enter description" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="points:" label-for="input-1" description="We'll never share your email with anyone else.">
      <b-form-input id="input-1" v-model="course.points" type="text" placeholder="Enter points" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="level:" label-for="input-1" description="We'll never share your email with anyone else.">
      <b-form-input id="input-1" v-model="course.level" type="text" placeholder="Enter level" required></b-form-input>
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
        course: {
          title: '',
          description: '',
          points: '',
          level: '',

        },

        show: true
      }
    },
    created() {
      this.getCourse();
    },
    methods: {
      getCourse() {
        let token = localStorage.getItem('token');
        let id = this.$route.params.id;

        axios.get('http://college.api:8000/api/courses/' + id, {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          .then(response => {
            console.log(response.data);
            this.course = response.data.data;

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
        axios.put('http://college.api:8000/api/courses/' + id, {
            title: this.course.title,
            code: this.course.code,
            description: this.course.description,
            points: this.course.points,
            level: this.course.level,
          }, {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          .then(response => {
            console.log(response.data);
            this.$router.push({
              name: 'courses_index'
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
