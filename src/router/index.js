import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Screen",
        component: () => import("@/views/screen/index.vue"),
    },
    {
        path: "/video",
        name: "Video",
        component: () => import("@/components/HlsVideo.vue"),
    },
    {
        path: "/plugin",
        name: "Plugin",
        component: () => import("@/components/divPlugin.vue"),
    },
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
