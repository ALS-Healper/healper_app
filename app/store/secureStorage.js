import {SecureStorage, SecureStorage} from "@nativescript/secure-storage"
import { userToken, user } from './userStore.js'

let secureStorage = new SecureStorage();

let authToken = SecureStorage.getSync({
    key: "authToken"
});

async function setSecureStorage(username, password){
    const res = await fetch('http://10.0.2.2:8080/api-token-auth/',  {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: username,
        password: password
    })
})
const data = await res.json()
userToken.set({'Token': data.token})

secureStorage.set({
    key : "authToken",
    value: data.token
}).then((data) => console.log(data))
token = data.token

};

async function getSecureStorage(){
    
}
