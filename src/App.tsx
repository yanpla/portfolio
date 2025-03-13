import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "motion/react"
// Add icon imports
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa'
import Header from './components/Header'
import Projects from './components/Projects'
import BackToTop from './components/BackToTop'
import './App.css'

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [displayName, setDisplayName] = useState('Yannick')

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cycle through names in Hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayName(prev => prev === 'Yannick' ? 'yanpla' : 'Yannick')
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

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
  
  const nameAnimation = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 }
  }
  
  return (
    <div className="container mx-auto px-4 py-8 relative">
      <Header />

      {/* Hero Section */}
      <motion.section 
        className="py-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl font-extrabold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Hi, I'm <span className="inline-block w-[180px] text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={displayName}
                className={`inline-block ${displayName === 'yanpla' ? 'text-red-500' : 'text-teal-500'}`}
                variants={nameAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {displayName}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>
        <motion.p 
          className="text-xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Software Developer
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
            <Button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} size="lg" className="mr-4 bg-teal-500 hover:bg-teal-600">View My Work</Button>
          <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} variant="outline" size="lg" className="border-teal-500 text-teal-500 hover:bg-teal-100 hover:text-teal-600">Contact Me</Button>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-16">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          About <span className="text-teal-500">Me</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Card className="max-w-3xl mx-auto">
            <CardContent>
              <p className="mb-4">
              I'm a software developer who enjoys solving complex problems and optimizing systems. 
              Whether it's web applications, backend infrastructure, or game modding, I like building things that work efficiently and make an impact.
              </p>
              <p>
                I have experience working with a variety of technologies and languages, including
                React, Java, C#, Python, and Docker. I'm always looking for new opportunities to learn and grow
                as a developer.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Projects Section */}
      <Projects />

      {/* Skills Section */}
      <section id="skills" className="py-16">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-teal-500">Skills</span>
        </motion.h2>
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { title: "Frontend", skills: "React, TypeScript, Tailwind", color: "border-blue-400 hover:border-blue-500", textColor: "text-blue-500" },
              { title: "Backend", skills: "C#, Python, Java, Node.js, SQL", color: "border-purple-400 hover:border-purple-500", textColor: "text-purple-500" },
              { title: "Tools", skills: "Docker, Bun, Git, Unity", color: "border-green-400 hover:border-green-500", textColor: "text-green-500" }
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <Card className={`text-center p-6 h-full ${category.color}`}>
                  <h3 className={`font-bold mb-2 ${category.textColor}`}>{category.title}</h3>
                  <p>{category.skills}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Get In <span className="text-teal-500">Touch</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <p className="text-center mb-6">
                Interested in working together? Feel free to reach out to me at:
              </p>
              <motion.div 
                className="flex justify-center gap-4 flex-wrap"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { 
                    name: "Email Me", 
                    icon: <FaEnvelope className="mr-2" />, 
                    color: "bg-teal-500 hover:bg-teal-600", 
                    variant: "default", 
                    link: "mailto:yannick@plantenga.com",
                    ariaLabel: "Send email to Yannick"
                  },
                  { 
                    name: "LinkedIn", 
                    icon: <FaLinkedin className="mr-2" />,
                    color: "bg-blue-500 hover:bg-blue-600", 
                    variant: "default", 
                    link: "https://www.linkedin.com/in/yannick-plantenga",
                    ariaLabel: "Visit Yannick's LinkedIn profile"
                  },
                  { 
                    name: "GitHub", 
                    icon: <FaGithub className="mr-2" />,
                    color: "bg-purple-500 hover:bg-purple-600", 
                    variant: "default", 
                    link: "https://github.com/yanpla",
                    ariaLabel: "Visit Yannick's GitHub profile"
                  }
                ].map((platform, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    whileHover={{ 
                      y: -3,
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 400 }
                    }}
                  >
                    <Button asChild
                      variant={platform.variant as any} 
                      className={`${platform.color} flex items-center`}
                      aria-label={platform.ariaLabel}
                    >
                      <a href={platform.link} target="_blank">
                      {platform.icon}
                      {platform.name}
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="py-8 text-center text-sm text-gray-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p>© {new Date().getFullYear()} <span className="text-teal-500">Yannick Plantenga</span> - <span className="text-red-500">@yanpla</span> - All Rights Reserved</p>
      </motion.footer>
      
      <BackToTop show={showBackToTop} />
    </div>
  )
}

export default App
