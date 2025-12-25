import skillsData from "../data/skills.json";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import "animate.css";

export const Skills = () => {
  return (
    <section className="skill" id="skills">
      <Container>
        <Row>
          <Col>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Skills</h2>
                  <p className="skills-intro">
                    Tools and concepts I’ve used to build real systems and projects.
                  </p>

                  {skillsData.skills.map((group, idx) => (
                    <div className="skill-group" key={idx}>
                      <h4 className="skill-category">{group.category}</h4>

                      <div className="skill-grid">
                        {group.items.map((skill, i) => (
                          <div className="skill-card" key={i}>
                            <h5>{skill.name}</h5>
                            <p>{skill.description}</p>

                            <div className="skill-projects">
                              {skill.projects.map(p => (
                                <span key={p}>{p}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
