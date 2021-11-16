import { mount } from '@vue/test-utils'
import App from '../../src/App.vue'
import Birth from '../../src/components/Birth.vue'

describe('App', () => {
  it('check if we can delete the correct index', async () => {
    const wrapper = mount(App)
    await wrapper.vm.deleteBirthday(0)
    expect(wrapper.findAllComponents(Birth).length).toBe(0)
  })
  it('check the adding and deleting birthday index', async () => {
    const wrapper = mount(App)
    await wrapper.vm.addNewBirthday({
      fullName: 'Hanga Lagoue',
      dateOfBirth: '2000 05 27'
    })
    expect(wrapper.findAllComponents(Birth).length).toBe(1)
    expect(wrapper.vm.countBirthdays).toBe(1)
    expect(wrapper.vm.birthdays.length).toBe(1)

    await wrapper.vm.deleteBirthday(0)

    expect(wrapper.findAllComponents(Birth).length).toBe(0)
    expect(wrapper.vm.countBirthdays).toBe(0)
    expect(wrapper.vm.birthdays.length).toBe(0)
    expect(localStorage.getItem('value')).toMatch('[]')
  })
  it('check if we can add birthday in double', async () => {
    window.alert = jest.fn()
    expect(window.alert).toBeCalledTimes(0)
    const wrapper = mount(App)
    expect(localStorage.getItem('value')).toMatch('[]')
    await wrapper.vm.addNewBirthday({
      fullName: 'Hanga Lagoue',
      dateOfBirth: '2000 05 27'
    })
    expect(wrapper.findAllComponents(Birth).length).toBe(1)
    await wrapper.vm.addNewBirthday({
      fullName: 'Hanga Lagoue',
      dateOfBirth: '2000 05 27'
    })
    expect(window.alert).toBeCalledTimes(1)
    expect(window.alert).toHaveBeenCalledWith('this already existed please make sure you are try registered the good birthday')
    expect(wrapper.findAllComponents(Birth).length).toBe(1)

    expect(localStorage.getItem('value')).toMatch('[{"fullName":"Hanga Lagoue","dateOfBirth":"2000 05 27"}]')
  })
})
