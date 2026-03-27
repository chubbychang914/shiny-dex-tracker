import ListRowSkeleton from '@/components/molecules/lists/ListRowSkeleton.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'List/ListRowSkeleton',
  component: ListRowSkeleton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['default', 'withImage']
    }
  },
  args: {
    type: 'default'
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
} satisfies Meta<typeof ListRowSkeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithImage: Story = {
  name: '圖片 loading 樣式',
  args: {
    type: 'withImage'
  }
}

const MultipleRowsSourceCode = `
<div>
  <ListRowSkeleton v-for="i in 3" :key="i" />
</div>
`
export const MultipleRows: Story = {
  name: '多行 loading 樣式',
  parameters: {
    docs: {
      source: { type: 'code', code: MultipleRowsSourceCode }
    }
  },
  render: () => ({
    components: { ListRowSkeleton },
    template: MultipleRowsSourceCode
  })
}
