import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "text") {
      setText(value);
    }

    setErrorMessage(""); // Clear error message on input change
  };

  // Function to validate email format
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation checks before submission
    if (!name) {
      setErrorMessage("Please fill out the name field");
      return;
    } else if (!email) {
      setErrorMessage("Please fill out the email address field");
      return;
    } else if (!validateEmail(email)) {
      setErrorMessage("Email is invalid");
      return;
    } else if (!text) {
      setErrorMessage("Please fill out the message field");
      return;
    }

    // Form success
    alert("Thank you for filling out the form! We'll be in touch soon.");

    // Clear form fields after submission
    setName("");
    setEmail("");
    setText("");
  };

  return (
    <>
      {/* Contact Form */}
      <div className="container py-5">
        <h1 className="text-center mb-1">Contact Us!</h1>

        <form className="form" onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              value={name}
              name="name"
              onChange={handleInputChange}
              type="text"
              className="form-control external-background"
              id="name"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              value={email}
              name="email"
              onChange={handleInputChange}
              type="email"
              className="form-control external-background"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea
              value={text}
              name="text"
              onChange={handleInputChange}
              className="form-control external-background"
              id="message"
              rows={4}
              placeholder="Enter your message"
            ></textarea>
          </div>

          {/* Error message for validation */}
          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          <button type="submit" className="btn btn-primary external-button">Submit</button>
        </form>
      </div>

      {/* Developers Section */}
      <h1 className="text-center" style={{ paddingBottom: "20px", fontWeight: "bolder" }}>Our Developers</h1>
      <h5 className="text-center" style={{ paddingBottom: "20px" }}>
        From left to right: <strong>Stanley Bertrand</strong>, <strong>Koosha Moradpour</strong>, <strong>Aley Wigwe</strong>, and <strong>Adarsh Sidhu</strong>.
      </h5>

      {/* Developer Cards */}
      <div className="container my-5">
        <div className="row justify-content-center">
          {[
            {
              name: "Stanley Bertrand",
              github: "https://github.com/bertrandstanley",
              linkedin: "https://www.linkedin.com/in/stanleybertrand/"
            },
            {
              name: "Koosha Moradpour",
              github: "https://github.com/kooshamoradpour",
              linkedin: "https://www.linkedin.com/in/koosha-moradpour/"
            },
            {
              name: "Aley Wigwe",
              github: "https://github.com/aleyw2244",
              linkedin: "https://www.linkedin.com/in/aley-wigwe-64151614b/"
            },
            {
              name: "Adarsh Sidhu",
              github: "https://github.com/sidhuad",
              linkedin: "https://www.linkedin.com/in/adarsh-s-898380161/"
            },  

            {
              name: "Philip Ecdel",
              github: "https://github.com/sidhuad",
              linkedin: "https://www.linkedin.com/in/philipecdao/"
            }
              
            
          ].map((developer, index) => (
            <div className="col-12 col-md-3 mb-4" key={index}>
              <div className="card contact-card movie-card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg">
                <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                  <div className="d-flex justify-content-center mt-3">
                    {/* GitHub Button */}
                    <a href={developer.github} target="_blank" rel="noopener noreferrer">
                      <button className="contact-card-button card-btn btn text-white svg-button btn-sm border-0 mx-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                        </svg>
                      </button>
                    </a>

                    {/* LinkedIn Button */}
                    <a href={developer.linkedin} target="_blank" rel="noopener noreferrer">
                      <button className="contact-card-button card-btn btn text-white svg-button btn-sm border-0 mx-2">
                        {/* LinkedIn Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                          <path d="M1 0a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H0V1a1 1 0 0 1 1-1h1zM4 4.5A1.5 1.5 0 1 0 4 7a1.5 1.5 0 0 0 0-2.5zM6 0h8a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1zM7 14h7V8H7v6z"/>
                        </svg>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Contact;
