import BaseTag from '@/components/atoms/BaseTag.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/BaseTag',
  component: BaseTag,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tag 是用於內容分類和狀態顯示的小標籤，幫助用戶快速識別相關資訊。'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: [
        'highlight',
        'highlight-normal',
        'highlight-alert',
        'highlight-promo',
        'status-new',
        'status-warning',
        'status-error',
        'status-cancel',
        'status-done',
        'status-processing',
        'status-not-started'
      ]
    }
  }
} satisfies Meta<typeof BaseTag>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: '預設',
  render: (args) => ({
    components: { BaseTag },
    setup: () => {
      return { args }
    },
    template: '<BaseTag v-bind="args">default</BaseTag>'
  }),
  parameters: {
    docs: {
      description: { story: '用於描述或分類內容的主題、類別，例如：文章分類、意見反映分類' }
    }
  }
}

const highlightSourceCode = `
<div style="display: flex; gap: 8px; align-items: center;" v-bind="">
  <BaseTag variant="highlight">highlight</BaseTag>
  <BaseTag variant="highlight-normal">highlight-normal</BaseTag>
  <BaseTag variant="highlight-alert">highlight-alert</BaseTag>
  <BaseTag variant="highlight-promo">highlight-promo</BaseTag>
</div>
`
export const HighlightTags: Story = {
  name: 'Highlight 類型標籤',
  render: () => ({
    components: { BaseTag },
    template: highlightSourceCode
  }),
  parameters: {
    docs: {
      description: {
        story: `
| variant | 說明 |
|---|---|
| \`highlight\` | 一般內容 |
| \`highlight-normal\` | 一般狀態 |
| \`highlight-alert\` | 重要提示 |
| \`highlight-promo\` | 官方推薦 |
        `
      },
      source: { code: highlightSourceCode }
    }
  }
}

const statusSourceCode = `
<div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
  <BaseTag variant="status-new">new</BaseTag>
  <BaseTag variant="status-warning">warning</BaseTag>
  <BaseTag variant="status-error">error</BaseTag>
  <BaseTag variant="status-cancel">cancel</BaseTag>
  <BaseTag variant="status-done">done</BaseTag>
  <BaseTag variant="status-processing">in progress</BaseTag>
  <BaseTag variant="status-not-started">not started</BaseTag>
</div>
`
export const StatusTags: Story = {
  name: 'Status 類型標籤',
  render: () => ({
    components: { BaseTag },
    template: statusSourceCode
  }),
  parameters: {
    docs: {
      description: {
        story: `
| Variant | 說明 |
|---|---|
| \`status-new\` | 新開始狀態 |
| \`status-warning\` | 重要提示狀態 |
| \`status-error\` | 錯誤狀態 |
| \`status-cancel\` | 取消狀態 |
| \`status-done\` | 已完成／成功狀態 |
| \`status-processing\` | 處理中狀態 |
| \`status-not-started\` | 未完成狀態 |
        `
      },
      source: { code: statusSourceCode }
    }
  }
}

const iconTagSourceCode = `
<BaseTag variant="highlight-normal">
   <i class="icon-user" style="font-size: 16px;"></i>
   <span style="margin-left: 4px;">社區管委</span>
</BaseTag>
`
export const IconTags: Story = {
  name: 'Tag with Icon',
  render: () => ({
    components: { BaseTag },
    template: iconTagSourceCode
  }),
  parameters: {
    docs: {
      description: {
        story: '包含 icon 的樣式'
      },
      source: { code: iconTagSourceCode }
    }
  }
}
