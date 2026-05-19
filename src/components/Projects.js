import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import "animate.css";
import projectsData from "../data/projects.json";

const DOMAIN_COLORS = {
  AI: "#6ae3a1",
  "Computer Vision": "#a78bfa",
  Systems: "#f4c430",
  Web: "#61dafb",
  Other: "#9ca3af",
};

export const Projects = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Projects</h2>
                  <p className="projects-intro">
                    A focused set of systems and experiments — each one built to understand something deeper.
                  </p>

                  <div className="projects-list">
                    {projectsData.projects.map((project, index) => {
                      const isOpen = hoveredId === project.id;
                      const color = DOMAIN_COLORS[project.domain] || DOMAIN_COLORS.Other;

                      return (
                        <div
                          key={project.id}
                          className={`project-row ${isOpen ? "open" : ""}`}
                          onMouseEnter={() => setHoveredId(project.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          style={{ "--accent": color }}
                        >
                          {/* Always-visible top bar */}
                          <div className="project-row-top">
                            <div className="project-row-left">
                              <span className="project-index">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span className="project-row-title">{project.title}</span>
                            </div>

                            <div className="project-row-right">
                              <span
                                className="project-domain-tag"
                                style={{ color, borderColor: color }}
                              >
                                {project.domain}
                              </span>

                              <div className="project-tech-pills">
                                {project.tech.slice(0, 2).map((t) => (
                                  <span key={t} className="tech-pill">{t}</span>
                                ))}
                                {project.tech.length > 2 && (
                                  <span className="tech-pill muted">+{project.tech.length - 2}</span>
                                )}
                              </div>

                              <span className="project-arrow">{isOpen ? "−" : "+"}</span>
                            </div>
                          </div>

                          {/* Expandable body */}
                          <div className="project-row-body">
                            <div className="project-row-body-inner">
                              <p className="project-summary">{project.summary}</p>

                              <div className="project-topics">
                                {project.topics.map((t) => (
                                  <span key={t} className="topic-tag">{t}</span>
                                ))}
                              </div>

                              <div className="project-links">
                                {project.links?.github && (
                                  <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="proj-link"
                                  >
                                    GitHub →
                                  </a>
                                )}
                                {project.links?.demo && (
                                  <a
                                    href={project.links.demo}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="proj-link"
                                  >
                                    Live Demo →
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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