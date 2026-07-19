const sidebarMenu = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'bx bx-home-circle',
    permission: 'dashboard.view',
  },
  {
    title: 'Programs',
    path: '/programs',
    icon: 'bx bx-book-content',
    permission: 'program.view',
  },
  {
    title: 'Users',
    path: '/users',
    icon: 'bx bx-user',
    permission: 'user.view',
  },
  {
    title: 'Roles & Permissions',
    path: '/roles-and-permissions',
    icon: 'bx bx-shield-quarter',
    permission: 'role.permission.manage',
  },
];

export default sidebarMenu;