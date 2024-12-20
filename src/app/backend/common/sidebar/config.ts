export const sidebarMenuConfig = [
  // {
  //   label: 'Starter Pages',
  //   icon: 'fas fa-tachometer-alt',
  //   route: '/starter-pages'
  // },
  // {
  //   label: 'Active Page',
  //   icon: 'far fa-circle',
  //   route: '/active-page'
  // },
  // {
  //   label: 'Inactive Page',
  //   icon: 'far fa-circle',
  //   route: '/inactive-page'
  // },
  {
    label: 'Dashboard',
    route: 'dashboard',
    icon: 'nav-icon fas fa-chart-pie',
  },
  // {
  //   label: 'Manage Library',
  //   icon: 'nav-icon far fa-plus-square',
  //   children: [
      // {
      //   label: 'Manage Books',
      //   route: 'manage_books',
      //   icon: 'nav-icon far fa-plus-square',
      // },
  //   ]
  // },

  
    {
      label: 'Manage Books',
      route: 'manage_books',
      icon: 'nav-icon fas fa-book', 
    },
    {
      label: 'Issue Books',
      route: 'issue_books',
      icon: 'nav-icon fas fa-book-reader', 
    },
    {
      label: 'Issued Books',
      route: 'issued_books',
      icon: 'nav-icon fas fa-check-circle', 
    },
    {
      label: 'Manage User',
      route: 'user_management',
      icon: 'nav-icon fas fa-users-cog', 
    },
    {
      label: 'Report',
      route: 'report',
      icon: 'nav-icon fas fa-chart-line', 
    },
    {
      label: 'School Info',
      route: 'school_info',
      icon: 'nav-icon fas fa-user-shield', 
    },
    {
      label: 'Role Permission',
      route: 'role_permission',
      icon: 'nav-icon fas fa-user-shield', 
    },
];
  