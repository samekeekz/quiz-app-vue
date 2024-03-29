<script setup>
import { onMounted, ref } from 'vue'

const data = ref(null);
const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/quizzes');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    data.value = await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

onMounted(() => {
  fetchData();
})
</script>

<template>
  <div class='w-full flex gap-[144px]'>
    <div class=''>
      <h1 class='mb-12 '>Welcome to the <span>Frontend Quiz!</span></h1>
      <p>Pick a subject to get started.</p>
    </div>
    <div v-if="data" class='flex flex-col gap-6 max-w-[564px] w-full'>
      <RouterLink v-for='subject in data' :key='subject.title' :to="`/${subject.title.toLowerCase()}`" class='flex gap-4 items-center p-6 bg-white shadow-md rounded-md cursor-pointer'>
        <img :src='subject.icon' alt='icon' class='w-12 h-12' />
        <p class='text-lg font-semibold'>{{ subject.title }}</p>
      </RouterLink>
    </div>
    <div v-else>Loading..</div>
  </div>
</template>

<style scoped>

</style>