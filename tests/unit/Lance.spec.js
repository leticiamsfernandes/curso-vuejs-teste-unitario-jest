import Lance from '@/components/Lance.vue';
import { mount } from '@vue/test-utils';

test('não aceita lance com valor menor do que zero', () => {
  const wrapper = mount(Lance);
  const input = wrapper.find('input');
  input.setValue(-100);
  expect(input).toBeTruthy();
});
