import React from "react";
import "../App.css";
import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [state, handleSubmit] = useForm("mkgrpjok");

  return (
    <div className="flex flex-col">
      <div className="w-full text-white px-4 py-20 relative" style={{
        backgroundImage: "url('/assets/contactus.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        {/* Overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#1a365d",
          opacity: 0.7,
          zIndex: 0
        }}></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>
            Contact Our Housing Data Team
          </h1>
          <p style={{ fontSize: "1.25rem", lineHeight: "1.7" }}>
            Have questions about Canada's housing data? Want to collaborate or report an issue?
            Reach out to our team of researchers and community advocates.
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="w-full bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Form */}
          <div className="bg-gray-50 p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-[var(--red)] mb-6 text-center">Send Us a Message</h2>
            {state.succeeded ? (
              <p className="text-green-600 font-semibold text-center">Thanks for your message!</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--red)]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--red)]"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--red)]"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>
                {/* <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-[var(--red)] text-white font-bold py-2 rounded-lg hover:bg-[var(--dark-red)] transition"
                >
                  Send Message
                </button> */}

<button
  type="submit"
  disabled={state.submitting}
  className="w-full bg-white text-black font-medium py-2 rounded-md border border-gray-300 hover:bg-grey-100 transition"
>
  {state.submitting ? "Sending..." : "Send Message"}
</button>


              </form>
            )}
          </div>

          {/* Info */}
          <div className="text-center md:text-left space-y-8">
            <div>
              <h3 className="text-xl font-bold text-[var(--red)] mb-2">Get In Touch</h3>
              <p className="text-gray-700">
                We welcome feedback, collaboration, and support inquiries related to our work on housing transparency in Canada.
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-1">📍 Office Address</h4>
              <p className="text-gray-600">
                204-78 George St<br />
                Ottawa, ON K1N 0A8<br />
                Canada
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-1">✉️ Email</h4>
              <p className="text-gray-600">maanpatel1811@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full h-96">
        <iframe
          title="Glocal Office"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2885.2958311655747!2d-75.69206!3d45.42928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce050f37008d25%3A0x13b192348ef735fc!2s204-78%20George%20St%2C%20Ottawa%2C%20ON%20K1N%200A8!5e0!3m2!1sen!2sca!4v1683934123123!5m2!1sen!2sca"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Contact;

