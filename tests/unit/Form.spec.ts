import Form from '../../src/components/Form.vue'
import {mount} from '@vue/test-utils'
import {User} from '@/interface/User'
import {nextTick} from 'vue'


describe('Form.vue', () => {
    it('will call with all values', async () => {
        const wrapper = mount(Form)
        wrapper.vm.submit()
        const user:User = {
            fullName: 'lagoue junior',
            dateOfBirth: '2000 05 27'
        }
        await nextTick()
        expect(wrapper.emitted().submit[0]).toEqual([
            {
              fullName: user.fullName,
              dateOfBirth: user.dateOfBirth
            }])
    })
})
