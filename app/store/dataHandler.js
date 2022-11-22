async function getData(url, token){
    const response =  await fetch(url, {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Token ${token}`
        },
        method: "GET"
    });
    return await response.json(); 
};

async function postData(url, data){
    const response = await fetch(url, {
        header: {
            "content-type": "application/json"
        },
        method: "POST",
        mode: "cors",
        body: {data}
    });

    return response.json();
};

function formatDates(stringDate){

    let date = new Date(stringDate);

    let formatDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(); 

    return formatDate;

}

export default {getData, postData, formatDates};