<template>
  <div>
  
        <h1>Welcome to the Lecturers Index page</h1>

    <br>

    <button @click="getLecturers()">Get Lecturers</button>

    <button @click="logout()">Logout</button>


    <router-link :to="{ name: 'lecturers_create'}">Create</router-link>

    <br><br>
    <b-card>
    <b-table striped hover :items="lecturers" :fields="fields">
      <template #cell(name)="data">
        <router-link :to="{ name: 'lecturers_show', params: { id: data.item.id }}">{{ data.item.name }}</router-link>
      </template>
      <template #cell(actions)="data">
        <router-link :to="{ name: 'lecturers_edit', params: { id: data.item.id }}">Edit</router-link>
      </template>
    </b-table>
    </b-card>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'LecturerIndex',
    components: {},
    data() {
      return {
        fields: [{
            key: 'name',
            sortable: true,
          },
          'address',
          'email',

          {
            key: 'phone',
            sortable: true,
          },
          "Actions"
        ],
        lecturers: []
      }
    },
    mounted() {
      this.getLecturers();
    },
    methods: {
      getLecturers() {
        let token = localStorage.getItem('token');

        axios.get('http://college.api:8000/api/lecturers', {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          .then(response => {
            console.log(response.data);
            this.lecturers = response.data.data;

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
