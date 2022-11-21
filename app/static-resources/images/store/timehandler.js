import { writable } from "svelte/store"

async function formatDates(){

    const dates = [];

    let testData = new Date();

    console.log(testData.toLocaleDateString("en-US")); 


}

export default formatDates;