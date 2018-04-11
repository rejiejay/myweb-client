import homePageArticles from './ajax/homePageArticles.js';
import otherPages from './ajax/otherPages.js';

const index = {
	data: {
		namespace: 'index',

		state: {
			homeArticles: homePageArticles,
			otherPages: otherPages,
		},

		reducers: {}
	},

	init: function (app) {
		// app._store.dispatch({
		// 	type: 'index/reducers',
		// 	data: ''
		// });
	}
}

export default index;
