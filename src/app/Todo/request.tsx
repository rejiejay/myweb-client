import { config } from './../config';

export default {
    getAllByTime: () => fetch(`${config.basicUrl}/todo/getAllByTime`, {
        method: 'GET'
    }).then(
        response => response.json(),
        error => ({
            'result': 0, 
            'message': `Fetch all todo is error, The reason is ${error}`
        }) 
    ),
    getAllCategory: () => fetch(`${config.basicUrl}/todo/getAllCategory`, {
        method: 'GET'
    }).then(
        response => response.json(),
        error => ({
            'result': 0, 
            'message': `Fetch category is error, The reason is ${error}`
        }) 
    )
}
