import Lance from '@/components/Lance.vue';
import { mount } from '@vue/test-utils';

describe('um lance sem valor mínimo', () => {
  test('não aceita lance com valor menor do que zero', () => {
    const wrapper = mount(Lance);
    const input = wrapper.find('input');

    input.setValue(-100);
    wrapper.trigger('submit');

    const lancesEmitidos = wrapper.emitted('novo-lance');
    expect(lancesEmitidos).toBeUndefined();

  });

  test('emite um lance quando o valor é maior do que zero', () => {
    const wrapper = mount(Lance);
    const input = wrapper.find('input');

    input.setValue(100);
    wrapper.trigger('submit');

    const lancesEmitidos = wrapper.emitted('novo-lance');
    expect(lancesEmitidos).toHaveLength(1);

  });

  test('emite um valor esperado de um lance válido', () => {
    const wrapper = mount(Lance);
    const input = wrapper.find('input');

    input.setValue(100);
    wrapper.trigger('submit');

    const lancesEmitidos = wrapper.emitted('novo-lance');
    const lance = parseInt(lancesEmitidos[0][0]);

    expect(lance).toBe(100);
  });
});

describe('um lance com valor mínimo', () => {
  test('todos os lances devem possuir um valor maior do que o mínimo informado', () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    });
    const input = wrapper.find('input');

    input.setValue(400);
    wrapper.trigger('submit');

    const lancesEmitidos = wrapper.emitted('novo-lance');
    expect(lancesEmitidos).toHaveLength(1);
  });

  test('emite um valor esperado de um lance válido', () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    });
    const input = wrapper.find('input');

    input.setValue(400);
    wrapper.trigger('submit');

    const lancesEmitidos = wrapper.emitted('novo-lance');
    const valorDoLance = parseInt(lancesEmitidos[0][0]);

    expect(valorDoLance).toBe(400);
  });

  test('não são aceitos lances com valores menores do que o mínimo informado', async () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    });
    const input = wrapper.find('input');

    input.setValue(100);
    wrapper.trigger('submit');

    // garante que o DOM tenha sido atualizado
    await wrapper.vm.$nextTick();

    const mensagemErro = wrapper.find('p.alert').element;
    expect(mensagemErro).toBeTruthy();
  });
});
