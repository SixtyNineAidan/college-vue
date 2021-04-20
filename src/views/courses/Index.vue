<template>
  <div >

  <h1>Welcome to the Courses Index page</h1>


    <br>


   <b-button variant="warning" @click="getCourses()">Get Courses</b-button>

  <br>

    <router-link :to="{ name: 'courses_create'}"> <b-button  variant="warning"> Create </b-button> </router-link>
      <br>
    <input type="text" v-model="term" />



    <br><br>
    <b-card>
    <b-table striped hover :items="filterCourses" :fields="fields">
      <template #cell(title)="data">
        <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{ data.item.title }}</router-link>
      </template>
      <template #cell(actions)="data">
        <router-link :to="{ name: 'courses_edit', params: { id: data.item.id }}"> <b-button  variant="warning"> Edit </b-button> </router-link>
      </template>
    </b-table>
  </b-card>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'CourseIndex',
    components: {},
    data() {
      return {
        fields: [{
            key: 'title',
            sortable: true,
          },
          'code',
          'description',
          'points',
          'level',
          {
            key: 'level',
            sortable: true,
          },
          "Actions"
        ],
        courses: [],
        term: "",
        filterCourses: [],
      }
    },
    watch: {
      term: function(newTerm, oldTerm) {
        console.log('New: ', newTerm)
        console.log('Old: ', oldTerm)
        this.searchCourse();
      }
    },
    mounted() {
      this.getCourses();
    },
    methods: {
      searchCourse() {
        this.filterCourses = this.courses.filter(course => {
          if (course.title.toLowerCase().includes(this.term.toLowerCase())) {
            return true
          }

          if (course.code.toLowerCase().includes(this.term.toLowerCase())) {
            return true
          }
        });
      },

      getCourses() {
        let token = localStorage.getItem('token');

        axios.get('http://college.api:8000/api/courses', {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          .then(response => {
            console.log(response.data);
            this.courses = response.data.data
            this.filterCourses = response.data.data;

          })
          .catch(error => {
            console.log(error)
            console.log(error.response.data)
          })
      },

      logout() {
        let token = localStorage.getItem('token');

        axios.get('http://college.api:8000/api/logout', {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          .then(response => {
            console.log(response.data);
            console.log("LOGGED OUT");
          })
          .catch(error => {
            console.log(error)
            console.log(error.response.data)
          })

        localStorage.removeItem('token');
      }
    },
  }
</script>
<style>
  .home {
    text-align: center;
  }
</style>
