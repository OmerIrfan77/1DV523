const controller = {};
import dotenv from "dotenv";
import fetch from "node-fetch";
export default controller;
dotenv.config();
const privateToken = process.env.GITLAB_TOKEN;
const gitlabURL =
  "https://gitlab.lnu.se/api/v4/projects/23236/issues?private_token=" +
  privateToken;

controller.index = async (req, res) => {
  try {
    console.log("GET");
    const rawData = await fetch(gitlabURL);
    const issues = await rawData.json();
    const issueArr = [];
    for (const issue of issues) {
      //console.log(issue.title);
      issueArr.push(issue);
    }

    res.render("index", { issueArr });
  } catch (error) {
    console.log(error);
  }
};

controller.test = (req, res) => {
  console.log("POST METHOD");
};

// controller.webhookPost = async (req, res, next) => {
//   console.log("OUTSIDE WEBHOOK");
//   const token = req.headers["x-gitlab-token"];
//   if (token === privateToken) {
//     console.log("HEREEEEE");
//     const issuesHook = { title: req.body.object_attributes.title };
//     res.locals.issueTitle = issuesHook;
//     return next();
//   }
//   return res.sendStatus(500);
// };
