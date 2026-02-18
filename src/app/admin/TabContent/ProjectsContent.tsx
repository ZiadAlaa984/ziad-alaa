"use client"
import React, { useEffect } from 'react'
import { ProjectCard } from "@/components/project-card";
import useProjects from '@/hooks/useProjects';

function ProjectsContent() {
    const { getProjects } = useProjects();
    useEffect(() => {
      const projects =  getProjects();
      console.log("🚀 ~ ProjectsContent ~ projects:", projects)
    }, []);
    // table projects
    // add title project and button add project 

    // add cards array in projects 
    // props action = true show like dropdown
    //   projects: [
    //     {
    //       title: "Fresh cart",
    //       href: "https://freshcart.com",
    //       dates: "Jan 2024 - Feb 2024",
    //       description:
    //         "With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
    //       technologies: [
    //         "Next.js",
    //         "Typescript",
    //         "PostgreSQL",
    //         "Prisma",
    //         "TailwindCSS",
    //         "Stripe",
    //         "Shadcn UI",
    //         "Magic UI",
    //       ],
    //       links: [
    //         {
    //           type: "Website",
    //           href: "https://chatcollect.com",
    //           icon: <Icons.globe className="size-3" />,
    //         },
    //       ],
    //       image: "",
    //   ],
                //     <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto auto-rows-fr">
                //     {projects.map((project, id) => (
                //             <ProjectCard
                //                 href={project.href}
                //                 key={project.title}
                //                 title={project.title}
                //                 description={project.description}
                //                 dates={project.dates}
                //                 tags={project.technologies}
                //                 image={project.image}
                //                 links={project.links}
                //             />
                //     ))}
                // </div>
  return (
    <div>ProjectsContent</div>
  )
}

export default ProjectsContent