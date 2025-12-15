import Image from "next/image";

export default function AboutMe() {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-card">
          <div className="about-header">
            <div className="flex-1">
              <h1 className="about-title">Anthony Hu</h1>
            </div>
            <div className="about-photo-wrapper">
              <div className="about-photo">
                <Image
                  src="/profile.jpg"
                  alt="Anthony Hu"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="about-body">
            <p className="about-text">
              Hi! I'm Anthony Hu, a second-year Math-CS major at UCSD.
            </p>
            <p className="about-text">
              I'm passionate about web development and AI application
              development. When I'm not coding, I enjoy reading about history,
              playing video games, and staying active through fitness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
