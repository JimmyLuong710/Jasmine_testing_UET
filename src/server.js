const express = require('express');

const app = express();

app.get("/users", (req, res) => {
    console.log('hello bro')
    res.json('this is list of tasks')
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
