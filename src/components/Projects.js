import { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import "animate.css";

import { Graph } from "./Graph";

export const Projects = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
useEffect(() => {
  if (expanded) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }

  return () => {
    document.body.classList.remove("no-scroll");
  };
}, [expanded]);

  return (
    <section className="project" id="projects">
      {/* NORMAL MODE (inside layout) */}
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Projects</h2>
                  <p>
                    A growing network of projects exploring AI, reinforcement learning,
                    simulations, and web systems. Click a node to explore.
                  </p>
              
                  <div className="projects-window">
                    <div className="projects-window-header">
                      <span>Project Graph</span>
                      <button
                        className="projects-expand-btn"
                        onClick={() => setExpanded(true)}
                      >
                        ⛶
                      </button>
                    </div>
              
                    <div className="projects-body">
                      <div className="graph-pane">
                        <Graph
                          onNodeClick={(project) => {
                            setActiveProject(project);
                            setExpanded(true);
                          }}
                        />
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
            
      {/* EXPANDED MODE (OUTSIDE layout) */}
      {expanded && (
        <>
          <div
            className="projects-backdrop"
            onClick={() => setExpanded(false)}
          />

          <div className="projects-window expanded">
            <div className="projects-window-header">
              <span>Project Graph</span>
              <button
                className="projects-expand-btn"
                onClick={() => {
                  setExpanded(false);
                  setActiveProject(null);
                }}
              >
                ✕
              </button>

            </div>
      
            <div className="projects-body">
              <div className="graph-pane">
                <Graph
                  onNodeClick={(project) => {
                    setActiveProject(project);
                  }}
                />

              </div>
      
              {activeProject && (
                  <aside className="card-pane">
                    

                    <h4>{activeProject.title}</h4>
                    <p>{activeProject.summary}</p>

                    <div className="tags">
                      {Array.isArray(activeProject.domain) &&
                        activeProject.domain.map(d => (
                          <span key={d}>{d}</span>
                        ))}

                    </div>
                    
                    <div className="links">
                      {activeProject.links?.github && (
                        <a
                          href={activeProject.links.github}
                          target="_blank"
                          rel="noreferrer"
                        >
                          GitHub
                        </a>
                      )}
                      {activeProject.links?.demo && (
                        <a
                          href={activeProject.links.demo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </aside>
                )}

            </div>
          </div>
        </>
      )}
    </section>

  );
};
