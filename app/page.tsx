"use client";

import type React from "react";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Github,
  Linkedin,
  Mail,
  Camera,
  Music,
  Plane,
  ExternalLink,
  Globe,
  MapPin,
  Twitter,
} from "lucide-react";
import resumeData from "@/data/resume-data.json";
import { useEffect, useState } from "react";

// Type for the icon component mapping
type IconMap = {
  [key: string]: React.ComponentType<any>;
};

export default function CV() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Map of icon names to components
  const iconMap: IconMap = {
    Github,
    Linkedin,
    Mail,
    Globe,
    Camera,
    Music,
    Plane,
    Twitter,
  };

  // Function to render the correct icon component
  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  // Function to scroll to company section
  const scrollToCompany = (companyName: string) => {
    const element = document.getElementById(
      `company-${companyName.replace(/\s+/g, "-").toLowerCase()}`,
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <Card className="max-w-4xl mx-auto shadow-lg bg-white">
        <div className="p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-emerald-100">
              <Image
                src="/profile.jpg"
                alt="Profile"
                width={128}
                height={128}
                className="object-cover"
                priority
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {resumeData.personalInfo.name}
              </h1>
              <h2 className="text-xl font-medium text-emerald-600 mt-1">
                {resumeData.personalInfo.title}
              </h2>
              <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                {resumeData.personalInfo.location && (
                  <div className="flex items-center text-sm text-slate-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {resumeData.personalInfo.location}
                  </div>
                )}
                <div className="flex items-center text-sm text-slate-600">
                  <Mail className="h-4 w-4 mr-1" />
                  {resumeData.personalInfo.email}
                </div>
              </div>
              <div className="flex gap-3 mt-4 justify-center md:justify-start">
                {resumeData.personalInfo.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-emerald-600"
                    aria-label={link.name}
                  >
                    {renderIcon(link.icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Profile */}
          <section className="mt-8">
            <h2 className="text-xl font-bold relative pb-2 mb-4 text-slate-800">
              <span className="relative z-10">Career Profile</span>
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-emerald-400 to-green-500"></span>
            </h2>
            <p className="text-slate-600">{resumeData.profile}</p>
          </section>

          {/* Experience */}
          <section className="mt-8">
            <h2 className="text-xl font-bold relative pb-2 mb-4 text-slate-800">
              <span className="relative z-10">Experiences</span>
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-emerald-400 to-green-500"></span>
            </h2>

            <div className="space-y-8">
              {resumeData.experiences.map((company, companyIndex) => (
                <div
                  key={companyIndex}
                  className="relative"
                  id={`company-${company.company
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  {/* Company Header */}
                  <div className="mb-4">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-xl font-bold text-emerald-600">
                        {company.company}
                      </h3>
                      <div className="flex items-center text-slate-500 text-sm">
                        <span>{company.type}</span>
                        <span className="mx-2">|</span>
                        <span>{company.totalPeriod}</span>
                      </div>
                    </div>
                  </div>

                  {/* Positions within the company */}
                  <div className="space-y-4 pl-4 border-l-2 border-emerald-100">
                    {company.positions.map((position, positionIndex) => (
                      <div key={positionIndex} className="relative">
                        <div className="absolute left-[-29px] w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>

                        <div className="pl-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2">
                            <h4 className="text-lg font-semibold text-slate-800">
                              {position.title}
                            </h4>
                            <div className="flex items-center text-slate-500 text-sm">
                              <span>{position.period}</span>
                            </div>
                          </div>

                          <ul className="list-disc pl-5 text-slate-600 text-sm space-y-1">
                            {position.responsibilities.map(
                              (resp, respIndex) => (
                                <li key={respIndex}>{resp}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="mt-8">
            <h2 className="text-xl font-bold relative pb-2 mb-4 text-slate-800">
              <span className="relative z-10">Projects</span>
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-emerald-400 to-green-500"></span>
            </h2>

            <div className="space-y-4">
              {resumeData.projects.map((project, index) => (
                <div key={index}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <h2 className="text-xl font-semibold text-slate-800 flex items-center">
                      {project.name}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-emerald-600"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </h2>
                    <div className="flex-col justify-end gap-2 text-right">
                      {project.company && (
                        <button
                          onClick={() => scrollToCompany(project.company)}
                          className="text-emerald-600 font-medium hover:text-emerald-700 hover:underline cursor-pointer"
                        >
                          {project.company}
                        </button>
                      )}
                      <div className="text-slate-500 text-sm">
                        {project.period}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mt-1">
                    {project.description}
                  </p>
                  {project.techStack && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.techStack.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {project.achievements && (
                    <ul className="list-disc pl-5 text-slate-600 text-sm space-y-1 mt-2">
                      {project.achievements.map(
                        (achievement, achievementIndex) => (
                          <li key={achievementIndex}>{achievement}</li>
                        ),
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Personal Projects */}
          <section className="mt-24">
            <h2 className="text-xl font-bold relative pb-2 mb-4 text-slate-800">
              <span className="relative z-10">Personal Projects</span>
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-emerald-400 to-green-500"></span>
            </h2>
            <span className="text-sm text-slate-600 mt-1">
              {resumeData.descriptionPersonalProjects}
            </span>
            <div className="space-y-4 mt-4">
              {resumeData.personalProjects.map((project, index) => (
                <div key={index}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                      {project.name}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-emerald-600"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </h3>
                    <div className="text-slate-500 text-sm">
                      {project.period}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    {project.description}
                  </p>
                  {project.techStack && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.techStack.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {project.achievements && (
                    <ul className="list-disc pl-5 text-slate-600 text-sm space-y-1 mt-2">
                      {project.achievements.map(
                        (achievement, achievementIndex) => (
                          <li key={achievementIndex}>{achievement}</li>
                        ),
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mt-8">
            <h2 className="text-xl font-bold relative pb-2 mb-4 text-slate-800">
              <span className="relative z-10">Skills & Proficiency</span>
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-emerald-400 to-green-500"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-semibold text-slate-700 mb-3">
                  Programming languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.programmingLanguages.map((lang, index) => (
                    <Badge
                      key={index}
                      className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-md font-semibold text-slate-700 mb-3">
                  Frameworks
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.frameworks.map((framework, index) => (
                    <Badge
                      key={index}
                      className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    >
                      {framework}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-md font-semibold text-slate-700 mb-3">
                  Data Management
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.dataManagement.map((db, index) => (
                    <Badge
                      key={index}
                      className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    >
                      {db}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-md font-semibold text-slate-700 mb-3">
                  Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.tools.map((tool, index) => (
                    <Badge
                      key={index}
                      className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-md font-semibold text-slate-700 mb-3">
                Core Competencies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resumeData.skills.coreCompetencies.map((competency, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-500"></div>
                    <div className="font-medium text-slate-800">
                      {competency}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="mt-8">
            <h2 className="text-xl font-bold relative pb-2 mb-4 text-slate-800">
              <span className="relative z-10">Education</span>
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-emerald-400 to-green-500"></span>
            </h2>

            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l-2 border-emerald-100"
                >
                  <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-green-500"></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <h3 className="text-lg font-semibold text-slate-800">
                      {edu.degree}
                    </h3>
                    <div className="flex items-center">
                      <span className="text-emerald-600 font-medium">
                        {edu.institution}
                      </span>
                      <span className="mx-2 text-slate-400">|</span>
                      <span className="text-slate-500 text-sm">
                        {edu.period}
                      </span>
                    </div>
                  </div>
                  {edu.achievements && (
                    <ul className="list-disc pl-5 text-slate-600 text-sm space-y-1 mt-2">
                      {edu.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section className="mt-8">
            <h2 className="text-xl font-bold relative pb-2 mb-4 text-slate-800">
              <span className="relative z-10">Languages</span>
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-emerald-400 to-green-500"></span>
            </h2>

            <div className="flex flex-wrap gap-4">
              {resumeData.languages.map((language, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-500"></div>
                  <span className="text-slate-700 font-medium">
                    {language.name}
                  </span>
                  <span className="text-slate-500 text-sm">
                    ({language.level})
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Community */}
          <section className="mt-8">
            <h2 className="text-xl font-bold relative pb-2 mb-4 text-slate-800">
              <span className="relative z-10">Community</span>
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-emerald-400 to-green-500"></span>
            </h2>

            <div className="space-y-4">
              {resumeData.community.map((comm, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-500"></div>
                  <div>
                    <div className="font-medium text-slate-800">
                      {comm.role}
                    </div>
                    <a
                      href={comm.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-emerald-600 hover:underline"
                    >
                      {comm.platform}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interests */}
          <section className="mt-8">
            <h2 className="text-xl font-bold relative pb-2 mb-4 text-slate-800">
              <span className="relative z-10">Interests</span>
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-emerald-400 to-green-500"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resumeData.interests.map((interest, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    {renderIcon(interest.icon)}
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">
                      {interest.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
}
