const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
let firebase = require('firebase');
let config = {
    apiKey: "AIzaSyAnDn0H4M2FTYtg-KU2N72FUXRdqEnyZh8",
    authDomain: "sweetdreams-9e7ba.firebaseapp.com",
    databaseURL: "https://sweetdreams-9e7ba.firebaseio.com",
    projectId: "sweetdreams-9e7ba",
    storageBucket: "sweetdreams-9e7ba.appspot.com",
    messagingSenderId: "556594700723"
};
firebase.initializeApp(config);
app.use(express.static(path.resolve(__dirname, '../dist')));
// is anyone home?
//app.use(express.static("dist"));
//Fetch instances
app.get('/api', function (req, res) {
    console.log("HTTP Get Request");
    res.set('Content-Type', 'application/json');
    let userReference = firebase.database().ref("/");
    //Attach an asynchronous callback to read the data
    userReference.on("value", function (snapshot) {
        const infor = snapshot.val();
        res.send({ express: infor });
        //res.json(infor);
        console.log(infor);
        userReference.off("value");
    }, function (errorObject) {
        res.send("The read failed: " + errorObject.code);
    });
    //res.send({ express: fetchedProducts });
    //res.json(fetchedProducts);
});
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../react-app/dist', 'index.html'));
});
app.listen(PORT, () => console.log('Just memeing'));
//# sourceMappingURL=server.js.map