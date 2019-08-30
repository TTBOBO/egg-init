import Main from '@/view/main/main'
export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hideInMenu: true
    },
    component: () => import('@/view/sign/login.vue')
  },
  {
    path: '/403',
    name: 'page403',
    meta: {
      title: '没有权限',
      hideInMenu: true
    },
    component: () => import('@/view/error-page/403.vue')
  },
  {
    path: '/',
    name: '/name',
    // redirect: '/home',
    component: Main,

    meta: {
      icon: 'el-icon-eleme',
      title: '首页',
      hideInMenu: false
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          icon: 'el-icon-eleme',
          hideInMenu: false,
          title: '首页'
        },
        component: resolve => {
          require(['@/view/home/home'], resolve)
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      title: '用户管理',
      //   href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'el-icon-eleme'
    },
    component: Main,
    children: [
      {
        path: 'userlist',
        name: 'userlist',
        meta: {
          icon: 'el-icon-eleme',
          title: '系统会员'
        },
        component: resolve => {
          require(['@/view/home/home'], resolve)
        }
      },
      {
        path: 'address',
        name: 'address',
        meta: {
          icon: 'el-icon-eleme',
          title: '会员地址'
        },
        component: resolve => {
          require(['@/view/home/home'], resolve)
        }
      }
    ]
  },
  {
    path: '/rule',
    name: 'rule',
    // redirect: '/home',
    component: Main,

    meta: {
      icon: 'el-icon-eleme',
      title: '首页',
      hideInMenu: false
    },
    children: [
      {
        path: 'address2',
        name: 'address2',
        meta: {
          icon: 'el-icon-eleme',
          title: '会员地址2'
        },
        component: resolve => {
          require(['@/view/home/home'], resolve)
        }
      }
    ]
  },
  {
    path: '*',
    name: 'page404',
    meta: {
      title: '页面不存在',
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]