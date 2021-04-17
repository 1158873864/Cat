import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    redirect: '/deviceList'
  },
  {
    path: '/deviceList',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/deviceList/index'),
        meta: { title: '设备列表', icon: 'table' }
      },
      {
        path: 'detail',
        name: 'Detail',
        component: () => import('@/views/deviceList/detail'),
        meta: { title: '设备详情' },
        hidden: true
      }
    ]
  },
  {
    path: '/evaluation',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Evaluation',
        component: () => import('@/views/evaluation/index'),
        meta: { title: '数据分析', icon: 'el-icon-data-analysis' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
