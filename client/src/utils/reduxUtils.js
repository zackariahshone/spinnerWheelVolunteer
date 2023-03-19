import {store} from '../store/datastorconfig';

export const directReducer =(action, data,type)=>{
    store.dispatch(action(
        {
            type:type || null, 
            data
        }
    ))
}