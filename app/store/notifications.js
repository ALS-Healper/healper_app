import { LocalNotifications } from "@nativescript/local-notifications";
import {SecureStorage} from "@nativescript/secure-storage";
import { authHeaders } from "../store/staticValues.js";
import { getData } from "../store/dataHandler.js"

LocalNotifications.hasPermission();

export const setupNotifications = async function(isCancled){
    let secureStorage = new SecureStorage();
    let authToken;
    let aHeaders;
    let notification;
    let date = new Date();
    let currentDate = new Date(date);

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
        case "day":
            if(currentDate.getTime() > date.getTime()) date.setDate(date.getDate() + 1) // if notification is set to before current time add one day
            else if(isCancled) date.setDate(date.getDate() + 1) // if it is cancled add one day
        break;
        case "week":
            let distance;
            if(notification.interval.day_of_week < currentDate.getDay()){distance = (notification.interval.day_of_week + 7 - currentDate.getDay())}
            else{distance = (notification.interval.day_of_week - currentDate.getDay())} // Checking distance from current day and notification day
            date.setDate(date.getDate() + distance)                                     // if distance is negative add 7 to notification day
            if(date.getDate() == currentDate.getDate()){
                if(currentDate.getTime() > date.getTime()) date.setDate(date.getDate() + 7) // time check
            }
        break;
        case "month":
            if(date.getDate() > notification.interval.day_of_month){ date.setMonth(date.getMonth() + 1) } // check if date has passed if yes add one month
            date.setDate(notification.interval.day_of_month)
            if(date.getDate() == currentDate.getDate()){
                if(currentDate.getTime() > date.getTime()) date.setMonth( date.getMonth() + 1) // time check
            }
        break;
        case "year":
            if(date.getMonth() > notification.interval.month_of_year){ date.setFullYear(date.getFullYear() + 1) } // check if month has passed if yes add one year
            else if(date.getMonth() === notification.interval.month_of_year){
                if(date.getDate() > notification.interval.day_of_month){ // check if date in month has passed if yes add one year
                    date.setFullYear(date.getFullYear() + 1)
                }
            }
            if(date.getDate() == currentDate.getDate()){
                if(currentDate.getTime() > date.getTime()) date.setFullYear( date.getFullYear() + 1) // time check
            }
        break;
    }
    
    LocalNotifications.schedule([
        {
            id:1, 
            title: notification.title,
            body: notification.text,
            at: date,
            interval: notification.interval.interval_type
        }
    ])
}

// export const cancelQuestionnairNotification = async function(){
//     LocalNotifications.cancel(1)
//     alert("Notification has been cancled")
// }

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