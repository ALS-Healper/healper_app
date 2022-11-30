import { LocalNotifications } from "@nativescript/local-notifications";
import {SecureStorage} from "@nativescript/secure-storage";
import { authHeaders } from "../store/staticValues.js";
import { getData } from "../store/dataHandler.js"

LocalNotifications.hasPermission();

export const notification = async function(){
    let notification;
    let secureStorage = new SecureStorage();
    let authToken;
    let aHeaders;
    let date = new Date()
    let currentDay = date.getDay();
    // var date, daytoset; // given: a Date object and a integer representing the week day

    // var currentDay = date.getDay();
    // var distance = daytoset - currentDay;
    // date.setDate(date.getDate() + distance);
    // var distance = (daytoset + 7 - currentDay) % 7;
    
    authToken = secureStorage.getSync({
        key: "authToken"
    });

    authHeaders.subscribe((value) => {
        aHeaders = value;
        aHeaders.Authorization = `Token ${authToken}`;
    });

    const data = await getData("http://10.0.2.2:8080/notifications/", aHeaders)
    notification = data.results[0]
    //alert(JSON.stringify(notification))

    //let distance = (notification.interval.day_of_week - currentDay) // This week
    let distance = (notification.interval.day_of_week + 7 - currentDay) % 7 // Next week
    date.setDate(date.getDate() + distance)
    alert(date)

    LocalNotifications.schedule([
        {
            id:1, 
            title: notification.title,
            body: notification.text,
            at: new Date(new Date().getTime() + 5 * 1000),
            interval: 'hour'
        }
    ])
}

// LocalNotifications.schedule([
// 	{
// 		id: 1, // generated id if not set
// 		title: 'The title',
// 		body: 'Recurs every minute until cancelled',
// 		ticker: 'The ticker',
// 		color: new Color('red'),
// 		badge: 1,
// 		groupedMessages: ['The first', 'Second', 'Keep going', 'one more..', 'OK Stop'], //android only
// 		groupSummary: 'Summary of the grouped messages above', //android only
// 		ongoing: true, // makes the notification ongoing (Android only)
// 		icon: 'res://heart',
// 		image: 'https://cdn-images-1.medium.com/max/1200/1*c3cQvYJrVezv_Az0CoDcbA.jpeg',
// 		thumbnail: true,
// 		interval: 'minute',
// 		channel: 'My Channel', // default: 'Channel'
// 		sound: isAndroid ? 'customsound' : 'customsound.wav',
// 		at: new Date(new Date().getTime() + 10 * 1000), // 10 seconds from now
// 	},
// ]).then(
// 	(scheduledIds) => {
// 		console.log('Notification id(s) scheduled: ' + JSON.stringify(scheduledIds));
// 	},
// 	(error) => {
// 		console.log('scheduling error: ' + error);
// 	}
// );