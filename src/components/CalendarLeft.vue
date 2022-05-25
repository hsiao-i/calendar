<template>
  <div class="w-container">
    <!-- 表頭 -->
    <div class="border text-center py-2">
      <i class="bi bi-caret-left-fill pointer" @click="monthButton(-1)"></i>
      {{ year }} 年 {{ month }} 月
      <i class="bi bi-caret-right-fill pointer" @click="monthButton(1)"></i>
    </div>

    <!-- 星期 -->
    <div>
      <div class="d-flex flex-wrap text-center mt-3 fs-7">
        <div class="daybox" v-for="(week, i) in week" :key="i">
          {{ week }}
        </div>
      </div>
    </div>

    <div>
      <div class="d-flex flex-wrap text-center mt-2 pointer">
        <!-- 前一個月日期 -->
        <div
          class="mb-2 daybox text-otherday"
          v-for="day in lastMonth"
          :key="day"
        >
          <div class="day mx-auto fs-7">
            {{ day }}
          </div>
        </div>
        <!-- 當月日期 -->
        <div
          class="mb-2 daybox fs-7"
          v-for="(day, day_id) in thisMonth"
          :key="day_id"
        >
          <!-- :class="day_id === selected_day ? 'active' : ''"
          @click="selected_day = day_id"

           year === today.getFullYear() &&
            month === today.getMonth() + 1 &&
            day === today.getDate() ? 'text-today' : '' -->
          <div
            class="day mx-auto fs-7"
            :class="{
              highlightToday:
                year === today.getFullYear() &&
                month === today.getMonth() + 1 &&
                day === today.getDate(),
              active: day_id === selected_day
            }"
            @click="selected_day = day_id"
          >
            {{ day }}
          </div>
          <!-- <div class="lunar fs-8">初一</div> -->
        </div>

        <!-- 下個月日期 -->
        <div
          class="mb-2 daybox text-otherday"
          v-for="day in nextMonth"
          :key="day"
        >
          <div class="day mx-auto fs-7">
            {{ day }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      week: ['日', '一', '二', '三', '四', '五', '六'],
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      selected_day: 0,
      today: new Date()
    }
  },
  computed: {
    lastMonth() {
      const days = []
      const current = new Date(this.year, this.month - 1, 1) // 確認該年月的第一天，因月份是由 0-11，0 表示 1 月份，因此要確切抓到當月，month 要減 1
      const firstDay = current.getDay() // 取得這個月份的第一天是星期幾，數字會回傳 0-6，星期一回傳 1，星期天回傳 0
      for (let i = firstDay; i > 0; i--) {
        const temp = new Date(current)
        temp.setDate(current.getDate() - i) // 先設定出往後有幾天
        days.push(temp.getDate()) // 取出該天的「日」

        // 假設今天日期是 2022.04.01，使用 day.setDate(1)，就會回傳 2022.04.01（setDate 補充 https://www.victsao.com/blog/81-javascript/218-javascript-date-setdate）
        // temp.setDate()，括號內一般會放 1~31，setDate(0) 表示會讓日期是前一個月的最後一天；setDate(-1) 前一個月的倒數第二天。
        // 假設原本日期為 2022-04-01 使用 setDate(0)，就會是 2022-03-31
        // current.getDate 取出當前的日期 (4/1 就會取出 1)。在 for 迴圈裡，例如今天是 1 號，temp.setDate(current.getDate() - i)，setDate(current.getDate() - i) 就會是 5-5, 4-5, 3-5, 2-5, 1-5, 0-5。也就是 4/1 往後倒數 5 天
        //
      }
      return days
    },
    thisMonth() {
      const days = []
      const totalDay = new Date(this.year, this.month, 0)
      for (let i = 1; i <= totalDay.getDate(); i++) {
        days.push(i)
      }
      return days
    },
    nextMonth() {
      const days = []
      const surplus = 42 - this.lastMonth.length - this.thisMonth.length
      for (let i = 1; i <= surplus; i++) {
        days.push(i)
      }
      return days
    }
  },
  methods: {
    monthButton(adjust) {
      this.month += adjust

      if (this.month > 12) {
        this.year += 1
        this.month = 1
      } else if (this.month < 1) {
        this.year -= 1
        this.month = 12
      }
    }
  }
}
</script>

<style scoped>
.w-container {
  width: 250px;
}

.seven-width {
  width: calc(100% / 7);
}

/* .click {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #ffbb66;
} */

.daybox {
  width: calc(100% / 7);
}

.day {
  width: 22px;
  height: 22px;
  padding-top: 2px;
}

/* 點擊選取 */
.active {
  border-radius: 50%;
  background-color: #fcf2db;
  color: rgb(71, 38, 12);
}
</style>
