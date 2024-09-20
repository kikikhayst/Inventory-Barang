var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BEW3ZAR4ROPn3TrNF8J1Kc-yeaoE0kUK1f0D80ZUWT8ulu8P2IBuksKTMkdK6_qD2E51tbdmA24Ik6ki_SUPJE8",
    "privateKey": "tyZjqx_jIrdg6cLUmVdwSVgBmu7OBXzF5OK2gYjm0vw"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/f2v44Bmh0hg:APA91bFHWE6NEb1sutY60o7roQBQ1ihpY1zjL2Dsc0EU3IpBvvNH2rqbMDpy6gk-bbhB3fUZb2bpRC8RRjNm1DnP22jWGiyiTM1TSSKr-a28Z2h0k7Y-nsN8Bf5zYgnGfbge687Icdoi",
    "keys": {
        "p256dh": "BOm5zCiy8czcAf3zpDBl8I5zDasYQjgGFUAsbnbjN05SwWBvDGL1rCbvr7tacN79tOdXKxy9x+W0axcADGw3YPk=",
        "auth": "YWR6UcPOU7dRdGGtD5S/2Q=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '215456186893',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);