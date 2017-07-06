import fetch from 'isomorphic-fetch'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'


// function fetchGuestsMessage() {
//   var data = {}

//   fetch('/data.json')

//   .then(function(response) {
//       if (response.status >= 400) {
//           throw new Error("Bad response from server");
//       }
//       return response.json();
//   })

//   .then(function(stories) {
//       //console.log(stories);
//       //return stories
//       data = stories
//       dispatch(receivePosts(stories))
//   });

//   return data
// }

function fetchGuestsMessage() {

  return function (dispatch) {

    return fetch('/data.json')
      .then(response => response.json())
      .then(
        json => dispatch(receivePosts(json))
      )
  }
}


function receivePosts(json) {
  // console.log(json)
  return {
    type: GET_GuestsMessage,
    data: json
  }
}

const GET_GuestsMessage = 'GET_GuestsMessage'

export default function GuestsMessage(type, data) {
  // return { type: GET_GuestsMessage, data:fetchGuestsMessage() }
  return (dispatch, getState) => {
    return dispatch(fetchGuestsMessage())

  }
}



