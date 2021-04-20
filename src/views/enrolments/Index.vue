<template>
  <div>
  
    <h1>Welcome to the Enrolments Index page</h1>


    <br>

    <button @click="getEnrolments()">Get Enrolments</button>

    <button @click="logout()">Logout</button>


    <router-link :to="{ name: 'enrolments_create'}">Create</router-link>

    <br><br>
    <b-card>
    <b-table striped hover :items="enrolments" :fields="fields">
      <template #cell(title)="data">
        <router-link :to="{ name: 'enrolments_show', params: { id: data.item.id }}">{{ data.item.date }}</router-link>
      </template>
      <template #cell(actions)="data">
        <router-link :to="{ name: 'enrolments_edit', params: { id: data.item.id }}">Edit</router-link>
      </template>
    </b-table>
    </b-card>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'EnrolmentIndex',
    components: {},
    data() {
      return {
        fields: [{
            key: 'date',
            sortable: true,
          },
          'time',
          'status',
          'course_id',
          {
            key: 'lecturer_id',
            sortable: true,
          },
          "Actions"
        ],
        enrolments: []
      }
    },
    mounted() {
      this.getEnrolments();
    },
    methods: {
      getEnrolments() {
        let token = localStorage.getItem('token');

        axios.get('http://college.api:8000/api/enrolments', {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          .then(response => {
            console.log(response.data);
            this.enrolments = response.data.data;

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
