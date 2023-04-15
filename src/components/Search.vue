<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<script lang="ts" setup>
import { defineEmits, ref } from "vue";
import type { Ref } from "vue";
const input: Ref<string> = ref("");

const emit = defineEmits<{
  (e: "on-search", input: string): void;
}>();
const handleSearch = (e: KeyboardEvent) => {
  if (input.value === "") {
    return;
  }
  if (e.key === "Enter") {
    emit("on-search", input.value.toLowerCase());
  }
};
</script>
<template>
  <div class="search">
    <input
      v-model.trim="input"
      type="search"
      @keydown="handleSearch"
      placeholder="Search for any word"
    />
    <i
      class="bi bi-search"
      v-on:click="emit('on-search', input.toLocaleUpperCase())"
    ></i>
  </div>
</template>
<style scoped>
.search {
  width: 100%;
  position: relative;
}
.search input {
  width: 100%;
  display: flex;
  padding: 0.8rem 0.6rem;
  background-color: var(--input-bg);
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--title);
  font-family: inherit;
}

.search i {
  position: absolute;
  right: 8px;
  z-index: 10000;
  top: 10px;
  color: var(--toggle);
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
