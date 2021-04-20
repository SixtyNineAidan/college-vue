<template>
  <div>




    <h4>Date: </h4> {{ enrolment.date }} <br>
    <h4>Time: </h4> {{ enrolment.time }}<br>
    <h4>Status: </h4> {{ enrolment.status }}<br>
    <h4>Course_Id: </h4> {{ enrolment.course_id }}<br>
    <h4>Lecturer_Id: </h4> {{ enrolment.lecturer_id }}<br>
    <button @click="deleteEnrolment()">Delete</button>
    <b-table striped hover :items="enrolment.enrolments">
      <!-- <template #cell(title)="data">
      <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{ data.item.title }}</router-link>
    </template> -->
    </b-table>



  </div>
</template>



<script>
  import axios from 'axios';



  export default {
    name: 'EnrolmentShow',
    components: {},
    data() {
      return {
        enrolment: {}
      }
    },
    mounted() {
      let token = localStorage.getItem('token');



      axios.get(`http://college.api:8000/api/enrolments/${this.$route.params.id}`, {
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
    methods: {
      deleteEnrolment() {
        let token = localStorage.getItem("token");
        let id = this.$route.params.id;





        axios
          .delete(`http://college.api:8000/api/enrolments/${id}`, {
            headers: {
              Authorization: "Bearer " + token
            },
          })
          .then(() => {
            this.$router.replace({
              name: "enrolments_index"
            });
          })
          .catch((error) => {
            console.log(error);
            console.log(error.response.data);
          });



      }
    },
  }
</script>
<style>
  .home {
    text-align: center;
  }
</style>
