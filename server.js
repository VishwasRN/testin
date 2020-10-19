const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const spawn = require("child_process").spawn;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.post("/", (req, res) => {
  const process = spawn("python", ["./hello.py", req.body.data]);

  process.stdout.on("data", (data) => {
    console.log(data.toString());
    res.send(req.body);
  });
});

const PORT = 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});
