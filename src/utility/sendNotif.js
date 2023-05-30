export default function sendNotif(data) {
    if(Notification.permission === 'granted') {
        let options = {
            body: data.notif.body,
            icon: data.notif.icon,
            dir: 'ltr'
        };
        const notification = new Notification(data.title, options);
        notification.close();
    }
}