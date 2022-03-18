export default function Login() {

    // React states for error message objects and for boolean values to indicate submission success
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // For generating error messages
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // To render the login form
    const renderForm = (
        <div className="form">
            <form>
            <div className="input-container">
              <label>Username </label>
              <input type="text" name="uname" required />
              {renderErrorMessage("uname")}
            </div>
            <div className="input-container">
              <label>Password </label>
              <input type="password" name="pass" required />
              {renderErrorMessage("pass")}
            </div>
            <div className="button-container">
              <input type="submit" />
            </div>
            </form>
        </div>
    );

    // Pretend user info database
    const database = [
        {
          username: "user",
          password: "pass"
        },
    ];
    
    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    // Submission handling
    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();
        var { uname, pass } = document.forms[0];

        // Find user login info
        const userData = database.find((user) => user.username === uname.value);

        // Compare user info
        if (userData) {
            if (userData.password !== pass.value) {
            // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsSubmitted(true);
            }
        } else {
        // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

    <form onSubmit={handleSubmit}></form>

}