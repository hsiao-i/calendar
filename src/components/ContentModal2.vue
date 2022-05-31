<template>
  <div
    class="position-fixed top-0 start-0 h-100 w-100"
    :class="showed ? 'opacity-100' : 'opacity-0 pe-none'"
  >
    <!-- 讓 modal false 的時候，會是完全透明，且無法點擊；true 的時候是完全顯現 -->
    <!-- 覆蓋層 -->
    <div
      class="position-absolute d-flex justify-content-center align-items-center top-0 start-0 h-100 w-100"
    >
      <!-- 內容層 -->
      <div
        class="content rounded-3 shadow list position-relative "
      >
        <div
          class="d-flex justify-content-between align-items-center bg-primary px-2 py-1 rounded-top sticky-top"
        >
          <div class="text-white">
            {{ todosDate.month + 1 }} / {{ todosDate.date }}
          </div>

          <div>
            <!-- <div class="x-button"> -->

            <i
              class="bi bi-x fs-4 text-white text-end x-button"
              @click="closeModal"
            ></i>
            <!-- </div> -->
          </div>
        </div>

        <div>
          <ul
            class="nav nav-pills py-3 ms-3"
            id="pills-tab"
            ref="tab"
            role="tablist"
          >
            <li class="nav-item me-1" role="presentation">
              <button
                class="nav-link active btn-sm"
                id="pills-stepn-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-stepn"
                type="button"
                role="tab"
                aria-controls="pills-stepn"
                aria-selected="true"
              >
                Stepn
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link btn-sm"
                id="pills-note-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-note"
                type="button"
                role="tab"
                aria-controls="pills-note"
                aria-selected="false"
              >
                Note
              </button>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active p-3"
              id="pills-stepn"
              role="tabpanel"
              aria-labelledby="pills-stepn-tab"
            >
              <h2 class="h5 mb-3">Stepn Record</h2>
              <div class="row align-items-center mb-3">
                <div class="col-4">
                  <label for="title">GST </label>
                </div>
                <div class="col-8">
                  <input
                    type="number"
                    class="form-control fs-6-5"
                    placeholder="How many GST do you earn?"
                    v-model="tempTodo.gst"
                  />
                </div>
              </div>
              <div class="row align-items-center mb-3">
                <div class="col-4">
                  <label for="title">Resilience</label>
                </div>
                <div class="col-8">
                  <input
                    type="number"
                    class="form-control fs-6-5"
                    placeholder="How many resilience do you use?"
                    v-model="tempTodo.resilience"
                  />
                </div>
              </div>
              <div class="row align-items-center mb-3">
                <div class="col-4">
                  <label for="title">Repair</label>
                </div>
                <div class="col-8">
                  <input
                    type="number"
                    class="form-control fs-6-5"
                    placeholder="How many GST do you cost?"
                    v-model="tempTodo.repair"
                  />
                </div>
              </div>
              <div class="row align-items-center justify-content-between mb-3">
                <div class="col-4">
                  <p class="text-primary">GST Income</p>
                </div>
                <div class="col-8">
                  <p
                    v-if="!tempTodo.gst || !tempTodo.repair"
                    class="text-primary"
                  >
                    0
                  </p>
                  <p class="text-primary" v-else>
                    {{ tempTodo.gst - tempTodo.repair }}
                  </p>
                  <!-- <input type="text" class="form-control" v-model="income" /> -->
                  <!-- <p class="text-primary">
                    {{ calculate }}
                  </p> -->
                </div>
              </div>
              <div class="text-end">
                <button
                  type="button"
                  class="btn btn-primary text-white"
                  @click="sendTodo()"
                >
                  Save
                </button>
              </div>
            </div>
            <div
              class="tab-pane fade p-3"
              id="pills-note"
              role="tabpanel"
              aria-labelledby="pills-note-tab"
            >
              <h2 class="h5 mb-3">Note</h2>
              <div class="row align-items-center mb-3">
                <div class="col-4">
                  <label for="title">Title</label>
                </div>
                <div class="col-8">
                  <input
                    type="text"
                    class="form-control fs-6-5"
                    placeholder="Add Your Title"
                    v-model="tempTodo.title"
                  />
                </div>
              </div>

              <div class="row align-items-center mb-3">
                <div class="col-4">
                  <label for="Category">Category</label>
                </div>
                <div class="col-8">
                  <select
                    name="category"
                    id="category"
                    class="form-select fs-6-5"
                    v-model="tempTodo.category"
                  >
                    <option
                      value="work"
                      style="background-color: pink; color: purple"
                    >
                      Work
                    </option>
                    <option value="Life">Life</option>
                    <option value="Dating">Dating</option>
                  </select>
                </div>
              </div>
              <div class="row align-items-start mb-3">
                <div class="col-4">
                  <label for="title">Note</label>
                </div>
                <div class="col-8">
                  <textarea
                    name="note"
                    id="note"
                    rows="5"
                    class="form-control w-100 fs-6-5"
                    placeholder="Add note"
                    v-model="tempTodo.note"
                  ></textarea>
                </div>
              </div>
              <div class="text-end">
                <button
                  type="button"
                  class="btn btn-primary text-white"
                  @click="sendTodo()"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import bootstrap from 'bootstrap/js/dist/tab'
