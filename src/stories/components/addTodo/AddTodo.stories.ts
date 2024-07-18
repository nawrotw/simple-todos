import type { Meta, StoryObj } from '@storybook/react';
import { AddTodoStory } from "./AddTodoStory.tsx";
import { themeWrapper } from "../../themeWrapper.tsx";

const meta = {
  title: 'Components/AddTodo',
  component: themeWrapper(AddTodoStory),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AddTodoStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddTodo: Story = {};
