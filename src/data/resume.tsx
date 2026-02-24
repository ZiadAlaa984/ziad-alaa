import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Express } from "@/components/ui/svgs/Express";
import { MongoDB } from "@/components/ui/svgs/MongoDB";
import { Shadcn } from "@/components/ui/svgs/Shadcn";
import { Supabase } from "@/components/ui/svgs/Supabase";
import { Tailwind } from "@/components/ui/svgs/Tailwind";
import { Css } from "@/components/ui/svgs/Css";
import { Html } from "@/components/ui/svgs/Html";
import { javascript } from "@/components/ui/svgs/javascript";
import { Bootstrap } from "@/components/ui/svgs/Bootstrap";
import Webflow from "@/components/ui/svgs/webflow";
import Git from "@/components/ui/svgs/git";
import Figma from "@/components/ui/svgs/figma";

export const DATA = {
  name: "Ziad Alaa",
  initials: "ZA",
  url: "https://ziad-alaa.vercel.app",
  location: "Cairo, Egypt",
  description:
    "Full Stack Developer focus in Frontend with Next.js. I love building things and helping people.",
  summary:
    "I quit my job as a software engineer to go fulltime into building and scaling my own SaaS businesses. In the past, [I pursued a double degree in computer science and business](/#education), [interned at big tech companies in Silicon Valley](https://www.youtube.com/watch?v=d-LJ2e5qKdE), and [competed in over 21 hackathons for fun](/#hackathons). I also had the pleasure of being a part of the first ever in-person cohort of buildspace called [buildspace sf1](https://buildspace.so/sf1).",
  avatarUrl: "/me.png",

  skills: [
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Typescript", icon: Typescript },
    { name: "React", icon: ReactLight },
    { name: "Node.js", icon: Nodejs },
    { name: "Express", icon: Express },
    { name: "MongoDB", icon: MongoDB },
    { name: "Shadcn", icon: Shadcn },
    { name: "Supabase", icon: Supabase },
    { name: "Tailwind CSS", icon: Tailwind },
    { name: "Css", icon: Css },
    { name: "Html", icon: Html },
    { name: "JavaScript", icon: javascript },
    { name: "Bootstrap", icon: Bootstrap },
    { name: "Webflow", icon: Webflow },
    { name: "Git", icon: Git },
    { name: "Figma", icon: Figma },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "ziadalaa984@gmail.com",
    tel: "+201225747823",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/ZiadAlaa984",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ziad-alaa-dev/",
        icon: Icons.linkedin,
        navbar: true,
      },
      CV: {
        name: "CV",
        url: "https://drive.google.com/drive/folders/1lNxKvvA-3T0i79LFhdKmU_ujmjv7cBHD",
        icon: Icons.googleDrive,
        navbar: true,
      },
      TikTok: {
        name: "TikTok",
        url: "https://www.tiktok.com/@ziadalaadev",
        icon: Icons.tiktok,
        navbar: false,
      },
      WhatsApp: {
        name: "WhatsApp",
        url: "https://wa.me/201225747823",
        icon: Icons.whatsapp,
        navbar: false,
      },
      Email: {
        name: "Send Email",
        url: "mailto:ziadalaa984@gmail.com",
        icon: Icons.email,
        navbar: false,
      },

    },
  },
} as const;
