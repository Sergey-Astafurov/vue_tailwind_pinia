<template>
  <header class=" bg-teal-400 text-white p-4 mb-6">
    <div class="md:container md:mx-auto flex justify-between gap-2 items-center px-10 md:flex-col md:gap-5 ">

      <h1 class="text-2xl ">Заметки!</h1>
      <button @click=" showBtn = true" class="border-2 border-solid px-3 py-2 rounded-lg">Добавить заметку</button>

    </div>
    <Teleport to="body">
      <modal :show="showBtn" @close="showBtn = false">
        <template #header>
          <div class="flex justify-between items-center">
          <h3 class=" text-2xl"> Добавить запись</h3>
          <button @click="showModal = false" class="text-4xl rotate-45 cursor-pointer p-2">+</button>

        </div>
        <hr>
        </template>
        <template #title>
          <h3 class="text-2xl mb-4">Заголовок</h3>
          <input type="text" class="border border-blue-400 px-2 py-1 rounded-lg w-full text-xl" v-model="newTask.title">
        </template>
        <template #text>
          <div class="">
            <h3 class="text-xl mb-4">Текст записи</h3>
            <textarea type="text" class="border border-blue-400 px-2 py-1 rounded-lg w-full text-lg" cols="10"
              v-model="newTask.text" rows="10"></textarea>
          </div>
          <div class="flex justify-center  p-3">
            <button class=" px-6 py-3 border border-teal-500 rounded-xl font-bold"
              @click="$emit('close'), addTask(newTask)" :disabled="newTask.title.length < 2 ">Создать</button>

          </div>
        </template>
      </modal>
    </Teleport>
  </header>
  <div>
    <div class="flex flex-col gap-3">

      <TasksView v-for="task in tasks" :tasks="tasks" v-model:text="task.text" v-model:title="task.title" v-model:id="task.id"
        @upd="update(task)" @delTask="deleteTask(task.id)">
      </TasksView>
    </div>
  </div>

</template>

<script setup>
import modal from '@/components/BaseModal.vue'
import {  onMounted, ref } from 'vue';
import TasksView from '@/components/TasksView.vue'
const tasks = ref([])
const newTask = ref({
  title: '',
  text: '',
})
const getTask = async () => {
  const res = await fetch('http://localhost:3000/tasks')
  const data = await res.json()
  tasks.value = data

}
const showBtn = ref(false)

const addTask = async ({ title, text }) => {
  const id = String(Math.floor(Math.random() * 10000))
  tasks.value.unshift({ title, text, id: id })
  const res = await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    body: JSON.stringify({ title: title, text: text, id: id }),
    headers: { 'Content-Type': 'application/json' }
  })

  if (res.error) {
    console.log(res.error)
  }
  showBtn.value = false
  newTask.value.title = ''
  newTask.value.text = ''
}
const deleteTask = async (id) => {
  const res = await fetch('http://localhost:3000/tasks/' + id, {
    method: 'DELETE',

  })
  tasks.value = tasks.value.filter((t) => t.id !== id)
  console.log(id);
}
onMounted(() => {
  getTask()
})
</script>

<style lang="scss" scoped></style>
