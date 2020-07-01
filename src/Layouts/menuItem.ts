import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
  {
    title: 'Getting Started',
    link: { to: '/' },
  },
  {
    title: 'CLI',
    children: [
      {
        title: 'pal create',
        link: { to: '/cli/create' },
      },
      {
        title: 'pal generate',
        link: { to: '/cli/generator' },
      },
      {
        title: 'pal schema',
        link: { to: '/cli/schema' },
      },
      {
        title: 'cnt',
        link: { to: '/cli/cnt' },
      },
    ],
  },
  {
    group: true,
    title: 'Prisma Tools',
  },
  {
    title: 'Generator Class',
    children: [
      {
        title: 'Overview',
        link: { to: '/generator' },
      },
      {
        title: 'Nexus',
        link: { to: '/generator/nexus' },
      },
      {
        title: 'SDL First',
        link: { to: '/generator/sdl' },
      },
      {
        title: 'GraphQL Modules',
        link: { to: '/generator/graphql-modules' },
      },
    ],
  },
  {
    title: 'Prisma Plugins',
    expanded: true,
    children: [
      {
        title: 'Select',
        link: { to: '/plugins/select' },
      },
      {
        title: 'On Delete',
        link: { to: '/plugins/delete' },
      },
    ],
  },
  {
    title: 'Prisma Admin',
    link: { to: '/prisma-admin' },
  },
  {
    title: 'UI Components',
    group: true,
  },
  {
    title: 'Getting Started',
    link: { to: '/ui/getting-started' },
  },
  {
    title: 'Guides',
    children: [
      {
        title: 'Install based on starter kit',
        link: { to: '/ui/guides/install-based-on-starter-kit' },
      },
      {
        title: 'Start new gatsby project',
        link: { to: '/ui/guides/start-new-gatsby-project' },
      },
      {
        title: 'Install Eva Icons',
        link: { to: '/ui/guides/install-eva-icons' },
      },
      {
        title: 'Grid System',
        link: { to: '/ui/guides/grid-system' },
      },
    ],
  },
  {
    title: 'Design System',
    children: [
      {
        title: 'Design System Theme',
        link: { to: '/ui/themes/theme-system' },
      },
      {
        title: 'Typography',
        link: { to: '/ui/themes/typography' },
      },
      {
        title: 'Enable Theme System',
        link: { to: '/ui/themes/enable-theme-system' },
      },
      {
        title: 'Custom Component Style',
        link: { to: '/ui/themes/custom-component-style' },
      },
      {
        title: 'Default Theme',
        link: { to: '/ui/themes/default' },
      },
      {
        title: 'Dark Theme',
        link: { to: '/ui/themes/dark' },
      },
      {
        title: 'Cosmic Theme',
        link: { to: '/ui/themes/cosmic' },
      },
      {
        title: 'Corporate Theme',
        link: { to: '/ui/themes/corporate' },
      },
    ],
  },
  {
    title: 'Components',
    children: [
      {
        title: 'Global',
        group: true,
      },
      {
        title: 'Layout',
        link: { to: '/ui/components/layout' },
      },
      {
        title: 'Grid',
        link: { to: '/ui/components/grid' },
      },
      {
        title: 'Card',
        link: { to: '/ui/components/card' },
      },
      {
        title: 'Flip Card',
        link: { to: '/ui/components/flip-card' },
      },
      {
        title: 'Reveal Card',
        link: { to: '/ui/components/reveal-card' },
      },
      {
        title: 'Accordion',
        link: { to: '/ui/components/accordion' },
      },
      {
        title: 'List',
        link: { to: '/ui/components/list' },
      },
      {
        title: 'Navigation',
        group: true,
      },
      {
        title: 'Sidebar',
        link: { to: '/ui/components/sidebar' },
      },
      {
        title: 'Menu',
        link: { to: '/ui/components/menu' },
      },
      {
        title: 'Tabs',
        link: { to: '/ui/components/tabs' },
      },
      {
        title: 'Actions',
        link: { to: '/ui/components/actions' },
      },
      {
        title: 'Forms',
        group: true,
      },
      {
        title: 'Input',
        link: { to: '/ui/components/input' },
      },
      {
        title: 'Checkbox',
        link: { to: '/ui/components/checkbox' },
      },
      {
        title: 'Radio',
        link: { to: '/ui/components/radio' },
      },
      {
        title: 'Button',
        link: { to: '/ui/components/button' },
      },
      {
        title: 'Select',
        link: { to: '/ui/components/select' },
      },
      {
        title: 'Modal && Overlays',
        group: true,
      },
      {
        title: 'Popover',
        link: { to: '/ui/components/popover' },
      },
      {
        title: 'Context Menu',
        link: { to: '/ui/components/context-menu' },
      },
      {
        title: 'Tooltip',
        link: { to: '/ui/components/tooltip' },
      },
      {
        title: 'Toastr',
        link: { to: '/ui/components/toastr' },
      },
      {
        title: 'Extra',
        group: true,
      },
      {
        title: 'Global Search',
        link: { to: '/ui/components/search' },
      },
      {
        title: 'User (Avatar)',
        link: { to: '/ui/components/user' },
      },
      {
        title: 'Alert',
        link: { to: '/ui/components/alert' },
      },
      {
        title: 'EvaIcon',
        link: { to: '/ui/components/eva-icon' },
      },
      {
        title: 'Spinner',
        link: { to: '/ui/components/spinner' },
      },
      {
        title: 'Progress Bar',
        link: { to: '/ui/components/progress' },
      },
      {
        title: 'Badge',
        link: { to: '/ui/components/badge' },
      },
      {
        title: 'Chat UI',
        link: { to: '/ui/components/chat' },
      },
    ],
  },
];

export default items;
