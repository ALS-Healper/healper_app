import { detach } from "svelte/internal";
import { writable } from "svelte/store"

function formatDates(stringDate){

    let date = new Date(stringDate);

    let formatDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(); 

    return formatDate;

}

export default formatDates;