import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ModeToggle } from './mode-toggle'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [displayName, setDisplayName] = useState('Yannick')
  
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
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  }

  const menuItems = ["about", "projects", "skills", "contact"]
  
  // Toggle name between Yannick and yanpla
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayName(prev => prev === 'Yannick' ? 'yanpla' : 'Yannick')
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.nav 
      className="flex justify-between items-center mb-16"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="overflow-hidden" whileHover={{ scale: 1.05 }}>
        <AnimatePresence mode="wait">
          <motion.h1 
            key={displayName}
            className={`text-2xl font-bold ${displayName === 'yanpla' ? 'text-red-500' : 'text-teal-500'}`}
            variants={nameAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {displayName === 'Yannick' ? 'Yannick Plantenga' : '@yanpla'}
          </motion.h1>
        </AnimatePresence>
      </motion.div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center">
        <motion.div 
          className="flex gap-6 mr-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {menuItems.map((item) => (
            <motion.a 
              key={item}
              href={`#${item}`} 
              className="hover:text-teal-500 transition-colors duration-200"
              variants={fadeIn}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </motion.a>
          ))}
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ModeToggle />
        </motion.div>
      </div>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <ModeToggle />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="ml-4 p-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="absolute top-16 left-0 right-0 bg-background z-50 shadow-lg py-4 px-6 md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <motion.div
            className="flex flex-col space-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {menuItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                className="text-lg py-2 border-b border-gray-200 hover:text-teal-500"
                variants={fadeIn}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Header
