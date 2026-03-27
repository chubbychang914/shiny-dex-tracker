<template>
  <div class="list-row-skeleton">
    <div
      v-if="type === 'default'"
      class="default"
    >
      <div class="line" />
      <div class="line" />
      <div class="long-line" />
    </div>
    <div
      v-if="type === 'withImage'"
      class="withImage"
    >
      <div class="image-block" />
      <div class="image-line-block">
        <div class="line" />
        <div class="line" />
        <div class="long-line" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Storybook 連結：https://storybook-static.smartdaily.com.tw/SmartDaily-Android/index.html?path=/story/introduction--page
defineProps({
  type: {
    type: String,
    default: 'default'
  }
})
</script>

<style lang="scss" scoped>
$SystemWhite: #ffffff;
$BorderGray: #e3e3e3;
$CaptionGary: #999999;
$PrimaryColor: #15beae;
$BackgroundGray: #f3f3f3;
.list-row-skeleton {
  width: 100%;
  padding: 16px;
  background-color: $SystemWhite;
  border-bottom: 1px solid $BorderGray;
}

// 預設樣式
.default {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 8px;
  .line {
    width: 65%;
  }
  .long-line {
    width: 80%;
  }
}

// 有圖片樣式
.withImage {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 12px;
  .image-block {
    border-radius: 8px;
    height: 100%;
    aspect-ratio: 1/1;
    background: $BackgroundGray;
    background: linear-gradient(to right, #efeff1 8%, #f9f9f9 18%, #efeff1 33%);
    background-size: 800px 104px;
    -webkit-animation: placeHolderShimmer 2s infinite;
    animation: placeHolderShimmer 2s infinite;
  }
  .image-line-block {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    gap: 8px;
  }
  .line {
    width: 65%;
  }
  .long-line {
    width: 85%;
  }
}

// loading 動畫
.line,
.long-line {
  height: 20px;
  border-radius: 4px;
  background: $BackgroundGray;
  background: linear-gradient(to right, #efeff1 8%, #f9f9f9 18%, #efeff1 33%);
  background-size: 800px 104px;
  -webkit-animation: placeHolderShimmer 2s infinite;
  animation: placeHolderShimmer 2s infinite;
}

@-webkit-keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
</style>
