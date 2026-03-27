<template>
  <div
    class="list-row"
    :class="{
      'align-top': alignTop,
      borderless: borderless
    }"
  >
    <!-- Leading Area -->
    <div
      v-if="slots.leading"
      class="list-row__leading"
    >
      <slot name="leading" />
    </div>
    <!-- Main content Area -->
    <div class="main-content">
      <slot name="customMainContent">
        <div
          class="main-content__title"
          :class="{ 'bold-title': boldTitle }"
        >
          {{ title }}
        </div>
        <div
          v-if="subtitle"
          class="main-content__subtitle"
        >
          {{ subtitle }}
        </div>
        <div
          v-if="slots.tags"
          class="main-content__tags"
        >
          <slot name="tags" />
        </div>
      </slot>
    </div>
    <!-- Trailing Area -->
    <div
      v-if="slots.trailing || trailingText || trailingVerifiedText"
      class="list-row__trailing"
    >
      <div
        v-if="trailingText"
        class="trailing-text"
      >
        {{ trailingText }}
      </div>
      <div
        v-if="trailingVerifiedText"
        class="trailing-verified-text"
      >
        {{ trailingVerifiedText }}
        <i class="icon-correct-roundedline verified-icon" />
      </div>
      <slot name="trailing" />
    </div>
    <div
      v-if="hasArrowIcon"
      class="list-row__arrow-icon"
      :class="{ 'bold-arrow-icon': boldTitle }"
    >
      >
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @component ListRow
 * @description 清單元件，用於呈現大量、同性質的內容，以垂直堆疊方式排列。
 *
 * @slot leading           - 左側區塊，通常放 icon 或圖片。icon 請加上 .leading-icon class（font-size: 24px）
 * @slot customMainContent - 完全覆蓋中間主內容區（取代預設的 title / subtitle / tags），適合客製化排版
 * @slot tags              - 標題下方的標籤區塊，通常放 <TagV2>，僅在未使用 #customMainContent 時有效
 * @slot trailing          - 右側區塊，通常放 icon、badge、radio、checkbox、switch、按鈕等。icon 請加上 .trailing-icon class（font-size: 20px）
 */
import { useSlots } from 'vue'

defineOptions({ name: 'ListRow' })

const slots = useSlots()

defineProps({
  /** 標題文字 */
  title: {
    type: String,
    default: '標題'
  },
  /** 說明文字，顯示於標題下方 */
  subtitle: {
    type: String,
    default: ''
  },
  /** 是否為粗體標題（開啟時 arrow icon 也會同步變粗體） */
  boldTitle: {
    type: Boolean,
    default: false
  },
  /** 是否顯示右側箭頭圖示 */
  hasArrowIcon: {
    type: Boolean,
    default: false
  },
  /** 右側文字（灰色摘要樣式） */
  trailingText: {
    type: String,
    default: ''
  },
  /** 右側文字（主色 + 勾選圖示的已驗證樣式） */
  trailingVerifiedText: {
    type: String,
    default: ''
  },
  /** 是否將內容垂直置頂（預設為 align-items: center） */
  alignTop: {
    type: Boolean,
    default: false
  },
  /** 是否移除底部 border-bottom */
  borderless: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
$SystemWhite: #ffffff;
$BorderGray: #e3e3e3;
$CaptionGary: #999999;
$PrimaryColor: #15beae;
.list-row {
  width: 100%;
  padding: 12px 16px;
  background-color: $SystemWhite;
  border-bottom: 1px solid $BorderGray;
  display: flex;
  align-items: center;
  overflow: hidden;

  &__leading {
    flex: 0 0 auto;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }

  &__trailing {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 10px;
    overflow-wrap: break-word;
  }

  &__arrow-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: $CaptionGary;
    padding-left: 8px;
  }
}

.main-content {
  flex-grow: 1;
  min-width: 0;
  overflow-wrap: break-word;

  &__subtitle {
    color: $CaptionGary;
  }

  &__tags {
    padding-top: 12px;
  }
}

.bold-title {
  font-weight: 600;
}

.bold-arrow-icon {
  font-weight: 600;
  color: #1f211f;
}

.leading-icon {
  font-size: 24px;
}

.trailing-text {
  color: $CaptionGary;
}

.trailing-icon {
  font-size: 20px;
}

.trailing-verified-text {
  display: flex;
  align-items: center;
  gap: 8px;
  color: $PrimaryColor;

  .verified-icon {
    font-size: 20px;
  }
}

.align-top {
  align-items: flex-start;
}

.borderless {
  border-bottom: none;
}
</style>
