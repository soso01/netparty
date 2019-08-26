const express = require("express");
const bodyParser = require("body-parser");
const model = require("./model");
const request = require("request");
const cheerio = require("cheerio");
const deleteKey = require("../key").deleteKey;
const moment = require("moment")
require('moment/locale/ko')

const app = express();

//정규표현식으로 주소 유효성 판단
const checkAddress = address => {
  if (address.match(/http(s)?:\/\/open.kakao.com\/o\//) === null) {
    return true;
  }
  return false;
};

//링크가 유효한지
const checkValid = async address => {
  const check = await new Promise(resolve => {
    request.get(address, (err, r, body) => {
      if (err) {
        resolve(true);
      }
      const $ = cheerio.load(body);
      const checkString = $(".openchat_chat_btn")
        .text()
        .trim();
      resolve(Boolean(!checkString));
    });
  });
  return check;
};

//db 중복검사
const checkOverlap = async address => {
  const data = await model.openkatok.find({ address: address });
  return data.length !== 0;
};

const existDataValidCheck = (() => {
  setInterval(async () => {
    console.log("실행~~");
    const data = await model.openkatok.find({ valid: true });
    data.forEach(async v => {
      if (await checkValid(v.address)) {
        await model.openkatok.updateOne(
          { _id: v._id },
          { $set: { valid: false } }
        );
      }
    });
  }, 1800 * 1000);
})();

app.post("/maketok", async (req, res) => {
  const { address, content, password } = req.body;
  console.log(address, content);
  //체크
  // if (checkAddress(address)) {
  //   res.send("Address fail")
  //   return
  // } else if (await checkValid(address)) {
  //   res.send("Valid fail")
  //   return
  // } else if (await checkOverlap(address)) {
  //   res.send("overlap fail")
  //   return
  // }
  //모델생성
  await model.openkatok.create({
    address: address,
    content: content,
    password: password,
    valid: true,
    Date: moment().format("LL")
  });
  res.send("success");
});

app.post("/data", async (req, res) => {
  const { page, valid } = req.body;
  const data = await model.openkatok
    .find({ valid: valid })
    .sort({ Date: valid === true ? 1 : -1 })
    .skip((page - 1) * 4)
    .limit(4);
  res.json(data);
});

app.post("/getCount", async (req, res) => {
  const trueCount = await model.openkatok.count({ valid: true });
  const falseCount = await model.openkatok.count({ valid: false });
  res.json({ trueCount, falseCount });
});

app.delete("/delete", async (req, res) => {
  const { data, password } = req.body;
  if (password !== data.password && password !== deleteKey) {
    return;
  }
  await model.openkatok.deleteOne({ _id: data._id });
  res.send("success");
});

module.exports = app;
