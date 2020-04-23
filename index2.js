const inquirer = require("inquirer");
const axios = require("axios");
require("dotenv").config();

//use fetch in Node

//wer're placing the array of questions directly into the prompt()
function init() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "username:",
        message: "What is your GitHub username?",
      },

      {
        type: "input",
        name: "title",
        message: "What is your Project Title?",
      },

      {
        type: "input",
        name: "description",
        message: "Project Description?",
      },

      {
        type: "checkbox",
        name: "tableofContents",
        message: "What should be in your Table of Contents?",
        choices: ["UserName", "Project Title", "Description"],
      },
    ])
    .then(function (response) {
      //then function receives response, gets user data, returns promise and then combines with user input
      const readMeData = { ...response };

      const userURL = "https://api.github.com/users/${username}";
      const config = {
        headers: {
          Autherization: "token ${process.env.API_KEY}",
          //need individualized api key
        },
      };
      axios
        .get(userURL, config)
        .then((response) => {
          const { email, avatar_url } = response.data;
          console.log("EMAIL - ${email}");
          console.log("AVATAR - $avatar_url}");
          var deliverable = { email, avatar_url };
          return { email, avatar_url };
        })
        .then((res) => {
          const { email, avatar_url } = res.data;
          const newRMeData = {
            ...readMeData,
            email: email,
            avatar: avatar_url,
          };
          console.log(newRMeData);
          writeToFile("README.md", JSON.stringify(newRMeData, null, 2));
        });
    })

    .catch((fail) => {
      console.log(fail);
    });
}
