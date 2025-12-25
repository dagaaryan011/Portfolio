import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/Aryan_animated.png";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const Banner = () => {

  /* ================= Typing Animation ================= */
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const toRotate = ["AI Engineer", "Web Developer", "Student"];
  const period = 1000;

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  const tick = () => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) setDelta(prev => prev / 2);

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(prev => prev + 1);
      setDelta(500);
    }
  };

  /* ================= Matrix Rain ================= */
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

   const resize = () => {
  const dpr = window.devicePixelRatio || 1;

  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;
};


    resize();
    window.addEventListener("resize", resize);

    const letters =
                      "01" + 
                      "アカサタナハマヤラワ" +                 
                      "@#$%&*+=<>?" +
                      "اصضطظعغفقك";          

    const fontSize = 13;      // text size
    const columnGap = 20;    // distance between columns (px)

    const columns = Math.floor(canvas.width / columnGap);
    const drops = Array(columns).fill(1);


    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff88";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const char = letters[Math.floor(Math.random() * letters.length)];

        const x = i * columnGap;
        const yPos = y * fontSize;

        ctx.fillText(char, x, yPos);

        if (yPos > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });

    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ================= JSX ================= */
  return (
    <section className="banner" id="home">

      {/* Matrix background */}
      <div className="matrix-wrapper">
  <canvas ref={canvasRef} className="matrix-canvas" />
</div>

      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                 

                  <h1>
                    {`Hi! I'm Aryan- `}
                    <span className="txt-rotate">
                      <span className="wrap">{text}</span>
                    </span>
                  </h1>

                  <p className="mt-4 text-zinc-400 text-lg leading-relaxed max-w-lg">
                    Hi, I’m <span className="text-white-font-medium">Aryan</span>. I’m a
                    <span className="text-white-font-medium"> second-year IT student at VJTI </span>
                    who enjoys building things at the intersection of
                    <span className="text-white-font-medium"> AI </span>
                    and
                    <span className="text-white-font-medium"> web development</span>.
                    <br /><br />
                    I like working on projects where ideas turn into
                    <span className="text-white-font-medium"> working systems</span>, whether that’s training
                    <span className="text-white-font-medium"> reinforcement learning agents</span>, building
                    <span className="text-white-font-medium"> simulations</span>, or creating simple
                    <span className="text-white-font-medium"> web apps </span>.
                    <br /><br />
                    Right now, I’m focused on
                    <span className="text-white-font-medium"> AI through hands-on projects </span>
                    while improving my
                    <span className="text-white-font-medium"> web development skills</span>.
                  </p>

                  <button onClick={() => console.log("connect")}>
                    Let’s Connect <ArrowRightCircle size={25} />
                  </button>
                </div>
              )}
            </TrackVisibility>
          </Col>

          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={`banner-img ${isVisible ? "animate__animated animate__zoomIn" : ""}`}>
                  <img src={headerImg} alt="Header Img" />
                </div>

              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
