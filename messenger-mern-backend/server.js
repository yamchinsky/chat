//импортируем зависимости
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";

import mongoMessages from "./messageModel.js";

//app настройки

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1262273",
  key: "19571fa9ee4db9d0ca0a",
  secret: "9b66bb5bfb053aa3605e",
  cluster: "eu",
  useTLS: true,
});

//мидлвары
app.use(express.json());
app.use(cors());

//настройки базы данных
const mongoURI =
  "mongodb+srv://Pavlo:Customer_123@cluster0.rpvlu.mongodb.net/chat-live?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  // useCreateIndex: true, //больше не нужно указывать в версиях mongoose больше 6.0
  // useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB CONNECTED");
  const changeStream = mongoose.connection.collection("messages").watch();
  changeStream.on("change", (change) => {
    pusher.trigger("messages", "newMessage", {
      change: change,
    });
  });
});

//api роуты

app.get("/", (req, res) => res.status(200).send("hello world!"));

app.post("/save/message", (req, res) => {
  const dbMessage = req.body;

  mongoMessages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/retrieve/conversation", (req, res) =>
  mongoMessages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      data.sort((b, a) => {
        return a.timestamp - b.timestamp;
      });
      res.status(200).send(data);
    }
  })
);

//слушатель сервера
app.listen(port, () => console.log(`listening on localhost: ${port}`));
