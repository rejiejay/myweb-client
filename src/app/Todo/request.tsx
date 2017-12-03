import { config } from './../config';

export default {
    getAllByTime: () => fetch(`${config.basicUrl}/todo/getAllByTime`, {
        method: 'GET'
    }).then(
        response => response.json(),
        error => ({
            'result': 0, 
            'message': `Fetch is error, The reason is ${error}`
        }) 
    ),
    getAllCategory: () => fetch(`${config.basicUrl}/todo/getAllCategory`, {
        method: 'GET'
    }).then(
        response => response.json(),
        error => ({
            'result': 0, 
            'message': `Fetch is error, The reason is ${error}`
        }) 
    )
}
