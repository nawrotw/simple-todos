import type { Meta, StoryObj } from '@storybook/react';
import { TodoListStory } from "./TodoListStory.tsx";

const meta = {
  title: 'Components/TodoList',
  component: TodoListStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TodoListStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TodoList: Story = {};
