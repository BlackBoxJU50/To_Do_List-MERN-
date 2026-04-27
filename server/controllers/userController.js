const EmployeeModel = require("../models/Employee");

exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password == password) {
                    res.json({ status: "Success", name: user.name });
                } else {
                    res.json("Password not match");
                }
            } else {
                res.json("User not found");
            }
        })
        .catch(err => res.json(err));
};

exports.registerUser = (req, res) => {
    EmployeeModel.create(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
};
