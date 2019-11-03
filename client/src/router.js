import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import RomeStory from '@/views/RomeStory';
import WW2Story from '@/views/WW2Story';
import USAStory from '@/views/USAStory';
import CreateYourOwn from '@/views/CreateYourOwn';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/romestory',
      name: 'rome-story',
      component: RomeStory
    },
    {
      path: '/ww2story',
      name: 'ww2-story',
      component: WW2Story
    },
    {
      path: '/usastory',
      name: 'usa-story',
      component: USAStory
    },
    {
      path: '/createyourown',
      name: 'create-your-own',
      component: CreateYourOwn
    }
  ]
});

export default router;
