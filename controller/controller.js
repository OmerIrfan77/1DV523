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

// controller.test = async (req, res) => {
//   console.log("POST METHOD");
// };

controller.webhookPost = async (req, res, next) => {
  console.log("POST");
  console.log("OUTSIDE WEBHOOK");
  const token = req.headers["x-gitlab-token"];
  console.log(req.headers);
  if (token === privateToken) {
    console.log("HEREEEEE");
    const issuesHook = {
      title: req.body.object_attributes.title,
      author: req.body.user.username,
      id: req.body.object_attributes.id,
      description: req.body.object_attributes.description,
      state: req.body.object_attributes.state,
      link: req.body.object_attributes.url,
      created_at: req.body.object_attributes.created_at,
      updated_at: req.body.object_attributes.updated_at,
      type: req.body.event_type,
    };
    res.locals.issueEvent = issuesHook;
    console.log(res.locals.issueEvent);
    return next();
  }
  return res.sendStatus(500);
};
