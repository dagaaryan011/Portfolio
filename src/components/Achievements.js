import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import "animate.css";
import certificate from "../assets/certificates/ANAIS2025-Ideathon-Winner-Certificate.pdf";

const achievements = [
  {
    title: "Winner — ANAIS 2025 Ideathon",
    org: "6th Annual Nepal AI School",
    project: "Dekho: Real-Time Monocular Navigation System",
    description:
      "Awarded first place for Dekho, a real-time assistive navigation system for the visually impaired. Recognised for technical insight, responsible AI innovation, and practical impact addressing a global accessibility challenge.",
    year: "2025",
    certificate,
  },
];

export const Achievements = () => {
  return (
    <section className="achievements" id="achievements">
      <Container>
        <Row>
          <Col>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Achievements</h2>
                  <p className="achievements-intro">
                    Recognition for work that went beyond the classroom.
                  </p>

                  <div className="achievements-list">
                    {achievements.map((a, i) => (
                      <div className="achievement-card" key={i}>
                        <div className="achievement-left">
                          <span className="achievement-year">{a.year}</span>
                        </div>

                        <div className="achievement-body">
                          <h4 className="achievement-title">{a.title}</h4>
                          <span className="achievement-org">{a.org}</span>
                          <p className="achievement-project">{a.project}</p>
                          <p className="achievement-desc">{a.description}</p>

                          {a.certificate && (
                            <a
                              href={a.certificate}
                              download="ANAIS2025-Ideathon-Winner-Certificate.pdf"
                              className="achievement-download"
                            >
                              ↓ Download Certificate
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};