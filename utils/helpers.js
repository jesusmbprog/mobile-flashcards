import { AsyncStorage } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'flashcards:notifications';

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
  let tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(20)
  tomorrow.setMinutes(0)

  return {
    content: {
      title: "Play quiz!",
      body: "don't forget to play quiz all days",
      data: { data: "goes here" },
    },
    trigger: { seconds: (tomorrow.getTime() - Date.now())/1000 } 
  }
}

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
  
                Notifications.scheduleNotificationAsync(createNotification())
  
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
            .catch((error) => {
              console.warn(`Error Notifications permission: ${error}`)
          });
        }
      })
  }