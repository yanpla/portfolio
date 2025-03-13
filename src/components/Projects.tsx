import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { projectsData } from '../data/projectsData'
import { useState } from 'react'

const Projects = () => {
  // Track loaded images
  const [loadedImages, setLoadedImages] = useState<{[key: string]: boolean}>({})

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  // Define colorMap for project badges
  const colorMap: { [key: string]: string } = {
    React: 'bg-blue-500 hover:bg-blue-600',
    TypeScript: 'bg-purple-500 hover:bg-purple-600',
    Tailwind: 'bg-teal-500 hover:bg-teal-600',
    'C#': 'bg-green-500 hover:bg-green-600',
    BepInEx: 'bg-yellow-500 hover:bg-yellow-600',
    'Harmony Patches': 'bg-red-500 hover:bg-red-600',
    default: 'bg-teal-500 hover:bg-teal-600'
  };
  
  // Handle image loading
  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => ({...prev, [id]: true}))
  }

  return (
    <section id="projects" className="py-16">
      <motion.h2
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        My <span className="text-teal-500">Projects</span>
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -10 }}
          >
            <Card className="border-t-4" style={{ borderTopColor: project.accentColor || '#14b8a6' }}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-56 rounded-md mb-4 overflow-hidden">
                  {!loadedImages[project.id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <motion.img
                    src={project.imageUrl}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover object-center shadow rounded-md"
                    style={{ opacity: loadedImages[project.id] ? 1 : 0 }}
                    onLoad={() => handleImageLoad(project.id)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 + 0.5 }}>
                      <Badge className={colorMap[tech] || colorMap.default}>{tech}</Badge>
                    </motion.div>
                  ))}
                </div>
                <p>{project.description}</p>
              </CardContent>
              <CardFooter>
                {project.demoUrl && (
                  <Button 
                  variant="outline" 
                  className="mr-4 border-teal-500 text-teal-500 hover:bg-teal-100 hover:text-teal-600"
                  asChild
                  >
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    View Demo
                  </a>
                  </Button>
                )}
                <Button className="bg-teal-500 hover:bg-teal-600" asChild>
                  <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                  Source Code
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Projects
