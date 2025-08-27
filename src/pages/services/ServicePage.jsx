import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { ArrowLeft, CheckCircle, Sun, Moon, Mail } from 'lucide-react'
import { getServiceById } from '../../data/services.js'

function ServicePage() {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [isDark, setIsDark] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Load service data
  useEffect(() => {
    const serviceData = getServiceById(serviceId)
    if (serviceData) {
      setService(serviceData)
    } else {
      navigate('/')
    }
  }, [serviceId, navigate])

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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    alert('Dziękuję za wiadomość! Skontaktuję się z Tobą wkrótce.')
    setFormData({ name: '', email: '', message: '' })
  }

  if (!service) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Ładowanie...</p>
      </div>
    </div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold hover:text-primary transition-colors">
            mogesieprzydac.pl
          </Link>
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
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Kontakt
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Powrót
          </Button>
        </div>

        {/* Service Header */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {service.shortDescription}
            </p>
          </div>
        </section>

        {/* Service Content */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Description */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-card border border-border rounded-lg p-8">
                  <h2 className="text-2xl font-semibold mb-6">Opis usługi</h2>
                  <div className="prose prose-lg max-w-none text-foreground">
                    {service.fullDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                {service.benefits && (
                  <div className="bg-card border border-border rounded-lg p-8">
                    <h2 className="text-2xl font-semibold mb-6">Korzyści</h2>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Process */}
                {service.process && (
                  <div className="bg-card border border-border rounded-lg p-8">
                    <h2 className="text-2xl font-semibold mb-6">Proces realizacji</h2>
                    <div className="space-y-4">
                      {service.process.map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-foreground pt-1">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Form Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div id="contact" className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Zapytaj o "{service.title}"
                    </h3>
                    <p className="text-muted-foreground mb-6 text-sm">
                      Masz pytania dotyczące tej usługi? Napisz do mnie – chętnie odpowiem na wszystkie Twoje wątpliwości.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Imię
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
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
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                          placeholder="twoj@email.com"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Wiadomość
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows="4"
                          className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm"
                          placeholder={`Opowiedz mi o swoim projekcie dotyczącym: ${service.title.toLowerCase()}...`}
                        ></textarea>
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Wyślij zapytanie
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border mt-12">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} mogesieprzydac.pl. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default ServicePage

