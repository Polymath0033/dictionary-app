<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  theme: { type: String, required: true },
});
const emit = defineEmits<{
  (e: "toggle-theme"): string;
}>();
const handleToggle = () => {
  emit("toggle-theme");
};
</script>
<template>
  <label for="checkbox" class="label">
    <input
      type="checkbox"
      id="checkbox"
      class="checkbox"
      @change="handleToggle"
    />
    <span class="inner"></span>
  </label>
</template>
<style scoped>
.label {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 20px;
  margin-left: 1rem;
}
.label input {
  opacity: 0;
  width: 0;
  height: 0;
}
.inner {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #757575;
  transition: 0.4s;
  border-radius: 34px;
}
.inner::before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 3px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}
input:checked + .inner {
  background-color: #a546ed;
}
input:focus + .inner {
  box-shadow: 0 0 1px #a546ed;
}
input:checked + .inner::before {
  transform: translateX(26px);
}
</style>
