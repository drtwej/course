const jwt = require("jsonwebtoken");
const UserService = require("../services/AuthService");

class AuthController {
  static async register(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserService.register(email, password);
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "2h" });
      res.cookie("token", token, { httpOnly: true, secure: true });
      res.redirect("/projects");
    } catch (err) {
      res.status(400).send("Error registering user");
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const token = await UserService.login(email, password);
      res.cookie("token", token, { httpOnly: true, secure: true });
      res.redirect("/projects");
    } catch (err) {
      res.status(400).send("Invalid login credentials");
    }
  }

  static logout(req, res) {
    res.clearCookie("token");
    res.redirect("/auth/login");
  }
}

module.exports = AuthController;
