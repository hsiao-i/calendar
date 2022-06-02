<template>
  <div class="mt-3">
    <h2 class="h4 ms-2">
      {{ calendar.year }} 年 {{ calendar.month + 1 }} 月
      <i
        class="bi bi-caret-left-fill pointer text-secondary ms-2"
        @click="changeMonth(-1)"
      ></i>
      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        @click="setToday"
      >
        今天
      </button>
      <i
        class="bi bi-caret-right-fill pointer text-secondary"
        @click="changeMonth(1)"
      ></i>
    </h2>
    <ul class="d-flex list-unstyled mt-3 border-top pt-3">
      <div v-for="weekDay in week" :key="weekDay" class="weekDay text-center">
        {{ weekDay }}
      </div>
    </ul>

    <ul class="d-flex list-unstyled flex-wrap border-bottom">
      <li
        v-for="(day, i) in calendarAllDay"
        :key="day"
        class="day border-end border-top position-relative px-2 list z-index-0"
        @click="openModal(day, 'new')"
      >
        <!-- @click="showed = true" @click="addTodo(day)"
        @click="openModal(day.id)"-->
        <div class="bg-white sticky-top z-index-1 pt-1">
          <div
            class="bgToday mx-auto"
            :class="{
              highlightToday:
                calendarAllDay[i].year === today.year &&
                calendarAllDay[i].month === today.month &&
                calendarAllDay[i].date === today.date
            }"
          >
            <h3
              class="h7 text-center pt-1"
              :class="{
                textOtherday: calendarAllDay[i].month !== calendar.month
              }"
            >
              {{ day.date }}
            </h3>
          </div>
        </div>

        <!-- <div class="text-start">{{ calendarAllDay[i].count }}</div> -->

        <ul
          v-for="item in day.todos"
          :key="item"
          class="list-unstyled fs-7 text-start pt-1 z-index--1"
        >
          <li
            class="bg-warning pointer li-hover rounded-10 px-1"
            @click.stop="openModal(day, 'edit', item)"
            v-if="item.gst"
          >
            GST {{ item.gst - item.repair }}
          </li>
          <li
            class="pointer li-hover px-1 word"
            @click.stop="openModal(day, 'edit', item)"
            v-if="item.title"
          >
            <div class="d-flex align-items-center">
              <div>
                <div class="dot me-1"></div>
              </div>
              <p class="mb-0">{{ item.title }}</p>
            </div>
          </li>
        </ul>

        <!-- <div v-for="todo in currentDate.todos" :key="todo">
          {{ todo }}
        </div> -->
      </li>
    </ul>
  </div>
  <!-- <div>
    <div v-for="(item, i) in currentMonth" :key="i">
      {{ item.month + 1 }} / {{ item.date }}
      {{ item.todos.note }}
      <ul v-for="(todo, i) in item.todos" :key="i" class="list-unstyled">
        <li>
          <input type="checkbox" v-model="todo.done" />
          <span @click="editTodo(todo)">{{ todo.note }}</span>
          <span>{{ todo.gst }}</span>
          <button
            type="button"
            class="btn btn-primary"
            @click="deleteTodo(item, i)"
          >
            刪除
          </button>
        </li>
      </ul>
    </div>
  </div>
  <div v-for="(item, i) in currentMonth" :key="i">
    {{ item.month + 1 }} / {{ item.date }}
    <ul v-for="(todo, i) in item.todos" :key="i" class="list-unstyled">
      <li>
        <input type="checkbox" v-model="todo.done" />
        <span @click="editTodo(todo)">{{ todo.gst }}</span>
        <button
          type="button"
          class="btn btn-primary"
          @click="deleteTodo(item, i)"
        >
          刪除
        </button>
      </li>
    </ul>
  </div> -->

  <!-- modal -->

  <ContentModal2
    :showModal="showed"
    @closeModal="closeModal()"
    :todos="temp"
    @add-todo="addTodo(todosDate)"
    :todosDate="todosDate"
  >
  </ContentModal2>
  <CalendarBottom />
  <!-- {{ calculateMonthIncome }} -->
</template>

