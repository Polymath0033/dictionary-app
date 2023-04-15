<template>
  <div class="app">
    <Header />
    <Search @on-search="handleSearch" />
    <Main :data="data_" :error="error" :loading="loading" />
  </div>
</template>

<script lang="ts" setup>
//import { defineComponent } from "vue";
import { Ref, ref } from "vue";
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import Search from "./components/Search.vue";
import Data from "./types/Data";
const data_: Ref<Data[]> = ref([]);
const loading = ref(false);
const error: Ref<string> = ref("");
const handleSearch = async (e: string) => {
  try {
    loading.value = true;
    error.value = "";
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${e}`
    );
    const data: Data[] = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    loading.value = false;
    data_.value = [...data];
    for (const a in data_.value) {
      console.log(data_.value[a].word);
    }
    console.log(data_.value);
  } catch (e: any) {
    loading.value = false;
    error.value = e.message;
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lora:wght@400;900&display=swap");

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --background: #ffffff;
  --input-bg: rgb(244, 244, 244);
  --input-color: #757575;
  --sub-heading: #838383;
  --title: #2f2f2f;
  --toggle: #757575;
}

:root.dark {
  --background: #050505;
  --input-bg: #2d2d2d;
  --input-color: #757575;
  --title: #ffffff;
  --toggle: #a546ed;
}
#app {
  padding: 1rem;
  background-color: var(--background);
}
body {
  font-family: "Inter";
  background: var(--background);
}
.app {
  width: 70%;
  margin: 0 auto;
}
@media screen and (max-width: 620px) {
  .app {
    width: 100%;
    margin: 0 0;
  }
}
</style>
