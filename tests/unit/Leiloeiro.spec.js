import Leiloeiro from '@/views/Leiloeiro.vue';
import { mount } from '@vue/test-utils';
import { getLeilao, getLances } from '@/http';

jest.mock('@/http');

const leilao = {
  produto: 'Livro da casa do código',
  lanceInicial: 50,
  descricao: 'Um livro bem bacana sobre Vue'
};

describe('leiloeiro inicia um leilão que não possui lances', () => {
  test('avisa quando não existem lances', () => {
    getLeilao.mockResolvedValueOnce(leilao);
    getLances.mockResolvedValueOnce([
      {
        id: 1,
        valor: 100,
        data: '2020-12-01',
        leilao_id: 1
      }
    ]);

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    });
    const alerta = wrapper.find('.alert-dark');

    expect(alerta.exists()).toBeTruthy();
  });
});
