const express = require("express");

const app = express();

const port = 3000;

app.listen(port, (err) => {
	if (err) {
        return console.log("Error: ", err)
    }
	console.log("Server is listening on port " + port)
})

app.get("/api", (req, res) => {
	res.send({method: "GET"})
});