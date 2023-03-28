//all requests stored here
import { directReducer } from "./reduxUtils"

export const getData = (route, method, data, action, type, res) => {
    if (method.toLowerCase() !== 'get') {
        fetch(route, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) || '',
        }).then((res)=>res.json()).then(response=>{
            console.log(response);
            if(res){
                directReducer(action, response, type)
            }else{
                directReducer(action, data, type)
            }

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