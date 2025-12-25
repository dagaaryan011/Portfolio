import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

export const Contact = () => {
  const [history, setHistory] = useState([
    "> connect",
    "available channels:",
    "- whatsapp",
    "- gmail",
    "- instagram",
  ]);
  const [input, setInput] = useState("");

  const handleCommand = (e) => {
    e.preventDefault();
    const command = input.trim().toLowerCase();
    const next = [...history, `> ${command}`];

    if (command === "whatsapp") {
      window.open(
        "https://wa.me/917756068708?text=Hi%20Aryan%2C%20I%20came%20across%20your%20portfolio.",
        "_blank"
      );
    } else if (command === "gmail") {
      window.location.href =
        "mailto:dagaaryan11@gmail.com?subject=Let’s%20Connect";
    } else if (command === "instagram") {
      window.open("https://ig.me/m/yourusername", "_blank");
    } else if (command) {
      next.push("unknown command");
    }

    setHistory(next);
    setInput("");
  };

  return (
    <section className="contact terminal-contact" id="connect">
      <Container>
        <Row className="align-items-center">
          
          {/* LEFT: Message */}
          <Col md={6} className="contact-copy">
            <h2>Have an idea?</h2>
            <p>
              Something interesting to discuss, build, or explore together?
              <br />
              Type a channel and let’s talk.
            </p>
            <p className="contact-hint">
              Try: <code>whatsapp</code>, <code>gmail</code>, <code>instagram</code>
            </p>
          </Col>

          {/* RIGHT: Terminal */}
          <Col md={6}>
            <div className="terminal-window">
              <div className="terminal-header">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>

              <div className="terminal-body">
                {history.map((line, i) => (
                  <div key={i} className="terminal-line">
                    {line}
                  </div>
                ))}

                <form onSubmit={handleCommand} className="terminal-input">
                  <span>&gt;</span>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
                    spellCheck={false}
                  />
                </form>
              </div>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
};
