import { LocalNotifications } from "@nativescript/local-notifications";

LocalNotifications.hasPermission();

export const notification = function(){
    LocalNotifications.schedule([
        {
            id:1, 
            title: "Healper",
            body: "Hello guys",
            ticker: "The ticker",
            at: new Date(new Date().getTime() + 5 * 1000),
            interval: 'minute'
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