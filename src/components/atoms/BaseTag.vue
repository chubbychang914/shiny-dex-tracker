<template>
  <span
    class="tag"
    :class="[`tag--${variant}`]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
type TagVariant =
  | ''
  | 'highlight'
  | 'highlight-normal'
  | 'highlight-alert'
  | 'highlight-promo'
  | 'status-new'
  | 'status-warning'
  | 'status-error'
  | 'status-cancel'
  | 'status-done'
  | 'status-processing'
  | 'status-not-started'

withDefaults(
  defineProps<{
    variant?: TagVariant
  }>(),
  {
    variant: ''
  }
)
</script>

<style lang="scss" scoped>
.tag {
  display: inline-flex;
  align-items: center;
  line-height: 1.4;
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 13px;
  font-weight: 600;
  background-color: gray;
  color: black;

  // highlight group
  &--highlight {
    background-color: #15beae;
    color: white;
  }

  &--highlight-normal {
    background-color: mintcream;
    color: white;
  }

  &--highlight-alert {
    background-color: orange;
    color: white;
  }

  &--highlight-promo {
    background-color: yellow;
    color: black;
  }

  // status group
  &--status-new {
    background-color: mint300;
    color: mint800;
  }

  &--status-warning {
    background-color: orange;
    color: orange;
  }

  &--status-error {
    background-color: rgba(235, 62, 27, 0.1);
    color: red;
  }

  &--status-cancel {
    background-color: gray;
    color: lightgray;
  }

  &--status-done {
    background-color: mint200;
    color: #15beae;
  }

  &--status-processing {
    background-color: rgba(59, 79, 183, 0.2);
    color: blue;
  }

  &--status-not-started {
    background-color: gray;
    color: black;
  }
}
</style>
