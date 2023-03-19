//all requests stored here
import { directReducer } from "./reduxUtils"

export const getData = (route, method, data, action, type) => {
    if (method.toLowerCase() !== 'get') {
        fetch(route, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) || '',
        })
    } else {
        fetch(route, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then(response => response.json()).then(data => {
            directReducer(action, data, type)
        })
    }
}