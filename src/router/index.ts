import { createRouter, createWebHistory } from 'vue-router';
import BiddingList from '../components/BiddingList.vue';
import BiddingForm from '../components/BiddingForm.vue';
import BiddingDetail from '../components/BiddingDetail.vue';
import Fornecedores from '../app/pages/Fornecedores.vue';
import Relatorios from '../app/pages/Relatorios.vue';
import DocumentoFormalizacaoDemanda from '../app/pages/DocumentoFormalizacaoDemanda.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/licitacoes' },
    { path: '/licitacoes', component: BiddingList },
    { path: '/licitacoes/nova', component: BiddingForm },
    { path: '/licitacoes/:id', component: BiddingDetail },
    { path: '/licitacoes/:id/editar', component: BiddingForm },
    { path: '/licitacoes/dfd', component: DocumentoFormalizacaoDemanda },
    { path: '/fornecedores', component: Fornecedores },
    { path: '/relatorios', component: Relatorios }
  ]
});