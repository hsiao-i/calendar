<template>
  <!-- <div>
    <div class="row justify-content-center">
      <div class="col-4">
        <CalendarLeft class="border-end p-3" />
      </div>
      <div class="col-8">
        <CalendarRight />
      </div>
    </div>
  </div> -->
  <div>
    <div class="d-flex">
      <div class="">
        <CalendarLeft class="p-3" />
      </div>
      <div class="w-100 border-start">
        <CalendarRight />
      </div>
    </div>
    <!-- <CalendarBottom /> -->
  </div>
</template>

<script>
import CalendarRight from './components/CalendarRight.vue'
import CalendarLeft from './components/CalendarLeft.vue'
// import CalendarBottom from './components/CalendarBottom.vue'

export default {
  name: 'App',
  components: {
    CalendarRight,
    CalendarLeft
    // CalendarBottom
  }
}
</script>

<style lang="scss">
@import './assets/stylesheets/all'; //這裡import 的是 scss 資源
body {
  color: rgb(114, 113, 113);
}

.fs-6-5 {
  font-size: 14px;
}
.fs-7 {
  font-size: 12px;
}

.h7 {
  font-size: 12px;
  font-weight: border;
}

.text-white {
  color: #fff;
}

.bg-white {
  background-color: #fff;
}

.bg-gray {
  background-color: rgb(222, 221, 221);
}

.pointer {
  cursor: pointer;
}

/* 選擇當天 */
.highlightToday {
  border-radius: 50%;
  background-color: #f4a54a;
  color: #fff;
}

.text-otherday {
  color: rgb(192, 190, 189) !important;
}
</style>
