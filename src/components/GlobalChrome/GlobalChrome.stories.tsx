import type { Meta, StoryObj } from '@storybook/react';
import { GlobalChrome } from './GlobalChrome';

const meta: Meta<typeof GlobalChrome> = {
  title: 'GlobalChrome',
  component: GlobalChrome,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof GlobalChrome>;

export const Default: Story = {
  args: {
    pathname: '/',
  },
};

export const Mobile: Story = {
  args: {
    pathname: '/',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Desktop: Story = {
  args: {
    pathname: '/',
  },
  parameters: {
    viewport: {
      defaultViewport: 'reset',
    },
  },
};

export const BackOnly: Story = {
  args: {
    pathname: '/auth/login',
  },
};
