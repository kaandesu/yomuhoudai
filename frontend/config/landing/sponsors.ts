import {
	Crown,
	Vegan,
	Ghost,
	Puzzle,
	Squirrel,
	Cookie,
	Drama,
} from 'lucide-vue-next'

interface sponsorsProps {
	icon: string
	name: string
}

export const sponsors = {
	sponsorList: [
		{
			icon: 'crown',
			name: 'Acmebrand',
		},
		{
			icon: 'vegan',
			name: 'Acmelogo',
		},
		{
			icon: 'ghost',
			name: 'Acmesponsor',
		},
		{
			icon: 'puzzle',
			name: 'Acmeipsum',
		},
		{
			icon: 'squirrel',
			name: 'Acme',
		},
		{
			icon: 'cookie',
			name: 'Accmee',
		},
		{
			icon: 'drama',
			name: 'Acmetech',
		},
	] as sponsorsProps[],
	iconMap: {
		crown: Crown,
		vegan: Vegan,
		ghost: Ghost,
		puzzle: Puzzle,
		squirrel: Squirrel,
		cookie: Cookie,
		drama: Drama,
	} as Record<string, HTMLElement>,
}
