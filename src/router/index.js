import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: function () {
            return import('../views/home.vue')
        }
    },
    {
        path: '/cameras',
        name: 'cameras',
        component: function () {
            return import('../views/cameras.vue')
        }
    },
    {
        path: '/cameras/:id',
        name: 'CameraPage',
        component: function () {
            return import('../views/CameraPage.vue')
        },
        props: true,
        // meta: {
        //     breadcrumb: [
        //         {name: 'Камеры', link: '/cameras'},
        //         // {name: this.id}
        //     ]
        // }
    },
    {
        path: '/addController/:id',
        name: 'addController',
        component: function () {
            return import('../views/addController.vue')
        },
        props: true
    },
    {
        path: '/addCamera',
        name: 'addCamera',
        component: function () {
            return import('../views/addCamera.vue')
        }
    },
    {
        path: '/plan',
        name: 'plan',
        component: function () {
            return import('../views/plan.vue')
        }
    },
    {
        path: '/addCamera/synchronize',
        name: 'synchronize',
        component: function () {
            return import('../views/synchronize')
        },
        props: true
    },
    {
        path: '/simulator',
        name: 'simulator',
        component: function () {
            return import('../views/simulator.vue')
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
