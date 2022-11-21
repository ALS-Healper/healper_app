import { writable } from 'svelte/store';

async function getData(url){
    const response =  await fetch(url);
    return await response.json(); 
};

async function postData(url, data){
    const response = await fetch(url, {
        header: {
            "content-type": "applikation/json"
        },
        method: "POST",
        mode: "cors",
        body: {data}
    });

    return response.json();
};



export default {getData, postData};