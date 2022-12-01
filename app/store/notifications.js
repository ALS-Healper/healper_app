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
    let currentTime = date.getTime();

    authToken = secureStorage.getSync({
        key: "authToken"
    });

    authHeaders.subscribe((value) => {
        aHeaders = value;
        aHeaders.Authorization = `Token ${authToken}`;
    });

    const data = await getData("http://10.0.2.2:8080/notifications/", aHeaders)
    notification = data.results[0]

    let timeElements = notification.interval.time_of_day.split(":")
    date.setHours(timeElements[0])
    date.setMinutes(timeElements[1])
    date.setSeconds(timeElements[2])

    switch(notification.interval.interval_type){
        case "week":
            let distance;
            if(notification.interval.day_of_week < currentDay){distance = (notification.interval.day_of_week + 7 - currentDay)}
            else{distance = (notification.interval.day_of_week - currentDay)}
            date.setDate(date.getDate() + distance)
        break;
        case "month":
            if(date.getDate() > notification.interval.day_of_month){
                date.setMonth(date.getMonth() + 1)
            }
            date.setDate(notification.interval.day_of_month)
        break;
        case "year":
            if(date.getMonth() > notification.interval.month_of_year){
                date.setFullYear(date.getFullYear() + 1)
            }
            else if(date.getMonth() === notification.interval.month_of_year){
                if(date.getDate() > notification.interval.day_of_month){
                    date.setFullYear(date.getFullYear() + 1)
                }
            }
        break;
    }
    //alert(date)
    LocalNotifications.schedule([
        {
            id:1, 
            title: notification.title,
            body: notification.text,
            at: date,
            interval: notification.interval.interval_type
        }
    ])
    if(currentTime > date.getTime()){
        LocalNotifications.cancel(1)
    }
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