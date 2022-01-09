const express = require("express");
const router = express.Router();
const Form = require("./models/question"); // includes our model
const User = require("./models/user");
const SavedFormSchema = require("./models/savedForm");

//creating user
router.post("/user", async (req, res) => {
  try {
    const { username } = req.body;
    const { email } = req.body;
    const { role } = req.body;
    const user = await User.create({
      username: username,
      email: email,
      role: role,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

//submitting form response
router.post("/formsubmission/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const { user_id } = req.body;
    const qA = [];
    const form = await Form.findOne({ _id });
    if (form) {
      const { answer } = req.body;
      answer.map((id) =>
        form.questions.map((qItem) => {
          let isOptions = qItem.options.find((oItem) => oItem.id === id);
          if (isOptions) {
            questionid = qItem._id;
            qA.push({
              questionid: questionid,
              answerid: id,
            });
          }
        })
      );
      const saveform = await SavedFormSchema.create({
        form_id: _id,
        response: qA,
        user_id: user_id,
      });
      return res.status(201).json(saveform);
    } else {
      return res.status(404).json({});
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// creating forms
router.post("/forms", async (req, res) => {
  try {
    const { aboutForm } = req.body;
    const { questions } = req.body;
    const question = await Form.create({
      aboutForm: aboutForm,
      questions: questions,
    });

    return res.status(201).json(question);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

//get all forms
router.get("/forms", async (req, res) => {
  try {
    const forms = await Form.find();
    return res.status(200).json(forms);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

//form by id
router.get("/forms/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const form = await Form.findOne({ _id });
    if (!form) {
      return res.status(404).json({});
    } else {
      return res.status(200).json(form);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// this one is just a test
router.get("/", (req, res) => {
  res.send("Hell0 W0RlD");
});

module.exports = router;
