module.exports = (req, res) => {
  if (req.body.password === "") {
    res.status(200).json({ error: "password is required", hint: "" });
  } else if (
    typeof req.body.password !== "string" ||
    req.body.password.trim().length < 5
  ) {
    res
      .status(200)
      .json({ error: "password should be at least 5 characters", hint: "" });
  } else {
    res.status(200).json({ error: "", hint: "password is ok" });
  }
};
