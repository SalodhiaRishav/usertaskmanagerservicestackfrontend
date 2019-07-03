<template>
  <div>
    <form>
      <div class="row">
        <div class="col-6 mb-3">
          <label for="category">Task Domain</label>
          <select v-model="task.taskdomain" id="category">
            <option v-for="(category,index) in categories" :key=index  :value="category.ID">{{category.CategoryName}}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3">
          <label for="userStory">User Story</label>
          <input type="text" class="form-control" id="userStory" required v-model="task.userstory">
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3">
          <label for="timeSpent">Time Spent</label>
          <input
            type="number"
            class="form-control"
            id="timeSpent"
            required
            v-model="task.timespent"
          >
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3">
          <label for="expectedTime">Expected Time</label>
          <input
            type="number"
            class="form-control"
            id="expectedTime"
            required
            v-model="task.expectedtime"
          >
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3">
          <label for="taskDate">Task Date</label>
          <input type="date" class="form-control" id="taskDate" required v-model="task.taskdate">
        </div>
      </div>
      <div class="row">
        <button
          class="col-6 btn btn-lg btn-primary btn-block"
          type="submit"
          @click.prevent="submit"
        >Add New Task</button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      categories: null,
      task: {
        taskdate: "",
        taskdomain: "",
        expectedtime: null,
        timespent: null,
        userid: null,
        userstory: ""
      }
    };
  },
  created() {
      this.$store.dispatch("getTaskCategories").then(data => {
        if(data){
          this.categories= this.$store.getters.taskcategories        
        }
      })
  },
  methods: {
    clearTask() {
      (this.task.taskdate = ""),
        (this.task.taskdomain = ""),
        (this.task.expectedtime = null),
        (this.task.timespent = null),
        (this.task.userstory = "");
    },
    submit() {
      
      let userId = sessionStorage.getItem("id");
      if (userId === null) {
        return;
      } else {
        this.task.userid = userId;
        this.$store
          .dispatch("postNewTask", this.task)
          .then((data) => {
            if(data){
            this.clearTask();
            }
          })
          .catch(err => {
            alert(err);
          });
     }
    }
  }
};
</script>

<style>
</style>
