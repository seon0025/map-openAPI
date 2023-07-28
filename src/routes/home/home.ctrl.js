"use strict";

const send = require("send");
const User = require("../../classes/User");
const fs = require("fs");
const logger = require("../../config/logger");

const output = {
  hello: (req, res) => {
    console.log(__dirname)
    fs.readFile( __dirname + "/xylist.json", 'utf-8', function (err, data) {
      
      var jsonData = JSON.parse(data);
      res.render("home/index", {jsonData});
    })
  },
   login : (req, res) => {
        logger.info(`GET /login 200 "로그인 화면으로 이동"`);
        res.render("home/login");
    },

  register : (req, res) => {
      logger.info(`GET /register 200 "회원가입 화면으로 이동"`);
      res.render("home/register");
  },
  sample: (req, res) => {
    send("./sample.js")
  },
};


const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();

    const url = {
      method: "POST",
      path : "/login",
      status : response.err ? 400 : 200,
    };

    log(response, url);
    return res.status(url.status).json(response);
},

  register: async (req, res) => {
      const user = new User(req.body);
      const response = await user.register();

      const url = {
        method: "POST",
        path : "/register",
        status : response.err ? 400 : 201,
      };

      log(response, url);
      return res.status(url.status).json(response);
  },
};

module.exports = {
  output,
  process,
};

const log = (response, url) => {
  if (response.err) {
    logger.error(
        `${url.method} ${url.path} ${url.status} Response: "success: ${response.success}, ${response.err}"`
    );
  } else
    logger.info(
        `${url.method} ${url.path} ${url.status} Response: "success: ${response.success}, msg: ${response.msg}"`
    );
}