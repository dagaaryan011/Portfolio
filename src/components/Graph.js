import projectsData from "../data/projects.json";
import { useRef, useState } from "react";
import { useEffect } from "react";

export const Graph = ({ onNodeClick }) => {
  /* ===============================
     Hooks (ALL at top, always)
  ================================ */
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const isPanningRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const positionsRef = useRef(null);
  const svgRef = useRef(null);

  /* ===============================
     Pan & Zoom handlers
  ================================ */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const delta = -e.deltaY * 0.001;
      setZoom(z => Math.min(2.2, Math.max(0.6, z + delta)));
    };

    svg.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      svg.removeEventListener("wheel", handleWheel);
    };
  }, []);
  const onMouseDown = (e) => {
    isPanningRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e) => {
    if (!isPanningRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    setPan(p => ({ x: p.x + dx, y: p.y + dy }));
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    isPanningRef.current = false;
  };

  const onWheel = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const delta = -e.deltaY * 0.001;
  setZoom(z => Math.min(2.2, Math.max(0.6, z + delta)));
};




  /* ===============================
     Graph config
  ================================ */
  const width = 800;
  const height = 500;
  const cx = width / 2;
  const cy = height / 2;

  const DOMAINS = ["AI", "Web", "Systems", "Cyber", "Cloud", "Other"];
  const MIN_ANGLE = (25 * Math.PI) / 180;

  const DOMAIN_COLORS = {
    AI: "#6ae3a1",
    Web: "#61dafb",
    Systems: "#f4c430",
    Cyber: "#ff6b6b",
    Cloud: "#a78bfa",
    Other: "#9ca3af",
  };

  const getRadius = (p) => 14 + (p.weight || 1) * 4;

  /* ===============================
     Positioning (computed once)
  ================================ */
  if (!positionsRef.current) {
    const domainCounts = {};
    DOMAINS.forEach(d => (domainCounts[d] = 0));

    projectsData.projects.forEach(p => {
      const domains = Array.isArray(p.domain) ? p.domain : ["Other"];
      const primaryDomain = domains[0]; // first domain decides region
      const d = DOMAINS.includes(primaryDomain) ? primaryDomain : "Other";

      domainCounts[d]++;
    });

    const totalProjects = projectsData.projects.length;
    const reserved = DOMAINS.length * MIN_ANGLE;
    const remaining = Math.max(0, 2 * Math.PI - reserved);

    const domainAngles = {};
    DOMAINS.forEach(d => {
      const share = totalProjects ? domainCounts[d] / totalProjects : 0;
      domainAngles[d] = MIN_ANGLE + remaining * share;
    });

    const domainRanges = {};
    let cursor = 0;
    DOMAINS.forEach(d => {
      domainRanges[d] = { start: cursor, end: cursor + domainAngles[d] };
      cursor += domainAngles[d];
    });

    const buckets = {};
    DOMAINS.forEach(d => (buckets[d] = []));

    projectsData.projects.forEach((p, i) => {
      const domains = Array.isArray(p.domain) ? p.domain : ["Other"];
      const primaryDomain = domains[0]; // first domain decides region
      const d = DOMAINS.includes(primaryDomain) ? primaryDomain : "Other";

      buckets[d].push({ project: p, index: i });
    });

    positionsRef.current = Array(projectsData.projects.length);

    DOMAINS.forEach(d => {
      const items = buckets[d];
      if (!items.length) return;

      const { start, end } = domainRanges[d];
      const step = (end - start) / (items.length + 1);

      items.forEach((item, idx) => {
        const baseAngle = start + step * (idx + 1);
        const jitter = ((Math.random() - 0.5) * Math.PI) / 18;

        const topicCount = item.project.topics?.length || 1;
        const minR = 70;
        const maxR = 230;
        const rStep = (maxR - minR) / (DOMAINS.length - 1);

        const radius =
          minR +
          (DOMAINS.length - topicCount) * rStep +
          Math.random() * 8;

        const angle = baseAngle + jitter;

        positionsRef.current[item.index] = {
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
        };
      });
    });
  }

  /* ===============================
     Edges (shared TOPICS)
  ================================ */
  const edges = [];
  projectsData.projects.forEach((a, i) => {
    projectsData.projects.forEach((b, j) => {
      if (
        i < j &&
        a.topics?.some(t => b.topics?.includes(t))
      ) {
        edges.push({ i, j });
      }
    });
  });

  /* ===============================
     Render
  ================================ */
  return (
    <svg
      ref={svgRef}
  width="100%"
  height="100%"
  viewBox={`0 0 ${width} ${height}`}
  style={{ background: "#0b0b0b", cursor: "grab" }}
  onMouseDown={onMouseDown}
  onMouseMove={onMouseMove}
  onMouseUp={onMouseUp}
  onMouseLeave={onMouseUp}
 
    >
      <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
        {/* Edges */}
        {edges.map((e, idx) => {
          const p1 = positionsRef.current[e.i];
          const p2 = positionsRef.current[e.j];
          if (!p1 || !p2) return null;

          const active = hoveredIndex === e.i || hoveredIndex === e.j;

          return (
            <line
              key={idx}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#9ca3af"
              strokeWidth={active ? 1.5 : 1}
              opacity={active ? 0.7 : 0.12}
            />
          );
        })}

        {/* Nodes */}
        {projectsData.projects.map((project, index) => {
          const pos = positionsRef.current[index];
          if (!pos) return null;

          const isHovered = hoveredIndex === index;
          const r = isHovered ? getRadius(project) * 1.5 : getRadius(project);
          const color = DOMAIN_COLORS[project.domain] || DOMAIN_COLORS.Other;

          return (
            <g
              key={project.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onNodeClick(project)}
              style={{
                cursor: "pointer",
                opacity: hoveredIndex === null || isHovered ? 1 : 0.3,
              }}
            >
              <circle cx={pos.x} cy={pos.y} r={r} fill={color} />
              <text
                x={pos.x}
                y={pos.y + r + 14}
                textAnchor="middle"
                fontSize="11"
                fill="#d1d5db"
                pointerEvents="none"
              >
                {project.title}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};
