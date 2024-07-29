const express = require("express");
const app = express();

let user = {
  name: "John",
  kidneys: [
    {
      healthy: false,
    },
    {
      healthy: true,
    },
  ],
};

let users = [user];

app.use(express.json());

function getHandler(req, res) {
  const userKidneys = users[0].kidneys;
  const totalKidneys = userKidneys.length;
  const healthyKidneys = userKidneys.filter((kidney) => kidney.healthy == true);
  const numberOfHealthyKidneys = healthyKidneys.length;
  const numberOfUnhealthyKidneys = totalKidneys - numberOfHealthyKidneys;
  res.json({
    totalKidneys,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys,
  });
}

function postHandler(req, res) {
  const isHealthy = req.body.isHealthy;
  //   console.log(req.body);
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.send("Kidney Added Successfully!");
}

function putHandler(req, res) {
  if (isThereAnUnhealthyKidney()) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
      users[0].kidneys[i].healthy = true;
    }
    res.send("Unhealthy Kidneys Updated");
  } else {
    res.status(411).json({
      msg: "No Unhealthy Kidneys Present",
    });
  }
}

function deleteHandler(req, res) {
  if (isThereAnUnhealthyKidney()) {
    users[0].kidneys = users[0].kidneys.filter(
      (kidney) => kidney.healthy == true
    );
    res.send("Unhealthy Kidneys Deleted");
  } else {
    res.status(411).json({
      msg: "No Unhealthy Kidneys Present!",
    });
  }
}

function isThereAnUnhealthyKidney() {
  let present = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) return true;
  }
  return false;
}

app.get("/", getHandler);
app.post("/", postHandler);
app.put("/", putHandler);
app.delete("/", deleteHandler);

app.listen(3000);
