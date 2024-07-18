import type { Meta, StoryObj } from '@storybook/react';
import { ActionBarStory } from "./ActionBarStory.tsx";
import { themeWrapper } from "../../themeWrapper.tsx";

const meta = {
  title: 'Components/ActionBar',
  component: themeWrapper(ActionBarStory),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ActionBarStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActionBar: Story = {};
