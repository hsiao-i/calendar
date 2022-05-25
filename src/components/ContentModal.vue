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
      <div class="content rounded-3 shadow list position-relative">
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

        <div class="p-3" ref="clear-form ">
          <h2 class="h5 mb-3">Stepn Record</h2>
          <div class="row align-items-center mb-3">
            <div class="col-4">
              <label for="title">GST </label>
            </div>
            <div class="col-8">
              <input
                type="text"
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
                type="text"
                class="form-control fs-6-5"
                placeholder="How many energy do you use?"
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
                type="text"
                class="form-control fs-6-5"
                placeholder="How many GST do you cost?"
                v-model="tempTodo.repair"
              />
            </div>
          </div>
          <div
            class="row align-items-center justify-content-between mb-3 border-bottom"
          >
            <div class="col-4">
              <p class="text-primary">GST Income</p>
            </div>
            <div class="col-8">
              <p class="text-primary">
                {{ tempTodo.gst - tempTodo.repair }}
              </p>
            </div>
          </div>

          <h2 class="h5 mb-3">ToDoList</h2>
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
                <option value="work">Work</option>
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
</template>

<script>
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
      }
    }
  },
  methods: {
    closeModal() {
      this.showed = false
      this.$emit('close-modal')
    },
    sendTodo() {
      this.$emit('add-todo', this.tempTodo)
      console.log(this.tempTodo)
    }
  },
  watch: {
    showModal(newVal, oldVal) {
      this.showed = newVal
    },
    todos() {
      this.tempTodo = this.todos
      // this.todos = this.tempTodo
    }
  },

  mounted() {
    this.showed = this.showModal
    this.tempTodo = this.todos
    console.log(this.todo)
    console.log(this.todoDate)
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
</style>
