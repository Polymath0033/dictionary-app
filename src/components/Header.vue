<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<script setup lang="ts">
import ThemeBtn from "./ThemeBtn.vue";
import { ref, onMounted, computed } from "vue";

import type { Ref } from "vue";
import type Font from "@/types/Font";
const theme: Ref<string> = ref("light");
const fonts: Ref<Font[]> = ref([
  { font: "Inter", name: "Sans Serif" },
  { font: "Lora", name: "Serif" },
  { font: "Inconsolata", name: "Mono" },
]);
const font: Ref<string | undefined> = ref("Sans Serif");
const toggleFont = (e: string) => {
  const find: Font[] | undefined = fonts.value.filter((f) => f.name === e);

  font.value = find[0].name;
  document.body.style.fontFamily = find[0].font || "Inter";
  tab.value = false;
};
const tab: Ref<boolean> = ref(false);
const toggleTab: () => boolean | null = () => (tab.value = !tab.value);
const toggleTheme = () => {
  const activeTheme = getTheme();
  if (activeTheme === "light") {
    setTheme("dark");
  } else {
    setTheme("light");
  }
};
const style = computed(() =>
  tab.value ? `rotate(${180}deg)` : `rotate(${0}deg)`
);
const getMediaPreference = () => {
  const darkPreference: boolean = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;
  if (darkPreference) {
    return "dark";
  } else {
    return "light";
  }
};
const setTheme = (theme_: string) => {
  localStorage.setItem("theme", theme_);
  theme.value = theme_;
  document.documentElement.className = theme_;
};
const getTheme: () => string | null = () => {
  return localStorage.getItem("theme");
};
onMounted(() => {
  const init_theme = getTheme() || getMediaPreference();
  if (init_theme) {
    setTheme(init_theme);
  }
});
</script>
<template>
  <header>
    <img src="../assets/logo.svg" alt="logo" />
    <div class="side">
      <div class="font">
        <h4>{{ font }}</h4>
        <ul v-if="tab" class="tab">
          <li
            v-for="(font, index) in fonts"
            :key="index"
            @click="toggleFont(font.name)"
          >
            {{ font.name }}
          </li>
        </ul>
        <img
          @click="toggleTab"
          src="../assets/icon-arrow-down.svg"
          :style="{ transform: style }"
        />
      </div>
      <theme-btn :theme="theme" @toggle-theme="toggleTheme" />
      <i class="bi bi-moon"></i>
    </div>
  </header>
</template>
<style scoped>
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.font {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.4rem;
}
.font h4 {
  font-weight: bold;
  font-size: 0.81rem;
  width: 80px;
  color: var(--title);
}
.side {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.tab {
  position: absolute;
  top: 20px;
  box-shadow: 0 2px 10px var(--toggle);
  list-style: none;
  z-index: 10000;
  margin: 0;
  padding: 0;
  width: 100%;
  border-radius: 10px;
}
.tab li {
  cursor: pointer;
  font-weight: bold;
  padding: 0.2rem 0.6rem;
  color: var(--title);
  font-weight: bold;
  font-size: 0.81rem;
}
.tab li:first-child {
  padding-top: 0.9rem;
}
.tab li:last-child {
  padding-bottom: 0.9rem;
}
.tab li:hover {
  color: var(--toggle);
}
i {
  color: var(--toggle);
}
.font::after {
  position: absolute;
  right: -15px;
  content: "";
  width: 2px;
  height: 30px;
  background-color: var(--input-bg);
  z-index: 1000;
  /* margin-right: 2rem; */
}
</style>
