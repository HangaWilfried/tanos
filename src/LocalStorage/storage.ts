import {User} from '../interface/User'
export const setSave = (name:string, data:User[]):void => {
    localStorage.setItem(name , JSON.stringify(data))
}

