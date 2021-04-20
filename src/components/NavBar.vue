<template>
  <div>
      <b-navbar toggleable="lg" type="light" variant="danger">

      <b-navbar-nav>
        <!-- <router-link to="/">Home</router-link> -->
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item :to="{name: 'courses_index'}">Courses</b-nav-item>
        <b-nav-item :to="{name: 'lecturers_index'}">Lectures</b-nav-item>
        <b-nav-item :to="{name: 'enrolments_index'}">Enrolments</b-nav-item>

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>

          <b-nav-item-dropdown text="Language" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>

            </b-nav-form>
        <!-- <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link> -->
      </b-navbar-nav>
    </b-navbar>




  </div>
</template>
<script>
  export default {
    name: "Navbar",
    props: {
      loggedIn: Boolean //<-- this is new line
    },
    logout() {
      localStorage.removeItem('token'); // optionally, can now move this to App.vue's logout method
      this.$emit('logout'); //<-- tells App.vue to update loggedIn
      this.$router.push('/');
    }
  }
</script>
<style>
  .navbar {
    margin-bottom: 40px;

  }
</style>
