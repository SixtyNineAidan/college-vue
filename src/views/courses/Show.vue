<template>
  <div>
<b-card>

  <h4>Title: </h4> {{ course.title }} <br>
  <h4>Code: </h4> {{ course.code }}<br>
  <h4>Description: </h4> {{ course.description }}<br>
  <h4>Points: </h4> {{ course.points }}<br>
  <h4>Level: </h4> {{ course.level }}<br>

  <button @click="deleteCourse()">Delete</button>
  <b-table striped hover :items="course.enrolments">


    <!-- <template #cell(title)="data">
      <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{ data.item.title }}</router-link>
    </template> -->
  </b-table>
</b-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CourseShow',
  components: {
  },
  data() {
    return {
      course: {}
    }
  },
  mounted(){
    let token = localStorage.getItem('token');

    axios.get(`http://college.api:8000/api/courses/${this.$route.params.id}`, {
      headers: { Authorization: "Bearer " + token}
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
  methods: {
    deleteCourse(){
      let token = localStorage.getItem("token");
      let id = this.$route.params.id;

      this.course.enrolments.forEach((enrolment) => {
        console.log(enrolment.id);
        axios
          .delete("http://college.api:8000/api/enrolments/" + enrolment.id, {
            headers: { Authorization: "Bearer " + token },
          })
          .catch(function (error) {
            console.log(error);
          });
      });

      axios
        .delete(`http://college.api:8000/api/courses/${id}`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          this.$router.replace({ name: "courses_index" });
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
