import NovoLeilao from '@/views/NovoLeilao.vue';
import { mount } from '@vue/test-utils';
import { createLeilao } from '@/http';

jest.mock('@/http');

const $router = {
  push: jest.fn()
};

describe('um novo leilão deve ser criado', () => {
  test('dado o formulário preenchido, um leilão deve ser criado', async () => {
    createLeilao.mockResolvedValueOnce();

    const wrapper = mount(NovoLeilao, {
      mocks: {
        $router
      }
    });

    wrapper.find('.produto').setValue('Um livro da casa do código');
    wrapper.find('.descricao').setValue('Conteúdo de primeira');
    wrapper.find('.valor').setValue(50);
    wrapper.find('form').trigger('submit');

    expect(createLeilao).toHaveBeenCalled();
  });
});
