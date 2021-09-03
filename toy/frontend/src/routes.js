import {Home} from './pages/Home.jsx'
import {About} from './pages/About.jsx'
import {ToyApp} from './pages/ToyApp.jsx'
import {ToyEdit} from './cmps/ToyEdit'
import {Chart} from './cmps/Chart'
import { ToyDetails } from './cmps/ToyDetails.jsx'

export const routes = [
    {
        path:'/',
        component: Home,
    },

    {
        path:'/about',
        component: About,
    }, 
    {
        path:'/chart',
        component: Chart,
    }, 
    {
        path:'/toys',
        component: ToyApp,
    }, 
    {
        path:'/toys/:toyId/edit',
        component: ToyEdit,
    }, 
    {
        path:'/toys/:toyId/details',
        component: ToyDetails,
    }, 
]