import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Products',
    icon: 'layout-outline',
    children: [
      {
        title: 'Categoris',
        link: '/pages/categories',
      },
      {
        title: 'Products',
        link: '/pages/products',
      }
    ],
  },
];
