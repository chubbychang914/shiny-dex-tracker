<template>
  <div
    class="base-button"
    :class="[`base-button--${btnSize}`, `base-button--${btnColor}`]"
    @click="$emit('onClick', $event)"
  >
    <slot name="icon"></slot>
    <div>{{ btnText }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  btnText: {
    type: String,
    default: 'Click Me'
  },
  btnSize: {
    type: String,
    default: 'medium'
  },
  btnColor: {
    type: String,
    default: 'primary'
  }
})
</script>

<style lang="scss" scoped>
.base-button {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $NavbarBg;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: $BgPrimary;
  }
  &:active {
    transform: scale(0.95);
    transition: all 0.1s ease;
  }
  &--primary {
    background-color: red;
  }
  &--secondary {
    background-color: blue;
  }
  &--tertiary {
    background-color: green;
  }
}
</style>
