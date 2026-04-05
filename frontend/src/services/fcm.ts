import { getToken } from "firebase/messaging"
import { getFirebaseMessaging } from "../utils/firebase"


export const getFCMToken = async () => {
  try {
    const messaging = await getFirebaseMessaging()
    if (!messaging) return null
    const permission = await Notification.requestPermission()
    if (permission !== "granted") return null
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
    await navigator.serviceWorker.ready  //to make service workers active
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration:registration
    })

    return token
  } catch (err) {
    console.log("FCM error:", err)
    return null
  }
}