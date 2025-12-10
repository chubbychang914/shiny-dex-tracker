<script setup lang="ts">
import { ref } from 'vue'

const markAsCaptured = ref(false)
</script>

<template>
  <div
    class="pokemon-card"
    :class="{ 'pokemon-card--captured': markAsCaptured }"
    @click="markAsCaptured = !markAsCaptured"
  >
    <div class="pokemon-card__header">
      <div>#100</div>
      <div>Kanto</div>
    </div>
    <div class="pokemon-card__body">
      <el-image src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010" style="width: 50%;">
        <template #placeholder>
          <div class="image-slot">
            Loading
            <span class="dot">...</span>
          </div>
        </template>
        <template #error>
          <div class="image-slot">
            <el-icon><Picture /></el-icon>
          </div>
        </template>
      </el-image>
      <p>{{ "name" }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$width: calc((100vw - 20px - 20px) / 3);
.pokemon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: $width;
  height: calc($width * 1.2);
  border-radius: 5px;
  background-color: $color-card;
  color: $color-text;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  &__header {
    flex: 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 10px;
    color: $color-text-secondary;
  }
  &__body {
    flex: 7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $color-text;
  }
  &--captured {
    background-color: $color-selected-card;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
