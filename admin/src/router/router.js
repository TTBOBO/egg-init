import Main from '@/view/main/main';
export default [{
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
      require(['@/view/home/home1'], resolve);
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
    children: [{
      path: '/home',
      name: 'home',
      meta: {
        icon: 'el-icon-eleme',
        hideInMenu: false,
        title: '首页'
      },
      component: resolve => {
        require(['@/view/home/home'], resolve);
      }
    }]
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
    children: [{
      path: 'userlist',
      name: 'userlist',
      meta: {
        icon: 'el-icon-eleme',
        title: '系统会员'
      },
      component: resolve => {
        require(['@/view/user/user'], resolve);
      }
    }]
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
    children: [{
        path: 'goodsList',
        name: 'goodsList',
        meta: {
          icon: 'el-icon-eleme',
          title: '商品管理'
        },
        component: resolve => {
          require(['@/view/goods/goodsList'], resolve);
        }
      },
      {
        path: 'goodsCategory',
        name: 'goodsCategory',
        meta: {
          icon: 'el-icon-eleme',
          title: '商品分类',
          hideInMenu: false
        },
        component: resolve => {
          require(['@/view/goods/goodsCategory'], resolve);
        }
      },
      {
        path: 'goodsAttributeCategory',
        name: 'goodsAttributeCategory',
        meta: {
          icon: 'el-icon-eleme',
          title: '商品类型',
          hideInMenu: false
        },
        component: resolve => {
          require(['@/view/goods/goodsAttributeCategory'], resolve);
        }
      },
      {
        path: 'goodsAttribute',
        name: 'goodsAttribute',
        meta: {
          icon: 'el-icon-eleme',
          title: '属性列表',
          hideInMenu: true
        },
        component: resolve => {
          require(['@/view/goods/goodsAttribute'], resolve);
        }
      },
      {
        path: 'addGoodsAttribute',
        name: 'addGoodsAttribute',
        meta: {
          icon: 'el-icon-eleme',
          title: '添加属性',
          hideInMenu: true
        },
        component: resolve => {
          require(['@/view/goods/addGoodsAttribute'], resolve);
        }
      },

      {
        path: 'goodsSku',
        name: 'goodsSku',
        meta: {
          icon: 'el-icon-eleme',
          title: 'D3 Example',
          hideInMenu: false
        },
        component: resolve => {
          require(['@/view/goods/goodsSku'], resolve);
        }
      },
      {
        path: 'addGoods',
        name: 'addGoods',
        meta: {
          icon: 'el-icon-eleme',
          title: '添加商品',
          hideInMenu: true
        },
        component: resolve => {
          require(['@/view/goods/addGoods'], resolve);
        }
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    redirect: '/order/orderlist',
    meta: {
      title: '订单',
      //   href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'el-icon-eleme'
    },
    component: Main,
    children: [{
        path: 'orderlist',
        name: 'orderlist',
        meta: {
          icon: 'el-icon-eleme',
          title: '订单管理'
        },
        component: resolve => {
          require(['@/view/order/order'], resolve);
        }
      },
      {
        path: 'evaluate',
        name: 'evaluate',
        meta: {
          icon: 'el-icon-eleme',
          title: '用户评价'
        },
        component: resolve => {
          require(['@/view/order/evaluate'], resolve);
        }
      }
    ]
  },
  {
    path: '/sms',
    name: 'sms',
    redirect: '/sms/flash',
    meta: {
      title: '营销',
      //   href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'el-icon-eleme'
    },
    component: Main,
    children: [{
        path: 'flash',
        name: 'flash',
        meta: {
          icon: 'el-icon-eleme',
          title: '秒杀活动列表'
        },
        component: resolve => {
          require(['@/view/flash/flash_promotion'], resolve);
        }
      },
      {
        path: 'flash_session',
        name: 'flash_session',
        meta: {
          hideInMenu: true,
          icon: 'el-icon-eleme',
          title: '秒杀时间段列表'
        },
        component: resolve => {
          require(['@/view/flash/flash_promotion_session'], resolve);
        }
      },
      {
        path: 'flash_goods',
        name: 'flash_goods',
        meta: {
          hideInMenu: true,
          icon: 'el-icon-eleme',
          title: '秒杀时间段选择'
        },
        component: resolve => {
          require(['@/view/flash/flash_goods'], resolve);
        }
      },
      {
        path: 'flash_promotion_goods',
        name: 'flash_promotion_goods',
        meta: {
          hideInMenu: true,
          icon: 'el-icon-eleme',
          title: '秒杀商品列表'
        },
        component: resolve => {
          require(['@/view/flash/flash_promotion_goods'], resolve);
        }
      },



      {
        path: 'new',
        name: 'new',
        meta: {
          icon: 'el-icon-eleme',
          title: '新品推荐'
        },
        component: resolve => {
          require(['@/view/sms/newGoodsList'], resolve);
        }
      },
      {
        path: 'hot',
        name: 'hot',
        meta: {
          icon: 'el-icon-eleme',
          title: '人气推荐'
        },
        component: resolve => {
          require(['@/view/sms/recommendList'], resolve);
        }
      },
      {
        path: 'advertise',
        name: 'advertise',
        meta: {
          icon: 'el-icon-eleme',
          title: '广告列表'
        },
        component: resolve => {
          require(['@/view/sms/advertise'], resolve);
        }
      },
      {
        path: 'addAdv',
        name: 'addAdv',
        meta: {
          hideInMenu: true,
          icon: 'el-icon-eleme',
          title: '添加编辑广告'
        },
        component: resolve => {
          require(['@/view/sms/addAdv'], resolve);
        }
      },
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
];
