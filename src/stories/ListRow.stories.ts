import ListRow from '@/components/molecules/lists/ListRow.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Lists/ListRow',
  component: ListRow,
  tags: ['autodocs'],
  // optional: custom docs options here
  args: {
    title: 'Default Title'
  },
  decorators: [
    () => ({
      template: `
      <div style="width: 430px; padding: 20px; background-color: #f5f5f5;">
        <div style="width: 400px;">
          <story />
        </div>
      </div>
      `
    })
  ]
} satisfies Meta<typeof ListRow>

// registers this file with Storybook so it can show up
export default meta

// shortcut type for all stories in this file
type Story = StoryObj<typeof meta>

export const Default: Story = {}

const codeExampleWithLeadingImage = `
<ListRow title="標題" boldTitle>
  <template #leading>
    <div>
      <img src="https://placehold.co/24x24/15BEAE/white?text=Image" style="border-radius: 5px;" />
    </div>
  </template>
</ListRow>
<ListRow title="內容" trailingText="摘要" hasArrowIcon>
  <template #leading>
    <div>
      <img src="https://placehold.co/24x24/15BEAE/white?text=Image" style="border-radius: 5px;" />
    </div>
  </template>
</ListRow>
<ListRow title="標題" subtitle="說明文字" boldTitle alignTop>
  <template #leading>
    <img src="https://placehold.co/77x77/15BEAE/white?text=Image" style="border-radius: 8px;" />
  </template>
</ListRow>
`
export const WithLeadingImage: Story = {
  name: '圖片類型',
  args: { title: '有圖片的 ListRow' },
  parameters: {
    docs: {
      description: {
        story:
          '※ 前面的 icon 加入 .leading-icon class，字體大小固定 24px<br/>※ 後面的 icon 加入 .trailing-icon class，字體大小固定 20px<br>※ 可使用 named slot #customMainContent 完全自定義內容'
      },
      source: { type: 'code', code: codeExampleWithLeadingImage }
    }
  },
  render: () => ({
    components: { ListRow },
    template: `
      <ListRow title="標題" boldTitle>
        <template #leading>
          <div>
            <img src="https://placehold.co/24x24/15BEAE/white?text=Image" style="border-radius: 5px;" />
          </div>
        </template>
      </ListRow>
      <ListRow title="內容" trailingText="摘要" hasArrowIcon>
        <template #leading>
          <div>
            <img src="https://placehold.co/24x24/15BEAE/white?text=Image" style="border-radius: 5px;" />
          </div>
        </template>
      </ListRow>
      <ListRow title="標題" subtitle="說明文字" boldTitle alignTop>
        <template #leading>
          <img src="https://placehold.co/77x77/15BEAE/white?text=Image" style="border-radius: 8px;" />
        </template>
      </ListRow>
    `
  })
}
