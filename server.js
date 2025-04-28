const express = require('express')
const app = express();

app.use(express.static("public"))

app.get('/', (req, res) => {
    res.send("Railway server")
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server pokrenut na ${PORT}");
})