// Import project images
import portfolioImg from '@/assets/portfolio.png';
import arsonistImg from '@/assets/AmongUs.png';

export const projectsData = [
  {
    id: 1,
    title: "yanplaRoles Mod for Among Us",
    shortDescription: "Intorducing new roles to Among Us",
    description: "yanplaRoles is a mod for Among Us that introduces new roles to the game. The mod is built with C# and uses the BepInEx modding framework.",
    technologies: ["C#", "BepInEx", "Harmony Patches"],
    imageUrl: arsonistImg,
    sourceUrl: "https://github.com/yanpla/yanplaRoles",
    accentColor: "#10b981" // purple-500
  },
  {
    id: 2,
    title: "Personal Portfolio Website",
    shortDescription: "Responsive portfolio showcasing projects and skills",
    description: "Developed a personal portfolio website to display my projects, skills, and experience. Built with React and Tailwind CSS for a modern and responsive design.",
    technologies: ["React", "TypeScript", "Tailwind"],
    imageUrl: portfolioImg,
    demoUrl: "https://yanpla.nl",
    sourceUrl: "https://github.com/yanpla/portfolio",
    accentColor: "#3b82f6" // teal-500
  },
];
