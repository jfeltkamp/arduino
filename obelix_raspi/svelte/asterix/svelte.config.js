import adapter from '@sveltejs/adapter-static';

export default {
	kit: {
		paths: {
			base: '/static'
		},
		adapter: adapter({
			fallback: 'index.html' // may differ from host to host
		})
	}
};
