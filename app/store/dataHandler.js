export const getData = async function getData(url, headers){
    const response =  await fetch(url, {
        headers: headers,
        method: "GET"
    });

    const data = await response.json();
    return data;
};

export const postData = async function postData(url, headers, data){
    const response = await fetch(url, {
        headers: headers,
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data)
    });

    const data1 = await response.json();
    return data1;
};

export const patchData = async function patchData(url, headers, data){
    const response = await fetch(url, {
        headers: headers,
        method: "PATCH",
        mode: "cors",
        body: JSON.stringify(data)
    });

    const data1 = await response.json();
    return data1;
};

export const formatDates = function formatDates(stringDate){

    let date = new Date(stringDate);

    let formatDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(); 

    return formatDate;

}