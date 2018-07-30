const index = {
	data: {
		namespace: 'index',

		state: {
			previewIsAdd: false, // 预览页面是否新增
			previewId: null, // 预览页面的 Id 并且用来判断 预览页面是否新增
			previewYear: null, // 预览页面的 年份
			previewTitle: '', // 预览页面的标题
			previewContent: '', // 预览页面的内容
		},

		reducers: {
			/**
			 * 清空预览页面
			 */
			clearPreview(state) { 
				return {
					...state,
					previewId: null,
					previewYear: null,
					previewTitle: '',
					previewContent: '',
				}
			},
			/**
			 * 将 预览页面的 Id 等其他数据保存
			 */
			setPreviewId(state, data) { 
				return {
					...state,
					previewId: data.id,
					previewYear: data.year,
					previewTitle: data.title,
					previewContent: data.content,
				}
			},
			/**
			 * 将 预览页面的标题
			 */
			setPreviewTitle(state, data) { 
				return {
					...state,
					previewTitle: data.title
				}
			},

			/**
			 * 将 预览页面的内容
			 */
			setPreviewContent(state, data) { 
				return {
					...state,
					previewContent: data.content
				}
			},

			/**
			 * 将 预览页面设置为新增
			 */
			setPreviewAdd(state) { 
				return {
					...state,
					previewIsAdd: true
				}
			},
		}
	},

	init: function (app) {
		// app._store.dispatch({
		// 	type: 'index/reducers',
		// 	data: ''
		// });
	}
}

export default index;
