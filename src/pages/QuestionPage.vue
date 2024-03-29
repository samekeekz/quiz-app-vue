<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute();
const subjectName = route.params.subject;
const data = ref(null);
const totalCorrect = ref(0);
const totalQuestions = ref(0);
const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const errorMessage = ref(null);
const buttonText = ref('Submit answer')

const convertIndexToLetter = (index) => {
  return String.fromCharCode(65 + index); // Convert index to ASCII character (A=65, B=66, C=67, ...)
};

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/quizzes');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const responseData = await response.json();
    data.value = responseData.filter(subject => subject.title.toLowerCase() === subjectName)[0];
    totalQuestions.value = data.value.questions.length;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const submitAnswer = () => {
  if (selectedAnswer.value === null) {
    errorMessage.value = 'Please select an answer';
    return;
  } else if(selectedAnswer.value === data.value.questions[currentQuestionIndex.value].answer) {
    totalCorrect.value++;
    buttonText.value = 'Next question'
  } else {
    errorMessage.value = 'Incorrect answer';
  }
}

const nextQuestion = () => {
  if(currentQuestionIndex.value < totalQuestions.value - 1) {
    currentQuestionIndex.value++;
    selectedAnswer.value = null;
    errorMessage.value = null;
    buttonText.value = 'Submit answer';
  } else {
    console.log(`You got ${totalCorrect.value} out of ${totalQuestions.value} correct!`);
  }
}

const submitClickHandler = () => {
  if(buttonText.value === 'Submit answer') {
    submitAnswer();
  } else {
    nextQuestion();
  }
}

onMounted(() => {
  fetchData();
})

watch(totalCorrect, () => {
  console.log(totalCorrect.value)
})



</script>

<template>
  <div v-if='data' class='flex gap-[144px]'>
    <div>
      <h1 class='mb-12 font-medium text-4xl leading-[1.2]'>{{ data.questions[currentQuestionIndex].question }}</h1>
    </div>
    <div class='flex flex-col gap-6 max-w-[564px] w-full'>
      <div v-for='(option, index) in data.questions[currentQuestionIndex].options' :key='option' @click='selectedAnswer=option' :class="{ 'selected': selectedAnswer === option }" class="flex gap-4 items-center py-[18px] px-5 border-[3px] border-solid border-transparent bg-white drop-shadow-lg rounded-3xl cursor-pointer group transition-all duration-200 ease-in-out">
        <p class='text-[28px] leading-none font-medium text-[#626C7F] px-[18px] pt-4 pb-3 bg-[#F4F6FA] rounded-lg group-hover:bg-[#F6E7FF]'>{{convertIndexToLetter(index)}}</p>
        <p class='text-[28px] leading-none font-medium text-[#313E51]'>{{ option }}</p>
      </div>
      <button @click='submitClickHandler' class='bg-[#A729F5] flex justify-center items-center w-full h-[92px] text-[28px] leading-none font-medium text-white rounded-[32px]'>{{buttonText}}</button>
      <p v-if='errorMessage'>{{errorMessage}}</p>
    </div>
  </div>
  <div v-else>Loading..</div>
</template>

<style scoped>
.selected {
  border: 3px solid #A729F5;
}

.selected p:first-child {
  background-color: #A729F5;
  color: white;
}
</style>
