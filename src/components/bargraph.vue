<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  data: () => ({
    userTasks: null,
    categories: null,
    chartdata: null,
    options: {
      title: {
        display: true,
        text: "Total Tasks Per Domain",
        fontSize: 20,
        position: "bottom"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      //   responsive: true,
      maintainAspectRatio: false
    }
  }),
  created(){
     this.$store.dispatch("getTaskCategories").then(data => {
        if(data){
          let tempcategoryarray=[];
           this.$store.getters.taskcategories.forEach((category)=>{
            tempcategoryarray.push(category.CategoryName)
           })
           this.categories=tempcategoryarray;                  
        }
      })
  },
  methods: {
    drawBarGraph() {
      const userId = sessionStorage.getItem("id");
      this.$store.dispatch("setUserTasks", userId).then(data => {
        const userTaskArray = this.$store.getters.userTasks;
        if (data) {
          this.userTasks = this.$store.getters.userTasks;
        }
        let categoryCount = [];

        this.categories.forEach(function(category) {
          const count = userTaskArray.filter(
            task => task.TaskCategory.CategoryName === category
          ).length;
          categoryCount.push(count);
        });
        let chartData = {
          labels: this.categories,
          datasets: [
            {
              label: "Categories Data",
              backgroundColor: "#f87979",
              data: categoryCount
            }
          ]
        };
        this.chartdata = chartData;
        this.renderChart(this.chartdata, this.options);
      });
    }
  },
  mounted() {   
    this.drawBarGraph();
  }
};
</script>

<style>
</style>
