import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Sun, Moon, Mail, Briefcase, User } from 'lucide-react'
import { businessServices, personalServices } from '../data/services.js'

function HomePage() {
  const [isDark, setIsDark] = useState(false)
  const [selectedPath, setSelectedPath] = useState(null)
  const navigate = useNavigate()

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Handle path selection
  const handlePathSelection = (path) => {
    setSelectedPath(path)
    setTimeout(() => {
      scrollToSection('services')
    }, 100)
  }

  // Handle service card click
  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">
            mogesieprzydac.pl
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="default"
              onClick={() => scrollToSection('contact')}
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Kontakt
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            W czym mogę Ci pomóc?
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Kreatywne rozwiązania. Realne rezultaty. Wybierz, kogo reprezentujesz, aby zobaczyć dopasowaną ofertę.
          </p>
          
          {/* Path Selection */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              variant={selectedPath === 'business' ? 'default' : 'outline'}
              onClick={() => handlePathSelection('business')}
              className="w-full sm:w-auto min-w-[200px] h-16 text-lg flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <Briefcase className="h-6 w-6" />
              JESTEM FIRMĄ
            </Button>
            <Button
              size="lg"
              variant={selectedPath === 'personal' ? 'default' : 'outline'}
              onClick={() => handlePathSelection('personal')}
              className="w-full sm:w-auto min-w-[200px] h-16 text-lg flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <User className="h-6 w-6" />
              DLA SIEBIE
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {selectedPath && (
        <section id="services" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {selectedPath === 'business' ? 'Usługi dla Twojej Firmy' : 'Usługi dla Ciebie'}
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {selectedPath === 'business' 
                ? 'Kompleksowe rozwiązania wspierające rozwój Twojego biznesu'
                : 'Personalizowane i kreatywne usługi dostosowane do Twoich potrzeb'
              }
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedPath === 'business' ? (
                businessServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    title={service.title}
                    description={service.shortDescription}
                    onClick={() => handleServiceClick(service.id)}
                  />
                ))
              ) : (
                personalServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    title={service.title}
                    description={service.shortDescription}
                    onClick={() => handleServiceClick(service.id)}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* About Me Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Poznajmy się
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                Jestem kreatywnym profesjonalistą z pasją do tworzenia rozwiązań, które naprawdę się przydają. 
                Specjalizuję się w projektowaniu stron internetowych, grafice, fotografii i montażu wideo.
              </p>
              <p className="text-lg leading-relaxed">
                Moja filozofia pracy opiera się na trzech filarach: dbałość o każdy detal, partnerskie relacje 
                z klientami oraz terminowość. Wierzę, że każdy projekt to możliwość stworzenia czegoś wyjątkowego.
              </p>
              <p className="text-lg leading-relaxed">
                Robię to, co robię, bo uwielbiam widzieć, jak pomysły przemieniają się w rzeczywistość i jak 
                moja praca pomaga innym osiągać ich cele.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                <User className="w-32 h-32 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Porozmawiajmy o Twoim projekcie
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Masz pomysł? Napisz do mnie – chętnie go przedyskutuję i pomogę go zrealizować.
          </p>
          
          <div className="bg-card border border-border rounded-lg p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Imię
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Twoje imię"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Adres e-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="twoj@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Temat
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Czego dotyczy Twoja wiadomość?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Wiadomość
                </label>
                <textarea
                  id="message"
                  rows="6"
                  className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Opowiedz mi o swoim projekcie..."
                ></textarea>
              </div>
              
              <Button type="submit" size="lg" className="w-full">
                Wyślij wiadomość
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} mogesieprzydac.pl. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </div>
  )
}

// Service Card Component
function ServiceCard({ title, description, onClick }) {
  return (
    <div 
      className="service-card bg-card border border-border rounded-lg p-6 cursor-pointer group"
      onClick={onClick}
    >
      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default HomePage

