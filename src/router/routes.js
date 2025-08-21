const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/additional-signer/details',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AdditionalSigner.vue') }],
  },
  {
    path: '/witnesses/details',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/WithnessesPage.vue') }],
  },
  {
    path: '/observers/details',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ObserversData.vue') }],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
