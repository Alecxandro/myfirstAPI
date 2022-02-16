const router = require("express").Router();
const Person = require("../models/Person");

router.post("/", async (req, res) => {
  const { userName, email, wage, approved } = req.body;

  if (!userName || !email || !wage || !approved)
    res.status(422).json({ error: "you must fill all the fields!" });

  const person = {
    userName,
    email,
    wage,
    approved,
  };
  console.log(person);

  try {
    await Person.create(person);

    res.status(201).json({ message: "data saved successfully" });
  } catch (error) {
    console.warn(`${error.message}`);
  }
});

router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {}
});

router.get("/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const person = await Person.findOne({ userName: name });

    if (!person) {
      res.status(422).json({ message: "Person Not Found" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {}
});

router.patch("/:name", async (req, res) => {
  const name = req.params.name;
  const { userName, email, wage, approved } = req.body;

  const person = {
    userName,
    email,
    wage,
    approved,
  };

  try {
    const updatedPerson = await Person.updateOne({ userName: name }, person);
    res.status(200).json(person);
  } catch (error) {}
});

router.delete("/:name", async (req, res) => {
  const name = req.params.name;

  const person = await Person.findOne({ userName: name });

  if (!person) {
    res.status(422).json({ message: "Person Not Found" });
    return;
  }

  try {
    await Person.deleteOne({ userName: name });
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {}
});

module.exports = router;
