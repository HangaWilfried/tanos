import { mount } from '@vue/test-utils'
import Header from '../../src/components/Header.vue'

describe('Header', () => {
  it('layout default slot', () => {
    const wrapper = mount(Header, {
      slots: {
        default: 'Main Content'
      }
    })
    expect(wrapper.html()).toContain('Main Content')
  })
})
