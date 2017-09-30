export default {
  namespace: 'user',

  state: {
    'isFirstVisit': true
  },

  reducers: {
    visit(state) { return {...state, isFirstVisit: false} }
  }
};