<script>
import ContentModal2 from './ContentModal2.vue'
import CalendarBottom from './CalendarBottom.vue'
import { nanoid } from 'nanoid'
export default {
  components: {
    ContentModal2,
    CalendarBottom
  },
  data() {
    return {
      week: ['日', '一', '二', '三', '四', '五', '六'],
      today: {
        year: 0,
        month: 0,
        day: 0, // 星期幾
        date: 0
      },
      calendar: {
        year: 0,
        month: 0,
        day: 0, // 星期幾
        date: 0
      },
      showed: false,
      editShowed: false,
      todos: {
        2022: {
          4: {
            11: [
              {
                id: nanoid(),
                gst: 10,
                resilience: 0,
                repair: 2,
                income: 13,
                title: '你好',
                category: 'work',
                note: 'write something'
              }
            ]
          },
          5: {
            20: [
              {
                id: nanoid(),
                gst: 30,
                resilience: 0,
                repair: 10,
                title: 'I can not',
                category: 'work',
                note: 'sport'
              }
            ]
          }
        }
      },
      // JSON.parse(localStorage.getItem('todos')) || [],

      // info: [
      //   {
      //     id: nanoid(),
      //     gst: 10,
      //     resilience: 0,
      //     repair: 2,
      //     title: '你好',
      //     category: '',
      //     note: ''
      //   },
      //   {
      //     id: nanoid(),
      //     gst: 8,
      //     resilience: 0,
      //     repair: 1,
      //     title: '你好2',
      //     category: '',
      //     note: ''
      //   }
      // ],
      temp: {
        // id: nanoid(),
        gst: '',
        resilience: '',
        repair: '',
        income: '',
        title: '',
        category: '',
        note: ''
      },
      tempTodoOut: {},
      todosDate: {}, // 點擊到的那一天的年月日
      isNew: true,
      monthIncome: 0,
      monthIncomeSave: []
    }
  },
  methods: {
    deleteTodo(item, i) {
      if (window.confirm('是否確認刪除')) {
        item.todos.splice(i, 1)
      }
    },
    // editTodo2(todo) {
    //   const content = window.prompt('請輸入修改內容', todo.content)
    // todo.content 等於是把原始內容帶給他

    //   if (content.trim()) {
    //     todo.content = content.trim()
    //   }
    // },
    // editTodo(item) {
    //   this.showed = true
    //   if (item) {
    //     this.temp = item
    //   }
    // },
    addTodo({ year, month, date }) {
      // const content = window.prompt('請輸入內容', '')
      // if (content.trim()) {
      // this.tempTodoOut = tempTodo
      // console.log(tempTodo)
      // console.log(this.temp)
      // console.log(this.tempTodoOut)
      const content = this.temp

      content.income = this.temp.gst - this.temp.repair
      console.log(content.income)

      // const id = nanoid()
      // const content = tempTodo
      // console.log(this.temp)

      const y = this.todos[year] || {}
      const m = this.todos[year][month] || {}
      let d = this.todos[year][month][date] || []
      // const gstincome = this.todos[year][month][date].income

      if (content && this.isNew === true) {
        // let monthTotal = ''
        content.id = nanoid()
        d.push(content)

        // 指定到年之後，把他的整包物件塞進去
        this.todos[year] = y
        this.todos[year][month] = m
        this.todos[year][month][date] = d

        this.monthIncomeSave.push({ id: content.id, income: content.income })
        console.log(this.monthIncomeSave)

        let cal = 0
        this.monthIncomeSave.forEach((item) => {
          cal += item.income
        })
        this.monthIncome = cal
      } else if (content && this.isNew === false) {
        d = this.temp
        this.temp.income = this.temp.gst - this.temp.repair

        const filter = this.monthIncomeSave.filter((item) => {
          return d.id === item.id
        })
        // 找到 index 位置
        const index = this.monthIncomeSave.indexOf(filter[0])

        // 更新 income 的數字
        this.monthIncomeSave[index].income = this.temp.income

        let cal = 0
        this.monthIncomeSave.forEach((item) => {
          cal += item.income
          // console.log(item.income)
        })
        this.monthIncome = cal

        // console.log('edit')
        // console.log(this.monthIncome)
      }

      this.temp = {}
      this.closeModal()
    },
    getTodos({ year, month, date }) {
      return year in this.todos &&
        month in this.todos[year] &&
        date in this.todos[year][month]
        ? this.todos[year][month][date]
        : []
    }, //   確認 todo 裡面是有年月日的，然後再取到裡面的content資料，主要就是把 todo 拿出來
    openModal(day, status, item) {
      this.showed = true
      this.todosDate = day
      this.temp = {}
      if (status === 'new') {
        this.temp = {}
        this.isNew = true
        // console.log('new')
      } else if (status === 'edit') {
        this.temp = item
        this.isNew = false
        // console.log('edit', this.temp)
      }
      // console.log(day)
      // console.log(day)
      // console.log(this.todosDate)
      // console.log(day.todos)

      // if (status === 'edit') {
      //   this.temp = { ...item }
      //   console.log('edit')
      // } else if (status === 'new') {
      //   this.temp = {}
      //   console.log('new')
      // }

      // console.log(this.todos)
      // if (day.todos && day.id === this.temp.id) {
      //   this.temp = { ...day.todos }
      // } else {
      //   this.temp = {}
      // }
    },
    // openEditModal(item) {
    //   this.showed = true
    //   console.log(item)
    //   console.log(this.todos)

    //   if (item) {
    //     this.temp = item
    //     console.log(this.temp)
    //   }
    // },
    closeModal() {
      this.showed = false
    },

    setToday() {
      const date = new Date()
      this.today.year = this.calendar.year = date.getFullYear()
      this.today.month = this.calendar.month = date.getMonth()
      this.today.day = this.calendar.day = date.getDay()
      this.today.date = this.calendar.date = date.getDate()
    },
    changeYear(adjust) {
      this.calendar.year += adjust
    },
    changeMonth(adjust) {
      const month = this.calendar.month + adjust
      if (month > 11) {
        this.changeYear(1)
        this.calendar.month = 0
      } else if (month < 0) {
        this.changeYear(-1)
        this.calendar.month = 11
      } else {
        this.calendar.month = month
      }
    }
    // calIncomeMonth() {
    //   console.log(this.getTodos)
    // }
  },
  // watch: {
  //   income() {
  //     this.income = this.temp.gst - this.temp.repair
  //   }
  // },
  computed: {
    calendarFirstDay() {
      const first = new Date(this.calendar.year, this.calendar.month, 1)
      const date = new Date(
        this.calendar.year,
        this.calendar.month,
        1 - first.getDay()
      ) // 取到日曆左上角第一天

      // 回傳左上角第一天的年月日
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        day: date.getDay()
      }
    },
    calendarAllDay() {
      const data = []
      let allDate
      for (let i = 0; i < 42; i++) {
        allDate = new Date(
          this.calendarFirstDay.year,
          this.calendarFirstDay.month,
          this.calendarFirstDay.date + i
        )
        const d = {
          year: allDate.getFullYear(),
          month: allDate.getMonth(),
          date: allDate.getDate(),
          day: allDate.getDay()
        }
        d.count = this.getTodos(d).length // getTodos 為了拿到當天的 todo，並使用 d.count 計算有幾件事
        d.todos = this.getTodos(d)
        // d.id = nanoid()
        // 這樣到時候要顯示 todolist 的時候可以用
        d.gst = this.getTodos(d).income
        // console.log(this.getTodos(d).income)
        data.push(d)
      }

      return data
    },
    // 顯示這個月全部的 todolist
    currentMonth() {
      return this.calendarAllDay.filter((data) => {
        return data.month === this.calendar.month && data.count
      })
    }
    // calIncomeMonth() {
    //   return this.getTodos()
    // }

    // calculateMonthIncome({ year, month, date }) {
    //   let total = ''
    //   const gst = this.todos[year][month][date].gst
    //   gst.forEach((item) => {
    //     total += item
    //   })
    //   return total
    // }
    // calculateGst() {
    //   return this.temp.gst - this.temp.repair
    // }
  },
  // watch: {
  //   todos: {
  //     handler() {
  //       localStorage.setItem('todos', JSON.stringify(this.todos))
  //     },
  //     deep: true
  //   }
  // },
  mounted() {
    this.setToday()
  }
}
</script>

<style scoped>
.weekDay {
  width: calc(100% / 7);
}
.day {
  width: calc(100% / 7);
  height: calc(75vh / 6);
}

.bgToday {
  width: 22px;
  height: 22px;
}

.list {
  overflow-y: scroll;

  scroll-behavior: smooth;
}
.list-x {
  white-space: nowrap;
  overflow: hidden;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #976c3a;
}

.income {
  width: 90%;
  border-radius: 5px;
  background-color: #fcf2db;
  color: rgb(71, 38, 12);
  text-align: center;
}

.space {
  letter-spacing: 0.3px;
}

.rounded-10 {
  border-radius: 10px;
}

.li-hover:hover {
  background-color: #faf4ec !important;
  border-radius: 10px;
  padding: 0px 4px;
}
.z-index-1 {
  z-index: 1;
}
.z-index-0 {
  z-index: 0;
}

.word {
  overflow: hidden;
  white-space: nowrap;
}
/* .zindex {
  z-index: ;
}

.zindex-2 {
  z-index: -3;
} */
</style>
