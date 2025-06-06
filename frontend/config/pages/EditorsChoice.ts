import type { Page } from '~/types/config'

export const EditorsChoice = ref<Page>({
	title: 'EditorsChoice',
	href: '/explore/editors-choice',
	uid: 'explore-editors-choice',
	icon: 'healthicons:artificial-intelligence-outline',
	desc: 'AI suggested books',
	tourDesc: 'AI suggested books',
	parent: 'explore',
	layout: 'dashboard-tabs',
})
