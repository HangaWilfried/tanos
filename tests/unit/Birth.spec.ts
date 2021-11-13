import {mount} from '@vue/test-utils'
import Birth from '../../src/components/Birth.vue'



describe('Birth', () => {
    it('layout default slot', () => {
        const wrapper = mount(Birth, {
            slots: {
                default: 'antangaga'
            }
        })
        expect(wrapper.html()).toContain('antangaga')
    })
})
