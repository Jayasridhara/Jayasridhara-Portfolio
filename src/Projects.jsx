// Projects.jsx
import React, { useState } from 'react';
import { Briefcase, Github } from 'lucide-react';

// Hook to detect if hover is supported
const useHoverSupported = () => {
  const [hoverSupported, setHoverSupported] = useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setHoverSupported(mq.matches);
    const handler = (e) => setHoverSupported(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return hoverSupported;
};

const ProjectCard = ({ project, hoverSupported }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleTap = () => {
    if (!hoverSupported) {
      setShowOverlay((prev) => !prev);
    }
  };

  return (
    <div
      className="relative group rounded-2xl overflow-hidden shadow-2xl border border-gray-700 mx-auto max-w-5xl w-full"
      onClick={handleTap}
    >
      <img
        src={project.image}
        alt={`${project.title} Screenshot`}
        className="w-full h-[300px] md:h-[450px] object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-105"
      />

      {/* --- Overlay --- */}
      <div
        className={`absolute inset-0 bg-linear-to-t from-gray-900/95 via-gray-900/60 to-transparent
          flex flex-col justify-end p-8
          ${
            hoverSupported
              ? 'opacity-0 group-hover:opacity-100 transition duration-500'
              : showOverlay
              ? 'opacity-100 transition duration-500'
              : 'opacity-0 transition duration-500'
          }`}
      >
        <h4 className="text-3xl font-bold text-white mb-3">{project.title}</h4>
        <p className="text-gray-300 mb-4 text-lg max-w-3xl">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="bg-teal-600/20 text-teal-400 text-xs font-medium px-3 py-1 rounded-full border border-teal-600"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4 mt-2">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-gray-700/80 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-gray-600 transition duration-300"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-teal-600 text-gray-900 px-5 py-2 rounded-lg font-semibold text-sm hover:bg-teal-500 transition duration-300"
            >
              <Briefcase className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>

      {/* --- Always visible title for mobile --- */}
      <div className="md:hidden absolute bottom-3 left-4 bg-gray-900/70 px-3 py-1 rounded-md">
        <h4 className="text-lg font-semibold text-white">{project.title}</h4>
      </div>
    </div>
  );
};


const Projects = ({ projectsData }) => {
  const hoverSupported = useHoverSupported();

  return (
    <section id="projects" className="bg-gray-900 relative py-18 md:py-18">
      <div className="text-center mb-16 ">
        <h3 className="text-4xl font-bold text-white mb-2 flex justify-center items-center">
          <Briefcase className="w-8 h-8 mr-3 text-teal-400" /> My Work
        </h3>
        <p className="text-lg text-gray-400">
          Some of the projects I’m most proud of.
        </p>
      </div>

      <div className="space-y-16">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            hoverSupported={hoverSupported}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
