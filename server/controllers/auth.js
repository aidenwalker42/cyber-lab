const bcrypt = require("bcryptjs");
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body //set variables for the values of each key
      for (let i = 0; i < users.length; i++) { //make i increment by 1 until users.length

        if (users[i].username === username && bcrypt.compareSync(password, users[i].passHash)) { //if username at index i is equal to req.body.username, and when the respective passHash unscrambles is equal to req.body.password ...
          res.status(200).send(users[i]) //send the user at i
          return //stop the function so that the error message doesnt run.
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        const { username, email, firstName, lastName, password } = req.body; //all the values in the object are equal to the respective variables
        const salt = bcrypt.genSaltSync(5); 
        const passHash = bcrypt.hashSync(password, salt); //encrypt the value of the password sent in (req.body.password technically)
        let myObj = { //make a new object, all the same values except we are adding the hashed password
          username,
          email,
          firstName,
          lastName,
          passHash //here
        }
        users.push(myObj); //push the object with the hashed password to the users array so that the login function can access it
        console.log(users);
        console.log(req.body);

        res.status(200).send(req.body) //send the body
    }
}