<template>
  <div class="container mx-auto flex justify-center">

    <div class="md:max-w-2xl  w-full bg-teal-400 text-white  flex  px-4 justify-between py-5  rounded-xl gap-5 md:flex-col mx-3 items-center md:items-start h-auto ">

        <p class=" font-bold md:flex-">{{ title }}</p>
        <div class=" gap-2 flex md:justify-between md:w-full ">
          <button class="bg-white text-teal-500 px-3 py-2 font-bold rounded-lg" id="show-modal"
            @click="taskStore.showModal = true">Прочитать</button>
          <button id="show-modal" class="bg-white  px-3 py-2 font-bold rounded-lg text-red-600"
            @click="$emit('delTask')">Удалить</button>
        </div>

    </div>

  </div>

  <Teleport to="body">
    <modal :show="taskStore.showModal" @close="showModal = false">
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class=" text-2xl">Запись номер {{ id }}</h3>
          <button @click="taskStore.showModal = false" class="text-4xl rotate-45 cursor-pointer p-2">+</button>

        </div>
        <hr>
      </template>
      <template #title>
        <h3 class="text-2xl mb-1">Заголовок</h3>
        <input type="text" class="border border-blue-400 px-2 py-1 rounded-lg w-full text-xl" v-model="title">
      </template>
      <template #text>
        <div class="">

          <h3 class="text-xl mb-4">Текст записи</h3>
          <textarea type="text" class="border border-blue-400 px-2 py-1 rounded-lg w-full text-lg" cols="10" rows="10"
            v-model="text"></textarea>

        </div>
        <div class="flex justify-between p-3">
          <button class=" border bg-blue-500 px-6 py-3 text-white font-bold rounded-3xl"
            @click=" update(id, title, text), taskStore.showModal = false">Сохранить</button>
        </div>
      </template>
    </modal>
  </Teleport>

</template>

<script setup>
import {useTaskStore} from '../stores/TaskStore'
const taskStore = useTaskStore()
const props = defineProps(['tasks'])
import modal from "./BaseModal.vue"
import { ref } from 'vue';
const title = defineModel('title')
const id = defineModel('id')
const text = defineModel('text')
const emits = defineEmits(['upd', 'delTask'])
const update = async (id, Ttitle, Ttext) => {
  const task = props.tasks.find(t => t.id === id)

  task.title = Ttitle
  task.text = Ttext
  const res = await fetch('http://localhost:3000/tasks/' + id, {
    method: 'PATCH',
    body: JSON.stringify({ title: Ttitle, text: Ttext }),
    headers: { 'Content-Type': 'application/json' }
  })
}

const showModal = ref(false)
</script>

<style lang="scss" scoped></style>