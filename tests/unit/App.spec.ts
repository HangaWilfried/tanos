import {mount} from '@vue/test-utils'
import App from '../../src/App.vue'
import Birth from '../../src/components/Birth.vue'
import {User} from '@/interface/User'
import {nextTick} from 'vue'

describe('App', () => {
    it('check if we can delete the correct index', async ()  => {
        const wrapper = mount(App)
        wrapper.vm.deleteBirthday(0)
        await nextTick()
        expect(wrapper.findAllComponents(Birth).length).toBe(0)
    })
    it('check the adding and deleting birthday index', async () => {
        const wrapper = mount(App)
        wrapper.vm.addNewBirthday({
            fullName: 'Hanga Lagoue',
            dateOfBirth: '2000 05 27'
        })
        await nextTick()
        expect(wrapper.findAllComponents(Birth).length).toBe(1)
        expect(wrapper.vm.countBirthdays).toBe(1)
        expect(wrapper.vm.birthdays.length).toBe(1)

        wrapper.vm.deleteBirthday(0)
        await nextTick()
        expect(wrapper.findAllComponents(Birth).length).toBe(0)
        expect(wrapper.vm.countBirthdays).toBe(0)
        expect(wrapper.vm.birthdays.length).toBe(0)
        expect(localStorage.getItem('value')).toMatch('[]')
    })
    it('check if we can add birthday in double', async () => {
        const wrapper = mount(App)
        wrapper.vm.addNewBirthday({
            fullName: 'Hanga Lagoue',
            dateOfBirth: '2000 05 27'
        })
        await nextTick()
        expect(wrapper.findAllComponents(Birth).length).toBe(1)
        wrapper.vm.addNewBirthday({
            fullName: 'Hanga Lagoue',
            dateOfBirth: '2000 05 27'
        })
        await nextTick()
        expect(wrapper.findAllComponents(Birth).length).toBe(1)
        expect(localStorage.getItem('value')).toMatch("[{\"fullName\":\"Hanga Lagoue\",\"dateOfBirth\":\"2000 05 27\"}]")
    })
})
