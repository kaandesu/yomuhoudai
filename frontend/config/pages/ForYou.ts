import type { Page } from '~/types/config'

export const ForYou = ref<Page>({
	title: 'ForYou',
	href: '/dashboard/for-you',
	uid: 'dashboard-for-you',
	desc: '',
	tourDesc: 'Suggestions based on your selection',
	parent: 'dashboard',
	layout: 'dashboard-tabs',
})
