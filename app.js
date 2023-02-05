//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    let firstName = req.body.fName;
    let secondName = req.body.lName;
    let eMail = req.body.eMail;

    const data = {
        members: [
            {
                email_address: eMail,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: secondName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us13.api.mailchimp.com/3.0/lists/882bd68d4d";

    const options = {
        method: "POST",
        auth: "Sirakov4444@:fb04bf955caec38670b09fbc3507b87c-us13"
    }

    const request = https.request(url, options, function(response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })

    
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res) {
    res.redirect("/")
});

app.post("/success", function(req, res) {
    res.redirect("/")
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port: 3000");
});
//fb04bf955caec38670b09fbc3507b87c-us13
//882bd68d4d