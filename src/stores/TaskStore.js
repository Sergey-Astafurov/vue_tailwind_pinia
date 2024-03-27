import {defineStore} from 'pinia'
import { ref } from 'vue'
export const useTaskStore = defineStore('taskStore', ()=>{

  const showModal = ref(false)

  return{
    showModal
  }

})