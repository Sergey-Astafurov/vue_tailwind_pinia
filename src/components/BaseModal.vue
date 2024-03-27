<script setup>
const props = defineProps({
  show: Boolean
})
</script>

<template>
  <Transition name="modal" >
    <div v-if="show" class="flex justify-center items-center  fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 ">
      <div class="bg-white flex flex-col w-full h-full md:h-auto  md:w-1/2 p-7 rounded-lg">
        <div class="modal-header mb-3">
          <slot name="header"></slot>
        </div>
        <div class="modal-body mb-4">
          <slot name="title"></slot>
        </div>
        <div class="modal-footer mb-5">
          <slot name="text"></slot>

        </div>
      </div>
    </div>
  </Transition>
</template>

<style>







</style>