import Tab from 'bootstrap/js/dist/tab'

import { nanoid } from 'nanoid'
export default {
  props: {
    showModal: {},
    todos: {},
    todosDate: {}
  },
  data() {
    return {
      showed: false,
      tempTodo: {
        id: nanoid()
        // income: '0'
      },
      income: 0,
      tab: ''
    }
  },
  methods: {
    closeModal() {
      this.showed = false
      this.$emit('close-modal')
      this.temp = {}
    },
    sendTodo() {
      this.$emit('add-todo', this.tempTodo)
      console.log(this.tempTodo)
    }
    // calculate() {
    //   if (this.tempTodo.gst) {
    //     return this.tempTodo.gst - this.tempTodo.repair
    //   }
    // }
  },
  // computed: {
  //   calculate() {
  //     return this.tempTodo.income = this.tempTodo.gst - this.tempTodo.repair
  //   }
  // },

  watch: {
    showModal(newVal, oldVal) {
      this.showed = newVal
    },
    todos() {
      //   this.tempTodo.income = this.gst - this.repair
      this.tempTodo = this.todos
      // this.todos = this.tempTodo
      this.income = this.tempTodo.gst - this.tempTodo.repair
    },
    income() {
      // if (this.tempTodo.gst) {
      //   this.income = this.calculate
      // }
    }
    // calculate() {
    //   this.income = this.calculate
    // }
  },
  computed: {
    // calculate() {
    //   return this.tempTodo.gst - this.tempTodo.repair
    // }
    // calculate: {
    //   get() {
    //     return (this.income = this.calculate)
    //   },
    //   set(newValue) {
    //     let newValue = this.income
    //     this.income = this.tempTodo.gst - this.tempTodo.repair
    //   }
    // }
  },

  mounted() {
    this.showed = this.showModal
    this.tempTodo = this.todos
    // this.tempTodo.income = this.gst - this.repair

    this.tab = new Tab(this.$refs.tab)
    this.tab.show()
  }
}
</script>

<style scoped>
.content {
  width: 400px;

  background-color: #fff;
}

.x-button {
  cursor: pointer;
  width: 30px;
  height: 30px;
  padding: 0 2px;
}

.x-button:hover {
  border-radius: 50%;
  background-color: #fcc382;
  transition: background-color 0.5s;
}

input:focus {
  outline: none;
}

input::-webkit-input-placeholder,
textarea::-webkit-textarea-placeholder {
  color: rgb(192, 190, 189);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #976c3a;
}

.modal {
  width: 400px;
  height: 300px;
  background-color: #fff;
  /* overflow: auto; */
}
.list {
  overflow-y: scroll;
  height: 70vh;

  /* overflow: hidden; */
  /* scro */
  /* scroll-behavior: smooth; */
}
/* .active {
  background-color: #fcf2db;
  color: rgb(84, 45, 15);
} */

/* .active:hover {
  background-color: #fcf5e5;
} */

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: #fcf5e5;
  color: #976c3a;
}

.nav-link {
  color: rgb(114, 113, 113);
}
.nav-link:hover {
  background-color: #fdfbf5;
  color: rgb(114, 113, 113);
}

.z-index {
  z-index: 3;
}
</style>
