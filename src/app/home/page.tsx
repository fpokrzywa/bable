'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Zap, Users, Bot, ArrowRight, Building2, Cloud, Monitor, Search } from 'lucide-react'

export default function Home() {
  const services = [
    { name: 'External Network Penetration Testing', href: '/services/external-network-pentesting' },
    { name: 'Assumed Breach Penetration Testing', href: '/services/assumed-breach' },
    { name: 'Web Application Penetration Testing', href: '/services/web-application-penetration-testing' },
    { name: 'AI Penetration Testing and Red Teaming', href: '/services/ai-pentesting-and-red-teaming' },
    { name: 'AI Automation & Scaling Assessment', href: '/services/ai-automation-scaling-assessment' },
  ]

  const training = [
    { name: 'Attacking AI (Live, August 18th & 20th)', href: '/training/attacking-ai' },
    { name: 'Red Blue Purple AI (Live, July 15 & 17)', href: '/training/red-blue-purple-ai' },
    { name: 'Hacking Your Career', href: '/training/hack-your-brand' },
    { name: 'The Bug Hunter\'s Methodology [Core]', href: '/training/the-bug-hunters-methodology' },
  ]

  const media = [
    { name: 'Blog', href: '/blog' },
    { name: 'Live Event Appearances', href: '/events' },
    { name: 'Community Discord', href: '#' },
    { name: 'YouTube', href: 'https://www.youtube.com/c/jhaddix' },
    { name: 'Jason\'s Twitter', href: 'https://x.com/jhaddix' },
    { name: 'BabelPhish\'s Twitter', href: 'https://x.com/agenticweaver' },
    { name: 'Executive Offense Newsletter', href: 'https://executiveoffense.beehiiv.com/' },
  ]

  const tools = [
    { name: 'BabelPhish Cyber Security Bot', href: 'https://chatgpt.com/g/g-HTsfg2w2z-arcanum-cyber-security-bot' },
    { name: 'BabelPhish OSQuery Bot', href: 'https://chatgpt.com/g/g-L83SalWgy-arcanum-osquery-bot' },
    { name: 'BabelPhish Yara Bot', href: 'https://chatgpt.com/g/g-Wi5N17rtj-arcanum-yara-bot' },
    { name: 'BabelPhish Suricata Bot', href: 'https://chatgpt.com/g/g-QEmiJUdcM-arcanum-suricata-bot' },
    { name: 'BabelPhish Splunk Bot', href: 'https://chatgpt.com/g/g-dEmq4h2Ao-arcanum-splun-k-bot' },
    { name: 'BabelPhish SOC Manager Incident Coordination Bot', href: 'https://chatgpt.com/g/g-18cUZU00i-arcanum-soc-manager-incident-coordination-bot' },
  ]

  const clientLogos = [
    'Amazon', 'Google', 'Adobe', 'Yahoo'
  ]

  const clientIcons = {
    'Amazon': Cloud,
    'Google': Search,
    'Adobe': Monitor,
    'Yahoo': Building2
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer">
              <img src="https://placehold.co/32x32.png" data-ai-hint="logo" alt="BabelPhish" className="h-8 w-8 mr-2 animate-pulse" />
              <span className="text-xl font-bold text-blue-600">BabelPhish</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Training Dropdown */}
              <div className="relative group">
                <button 
                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors transform hover:scale-105 duration-200 px-4 py-2 -mx-4"
                >
                  <span>Training</span>
                  <ArrowRight className="h-4 w-4 rotate-90" />
                </button>
                <div 
                  className="absolute top-full left-0 w-80 bg-white border border-gray-200 rounded-lg shadow-xl mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto"
                >
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">Training</h4>
                    <p className="text-sm text-gray-600 mb-4">Sign up for industry leading training from the BabelPhish crew!</p>
                    <div className="space-y-2">
                      {training.map((item) => (
                        <a key={item.name} href={item.href} className="block p-2 hover:bg-gray-50 rounded text-sm hover:text-blue-600 transition-colors">
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Dropdown */}
              <div className="relative group">
                <button 
                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors transform hover:scale-105 duration-200 px-4 py-2 -mx-4"
                >
                  <span>Services</span>
                  <ArrowRight className="h-4 w-4 rotate-90" />
                </button>
                <div 
                  className="absolute top-full left-0 w-80 bg-white border border-gray-200 rounded-lg shadow-xl mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto"
                >
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">Call in the A-Team</h4>
                    <p className="text-sm text-gray-600 mb-4">Cutting-edge consulting by Jason Haddix and crew.</p>
                    <div className="space-y-2">
                      {services.map((item) => (
                        <a key={item.name} href={item.href} className="block p-2 hover:bg-gray-50 rounded text-sm hover:text-blue-600 transition-colors">
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Media Dropdown */}
              <div className="relative group">
                <button 
                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors transform hover:scale-105 duration-200 px-4 py-2 -mx-4"
                >
                  <span>Media</span>
                  <ArrowRight className="h-4 w-4 rotate-90" />
                </button>
                <div 
                  className="absolute top-full left-0 w-80 bg-white border border-gray-200 rounded-lg shadow-xl mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto"
                >
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">Media</h4>
                    <p className="text-sm text-gray-600 mb-4">Find us online or at live events delivering leading cybersecurity content!</p>
                    <div className="space-y-2">
                      {media.map((item) => (
                        <a key={item.name} href={item.href} className="block p-2 hover:bg-gray-50 rounded text-sm hover:text-blue-600 transition-colors">
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tools Dropdown */}
              <div className="relative group">
                <button 
                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors transform hover:scale-105 duration-200 px-4 py-2 -mx-4"
                >
                  <span>Tools</span>
                  <ArrowRight className="h-4 w-4 rotate-90" />
                </button>
                <div 
                  className="absolute top-full left-0 w-80 bg-white border border-gray-200 rounded-lg shadow-xl mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto"
                >
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">Tools</h4>
                    <p className="text-sm text-gray-600 mb-4">Get tools and resources built by BabelPhish's team!</p>
                    <div className="space-y-2">
                      {tools.map((item) => (
                        <a key={item.name} href={item.href} className="block p-2 hover:bg-gray-50 rounded text-sm hover:text-blue-600 transition-colors">
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <a href="/about-us" className="hover:text-blue-600 transition-colors transform hover:scale-105 duration-200 px-4 py-2 -mx-4">About Us</a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-blue-500/25">
                Work with Us
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger className="md:hidden">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-gray-200">
                <div className="space-y-4 mt-8">
                  <div>
                    <h4 className="font-semibold mb-2">Training</h4>
                    <div className="space-y-2 ml-4">
                      {training.map((item) => (
                        <a key={item.name} href={item.href} className="block text-sm text-gray-600">
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Services</h4>
                    <div className="space-y-2 ml-4">
                      {services.map((item) => (
                        <a key={item.name} href={item.href} className="block text-sm text-gray-600">
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Media</h4>
                    <div className="space-y-2 ml-4">
                      {media.map((item) => (
                        <a key={item.name} href={item.href} className="block text-sm text-gray-600">
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Tools</h4>
                    <div className="space-y-2 ml-4">
                      {tools.map((item) => (
                        <a key={item.name} href={item.href} className="block text-sm text-gray-600">
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <a href="/about-us" className="block">About Us</a>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Work with Us
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                The Future <span className="text-blue-600 animate-pulse">Secured</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 animate-fade-in-up">
                Modern cybersecurity through cutting-edge training and consulting by Jason Haddix + crew...
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-blue-500/25">
                Discover Now
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative z-10 animate-float">
                  <img src="https://app.bablephish.com/_next/image?url=%2Fphish_logo.png&w=128&q=75" alt="BabelPhish Fish Logo" className="h-64 w-64 drop-shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold mb-4">These Companies Have Trusted In Our Services</h3>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-2xl">
              {clientLogos.map((logo, index) => {
                const IconComponent = clientIcons[logo];
                return (
                  <div 
                    key={logo} 
                    className="flex flex-col items-center justify-center space-y-4 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors cursor-pointer text-center">
                      {logo}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Cutting-edge cybersecurity solutions for modern threats</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service, index) => (
              <div 
                key={service.name} 
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Zap className="h-12 w-12 text-blue-600 mb-4 animate-pulse" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">{service.name}</h3>
                <p className="text-gray-600">Advanced security testing and assessment services</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Preview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Training Programs</h2>
            <p className="text-xl text-gray-600">Industry-leading cybersecurity training</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {training.slice(0, 2).map((item, index) => (
              <div 
                key={item.name} 
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Users className="h-12 w-12 text-blue-600 mb-4 animate-pulse" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                <p className="text-gray-600 mb-4">Comprehensive training programs for cybersecurity professionals</p>
                <a href={item.href} className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Secure Your Future?</h2>
            <p className="text-xl mb-8 text-blue-100">Get in touch with our team of cybersecurity experts</p>
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="https://placehold.co/32x32.png" data-ai-hint="logo" alt="BabelPhish" className="h-8 w-8 mr-2" />
                <span className="text-xl font-bold">BabelPhish</span>
              </div>
              <p className="text-gray-400">Modern cybersecurity through cutting-edge training and consulting.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {services.slice(0, 3).map((service) => (
                  <li key={service.name}>
                    <a href={service.href} className="text-gray-400 hover:text-white transition-colors">{service.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Training</h4>
              <ul className="space-y-2">
                {training.slice(0, 3).map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-gray-400 hover:text-white transition-colors">{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://x.com/agenticweaver" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                </li>
                <li>
                  <a href="https://www.youtube.com/c/jhaddix" className="text-gray-400 hover:text-white transition-colors">YouTube</a>
                </li>
                <li>
                  <a href="https://executiveoffense.beehiiv.com/" className="text-gray-400 hover:text-white transition-colors">Newsletter</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BabelPhish. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
