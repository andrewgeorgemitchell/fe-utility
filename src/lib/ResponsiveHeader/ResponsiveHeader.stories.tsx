import { ComponentMeta, ComponentStory } from '@storybook/react';

import ResponsiveHeader, { ResponsiveHeaderProps } from './ResponsiveHeader';

export default {
  title: 'ResponsiveHeader',
  component: ResponsiveHeader,
} as ComponentMeta<typeof ResponsiveHeader>;

const Template: ComponentStory<typeof ResponsiveHeader> = (args) => (
  <ResponsiveHeader {...args} />
);

export const Default = Template.bind({});

const DefaultProps: ResponsiveHeaderProps = {
  links: [
    {
      to: '/',
      text: 'Home',
    },
    {
      to: '/about',
      text: 'About',
    },
    {
      to: '/contact',
      text: 'Contact',
      subLinks: [
        {
          to: '/contact/email',
          text: 'Email',
        },
      ],
    },
  ],
  logo: {
    src: 'https://via.placeholder.com/75',
    alt: 'Responsive Header Logo',
  },
};

Default.args = DefaultProps;
