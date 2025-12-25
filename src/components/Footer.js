import { Container, Row, Col } from "react-bootstrap";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-main">
          
          {/* LEFT */}
          <Col md={4} className="footer-left">
            <div className="footer-logo">
              &lt;dagaarayan011/&gt;<span className="cursor">█</span>
            </div>
            <p className="footer-desc">
              Exploring AI, systems, and web engineering through hands-on projects.
            </p>
            <div className="footer-social">
              <a href="#"><img src={navIcon1} alt="GitHub" /></a>
              <a href="#"><img src={navIcon2} alt="LinkedIn" /></a>
              <a href="#"><img src={navIcon3} alt="Instagram" /></a>
            </div>
          </Col>

          {/* MIDDLE */}
          <Col md={4} className="footer-links">
            <h6>Quick Links</h6>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#connect">Contact</a></li>
            </ul>
          </Col>

          {/* RIGHT */}
          <Col md={4} className="footer-tech">
            <h6>Technologies</h6>
            <div className="tech-tags">
              <span>Python</span>
              <span>AI</span>
              <span>Reinforcement Learning</span>
              <span>Web</span>
              <span>Linux</span>
            </div>
          </Col>

        </Row>

        <Row className="footer-bottom">
          <Col>
            <p>© {new Date().getFullYear()} Aryan. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
