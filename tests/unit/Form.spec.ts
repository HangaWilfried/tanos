import Form from '../../src/components/Form.vue'
import { mount } from '@vue/test-utils'

describe('Form.vue', () => {
  it('will call with all values', async () => {
    const wrapper = mount(Form)
    const input = wrapper.findAll('input')
    await input[0].setValue('antomny')
    await input[1].setValue('leornard')
    await input[2].setValue('2000-05-27')
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted().submit[0]).toEqual([{ fullName: 'antomny leornard', dateOfBirth: '2000-05-27' }])
  })
})
