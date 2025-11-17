// Projects.jsx
import React from "react";
import { Briefcase, Github } from "lucide-react";

const ProjectCard = ({ project }) => {
  return (
   <div
  className="
    rounded-2xl overflow-hidden shadow-xl border border-gray-800 bg-gray-900 
    mx-auto max-w-7xl w-full transition-all duration-300 ease-out
    hover:shadow-[0_0_25px_6px_rgba(45,212,191,0.45)]
    hover:border-teal-500 hover:scale-[1.01]
  "
>
      
      {/* Image */}
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-[260px] md:h-[340px] object-cover"
      />

      {/* Content */}
      <div className="p-6 md:p-8 space-y-4">

        {/* Title */}
        <h4 className="text-2xl md:text-3xl font-bold text-white">
          {project.title}
        </h4>

        {/* Description */}
        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="bg-teal-600/20 text-teal-400 text-xs font-medium px-3 py-1 rounded-full border border-teal-600"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-gray-800 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-gray-700 transition"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-teal-600 text-gray-900 px-5 py-2 rounded-lg font-semibold text-sm hover:bg-teal-500 transition"
            >
              <Briefcase className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};


const Projects = ({ projectsData }) => {
  return (
    <section id="projects" className="bg-gray-900 py-20">
      <div className="text-center mb-16">
        <h3 className="text-4xl font-bold text-white flex justify-center items-center">
          <Briefcase className="w-8 h-8 mr-3 text-teal-400" /> My Work
        </h3>
        <p className="text-lg text-gray-400 mt-2">
          Some of the projects I’m most proud of.
        </p>
      </div>

      <div className="space-y-16 px-4 md:px-10">
        {projectsData.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
