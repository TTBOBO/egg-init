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
    path: '/home1',
    name: 'home1',
    meta: {
      icon: 'el-icon-eleme',
      hideInMenu: false,
      title: '首页'
    },
    component: resolve => {
      require(['@/view/home/home1'], resolve)
    }
  },
  {
    path: '/',
    name: 'home',
    redirect: '/home',
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
    redirect: '/user/userlist',
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
          require(['@/view/user/user'], resolve)
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
    path: '/goods',
    name: 'goods',
    redirect: '/goods/goodsList',
    component: Main,
    meta: {
      icon: 'el-icon-eleme',
      title: '商品',
      hideInMenu: false
    },
    children: [
      {
        path: 'goodsList',
        name: 'goodsList',
        meta: {
          icon: 'el-icon-eleme',
          title: '商品管理'
        },
        component: resolve => {
          require(['@/view/goods/goodsList'], resolve)
        }
      },
      {
        path: 'goodsCategory',
        name: 'goodsCategory',
        meta: {
          icon: 'el-icon-eleme',
          title: '商品类型'
        },
        component: resolve => {
          require(['@/view/goods/goodsCategory'], resolve)
        }
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    redirect: '/order/orderlist',
    meta: {
      title: '首页',
      //   href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'el-icon-eleme'
    },
    component: Main,
    children: [
      {
        path: 'orderlist',
        name: 'orderlist',
        meta: {
          icon: 'el-icon-eleme',
          title: '订单管理'
        },
        component: resolve => {
          require(['@/view/order/order'], resolve)
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
