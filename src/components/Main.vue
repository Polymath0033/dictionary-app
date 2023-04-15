<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<script lang="ts" setup>
import Data from "@/types/Data";
import { defineProps } from "vue";
defineProps<{ data: Data[]; error: unknown; loading: boolean }>();
</script>
<template>
  <main :error="error" :loading="loading" :data="data">
    <div class="loading" v-if="loading">
      <span :class="`circle animation-${a}`" v-for="a in 3" :key="a"></span>
    </div>
    <div v-if="error" class="loading error">{{ error }}</div>
    <div v-show="!loading && !error" v-for="dic in data" :key="dic.word">
      <div class="div">
        <h1 v-if="dic.phonetics.length !== 0">
          {{ dic.word }}<br />
          <span class="sound">{{ dic.phonetic }}</span>
        </h1>
      </div>
      <div v-for="meaning in dic.meanings" :key="meaning.partOfSpeech">
        <h3 class="speech">{{ meaning.partOfSpeech }}</h3>
        <p class="title">Meaning</p>
        <ul class="meaning">
          <li v-for="mean in meaning.definitions" :key="mean.definition">
            {{ mean.definition }} <br /><span class="example">{{
              mean.example
            }}</span>
          </li>
        </ul>
        <div class="margin">
          <ul class="synonyms">
            <li v-if="meaning.synonyms.length !== 0">Synonyms</li>
            <li v-for="synonyms in meaning.synonyms" :key="synonyms">
              {{ synonyms }}
            </li>
          </ul>
        </div>

        <div class="margin">
          <ul class="synonyms">
            <li v-if="meaning.antonyms.length !== 0">Antonyms</li>

            <li v-for="antonyms in meaning.antonyms" :key="antonyms">
              {{ antonyms }}
            </li>
          </ul>
        </div>
      </div>

      <div class="margin">
        <ul class="source">
          <li>Source</li>
          <li v-for="source in dic.sourceUrls" :key="source">{{ source }}</li>
        </ul>
      </div>
    </div>
  </main>
</template>
<style scoped>
.loading {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  height: 60vh;
  z-index: 1000;
  background-color: var(--background);
}
.error {
  font-size: 2rem;
  color: red;
  font-weight: 900;
}
.circle {
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: #a546ed;
}
.animation-1 {
  animation: animation 1s ease-in 0.3s infinite;
}
.animation-2 {
  color: red;
  animation: animation 1s ease-in 0.6s infinite;
}
.animation-3 {
  animation: animation 1s ease-in 0.9s infinite;
}
@keyframes animation {
  from {
    background-color: #a546ed;
  }
  to {
    background-color: #ff00bf;
  }
}
main {
  margin-top: 2rem;
}
.div {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.div h1 {
  font-weight: bold;
  color: var(--title);
}
.div img {
  width: 60px;
  height: 60px;
  cursor: pointer;
}
.sound {
  color: #a546ed;
  font-size: 0.8rem !important;
  font-size: 400 !important;
  margin-top: 0.5rem;
  margin-left: 0.1rem;
  position: relative;
}

.speech {
  color: var(--title);
  margin-top: 2rem;
  padding-right: 3rem;
  position: relative;
  z-index: 100;
  font-style: italic;
}

.speech::after {
  width: 80%;
  height: 2px;
  background-color: var(--input-bg);
  content: "";
  position: absolute;
  right: 0;
  top: 15px;
}
.title {
  color: #aeaeae;
  margin: 2rem 0 1rem 0;
  font-weight: bold;
}
.meaning {
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-left: 2rem;
}
.meaning li {
  padding: 0.4rem;
  color: var(--title);
  font-weight: 600;
}
.meaning li::before {
  color: #a546ed;
  content: "\2022";
  font-weight: bold;
  width: 1rem;
  margin-left: -1rem;
  display: inline-block;
}
.example {
  color: #aeaeae;
  margin-top: 0.8rem;
}
.synonyms-text {
  color: #aeaeae;
  padding-right: 1rem;
  font-weight: bold;
}
.margin {
  margin: 2rem 0 1rem 0;
}
.synonyms,
.source {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.synonyms li {
  display: flex;
  color: #a546ed;
  font-weight: bold;
}
.synonyms li:first-of-type,
.source li:first-of-type {
  color: #aeaeae;
  padding-right: 1.2rem;
  text-decoration: none;
  font-weight: 500;
}
.source li {
  color: var(--title);
  text-decoration: underline;
}
li {
  line-height: 1.5;
}
</style>
