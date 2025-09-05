
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Menu, ArrowRight, Building2, Cloud, Monitor, Search, Sparkles, Database, MessageSquare, BarChart3, Settings, Shield, Users, Mail, Github, Linkedin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('general')

  const openModal = (content: string) => {
    setModalContent(content)
    setIsContactModalOpen(true)
  }

  const getModalTitle = () => {
    switch (modalContent) {
      case 'starter': return 'Get Started with Team Plan'
      case 'professional': return 'Get Started with Business Plan'
      case 'enterprise': return 'Enterprise Plan Demo'
      case 'consultation': return 'Request BablePhish Demo'
      default: return 'Contact BablePhish'
    }
  }

  const getModalPlaceholder = () => {
    switch (modalContent) {
      case 'starter': return 'Tell us about your ServiceNow environment and how many users need access...'
      case 'professional': return 'Describe your ServiceNow modules (ITSM, CSM, HRSD) and workflow requirements...'
      case 'enterprise': return 'Tell us about your organization size, compliance needs, and ServiceNow setup...'
      case 'consultation': return 'Describe your current ServiceNow challenges and what you\'d like to see in a demo...'
      default: return 'Describe your ServiceNow requirements...'
    }
  }

  const getSuccessMessage = () => {
    switch (modalContent) {
      case 'starter': return 'Thank you! We\'ll contact you within 24 hours to set up your Team plan demo.'
      case 'professional': return 'Thank you! Our team will contact you within 24 hours to discuss the Business plan.'
      case 'enterprise': return 'Thank you! Our enterprise team will contact you within 24 hours to schedule a custom demo.'
      case 'consultation': return 'Thank you! We\'ll contact you within 24 hours to schedule your personalized BablePhish demo.'
      default: return 'Thank you! We\'ll contact you soon.'
    }
  }

  const getButtonText = () => {
    switch (modalContent) {
      case 'starter': return 'Request Team Demo'
      case 'professional': return 'Request Business Demo'
      case 'enterprise': return 'Request Enterprise Demo'
      case 'consultation': return 'Schedule Demo'
      default: return 'Submit Request'
    }
  }
  const features = [
    { 
      name: 'Conversational AI Interface', 
      description: 'Chat with your ServiceNow data using natural language. Query across all workspaces and get instant answers.',
      icon: MessageSquare
    },
    { 
      name: 'Workspace Management', 
      description: 'Create, save, and manage multiple workspaces. Open simultaneous views of different ServiceNow modules.',
      icon: Settings
    },
    { 
      name: 'Drag & Drop Widgets', 
      description: 'Customize your workspace with draggable widgets. Display ITSM, CSM, and HRSD records exactly how you want.',
      icon: BarChart3
    },
    { 
      name: 'Smart Highlighting', 
      description: 'Highlight any data in widgets and ask contextual questions. Get instant insights about specific records.',
      icon: Sparkles
    },
    { 
      name: 'Quick Commands', 
      description: 'Use pre-configured system commands or create your own custom shortcuts for frequent actions.',
      icon: Database
    },
    { 
      name: 'Enterprise Security', 
      description: 'SSO authentication, service account impersonation, and comprehensive audit logging for compliance.',
      icon: Shield
    },
  ]

  const services = [
    { name: 'ITSM Records', description: 'Manage Incidents, Tasks, Changes, Problems, and Requests with conversational AI' },
    { name: 'Customer Service Management', description: 'Handle CSM cases and workflows through intelligent chat interface' },
    { name: 'HR Service Delivery', description: 'Process HRSD cases and requests with natural language commands' },
    { name: 'Financial Service Operations', description: 'Streamline FSO processes including risk management and compliance workflows' },
    { name: 'Security Operations', description: 'Manage SecOps incidents, vulnerabilities, and security response workflows' },
    { name: 'AI Store & Prompts', description: 'Access library of AI assistants and pre-configured prompts for common tasks' },
  ]

  const clientLogos = [
    'Microsoft', 'Google', 'Amazon', 'IBM'
  ]

  const clientIcons = {
    'Microsoft': Monitor,
    'Google': Search,
    'Amazon': Cloud,
    'IBM': Building2
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center hover:scale-105 transition-transform duration-200">
              <Image 
                src="/bablephish_logo.svg" 
                alt="BablePhish" 
                width={32} 
                height={32} 
                className="mr-2" 
              />
              <span className="text-xl font-bold text-primary">BablePhish</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#features" className="hover:text-primary transition-colors">Features</Link>
              <Link href="/#services" className="hover:text-primary transition-colors">Services</Link>
              <Link href="/#pricing" className="hover:text-primary transition-colors">Pricing</Link>
              <Link href="/#about" className="hover:text-primary transition-colors">About</Link>
              <Link href="/#contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                className="bg-primary hover:bg-primary/90 text-white transform hover:scale-105 transition-all duration-200"
                onClick={() => openModal('consultation')}
              >
                Get Started
              </Button>
              <Link href="https://app.bablephish.com" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-white transform hover:scale-105 transition-all duration-200"
                >
                  Signin/Signup
                </Button>
              </Link>
            </div>

            {/* Mobile CTA */}
            <div className="md:hidden">
              <Link href="https://app.bablephish.com" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Signin/Signup
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-foreground">Modern AI-Driven</span><br />
                <span className="text-primary">ServiceNow</span><br />
                <span className="text-foreground">Interface</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground mb-8">
                Replace ServiceNow's clunky UI with a chat-first, customizable, and intelligent experience. Manage ITSM, CSM, and HRSD records through conversational AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white transform hover:scale-105 transition-all duration-200 shadow-lg"
                  onClick={() => openModal('consultation')}
                >
                  Get Demo
                </Button>
                <Link href="/#features">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200">
                    See Features
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
                <div className="relative z-10 animate-float">
                  <Image 
                    src="/bablephish_logo.svg" 
                    alt="BablePhish Logo" 
                    width={256} 
                    height={256} 
                    className="drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold mb-4">Trusted by Industry Leaders</h3>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-2xl">
              {clientLogos.map((logo, index) => {
                const IconComponent = clientIcons[logo];
                return (
                  <div 
                    key={logo} 
                    className="flex flex-col items-center justify-center space-y-4 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110"
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-sm font-medium text-gray-600 hover:text-primary transition-colors text-center">
                      {logo}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Core Features</h2>
            <p className="text-xl text-muted-foreground">Experience ServiceNow like never before with our AI-driven interface</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={feature.name} 
                  className="bg-white p-6 rounded-lg border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 group"
                >
                  <IconComponent className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-200" />
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{feature.name}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">ServiceNow Modules</h2>
            <p className="text-xl text-muted-foreground">Streamline all your ServiceNow operations with conversational AI</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.name} 
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
              >
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Link href="/#contact" className="text-primary hover:text-primary/80 font-medium inline-flex items-center">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Flexible Pricing Plans</h2>
            <p className="text-xl text-muted-foreground">Choose the right plan for your ServiceNow user base</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Team</h3>
                <p className="text-muted-foreground mb-6">Perfect for small teams managing ServiceNow operations</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">$49</span>
                  <span className="text-muted-foreground">/user/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Conversational AI interface</span>
                  </li>
                  <li className="flex items-start">
                    <Settings className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Up to 5 workspaces per user</span>
                  </li>
                  <li className="flex items-start">
                    <Database className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>ITSM module access</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={() => openModal('starter')}
                >
                  Get Started
                </Button>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="bg-white p-8 rounded-2xl border-2 border-primary relative hover:shadow-xl hover:shadow-primary/20 transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Business</h3>
                <p className="text-muted-foreground mb-6">For growing organizations with multiple ServiceNow modules</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">$89</span>
                  <span className="text-muted-foreground">/user/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Full conversational AI interface</span>
                  </li>
                  <li className="flex items-start">
                    <Settings className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Unlimited workspaces</span>
                  </li>
                  <li className="flex items-start">
                    <Database className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>ITSM + CSM + HRSD modules</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>AI Store & custom prompts</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Priority phone & email support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={() => openModal('professional')}
                >
                  Get Started
                </Button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-muted-foreground mb-6">For large organizations requiring advanced security and compliance</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">$149</span>
                  <span className="text-muted-foreground">/user/month</span>
                  <span className="text-muted-foreground block text-sm mt-1">Volume discounts available</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Advanced conversational AI</span>
                  </li>
                  <li className="flex items-start">
                    <Settings className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Unlimited workspaces & modules</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>SSO integration & audit logging</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Custom AI assistants & prompts</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Dedicated success manager</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={() => openModal('enterprise')}
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">About BablePhish</h2>
              <p className="text-xl text-muted-foreground mb-6">
                BablePhish is a modern, AI-driven interface layer for ServiceNow that replaces the clunky, outdated UI with a chat-first, customizable, and intelligent experience.
              </p>
              <p className="text-muted-foreground mb-8">
                Our solution eliminates complex dashboards and overwhelming navigation, delivering a consumer-grade user experience that helps agents, fulfillers, and service desk users work more efficiently across ITSM, CSM, and HRSD modules.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white"
                  onClick={() => openModal('consultation')}
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-2xl"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-xl">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">75%</div>
                    <div className="text-sm text-muted-foreground mb-6">Faster Task Completion</div>
                    <div className="text-4xl font-bold text-primary mb-2">90%</div>
                    <div className="text-sm text-muted-foreground mb-6">User Satisfaction</div>
                    <div className="text-4xl font-bold text-primary mb-2">50%</div>
                    <div className="text-sm text-muted-foreground">Reduced Training Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your ServiceNow Experience?</h2>
            <p className="text-xl text-muted-foreground">See how BablePhish can modernize your ServiceNow workflows</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-primary mr-3" />
                      <span>hello@bablePhish.ai</span>
                    </div>
                    <div className="flex items-center">
                      <Github className="h-5 w-5 text-primary mr-3" />
                      <span>github.com/bablePhish</span>
                    </div>
                    <div className="flex items-center">
                      <Linkedin className="h-5 w-5 text-primary mr-3" />
                      <span>linkedin.com/company/bablePhish</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Request Demo</h3>
                  <p className="text-muted-foreground mb-6">
                    See BablePhish in action with a personalized demo for your ServiceNow environment.
                  </p>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => openModal('consultation')}
                  >
                    Schedule Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image 
                  src="/bablephish_logo.svg" 
                  alt="BablePhish" 
                  width={32} 
                  height={32} 
                  className="mr-2" 
                />
                <span className="text-xl font-bold">BablePhish</span>
              </div>
              <p className="text-gray-400">Modern AI-driven interface for ServiceNow that delivers consumer-grade user experience.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Modules</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/#services" className="text-gray-400 hover:text-white transition-colors">ITSM Records</Link>
                </li>
                <li>
                  <Link href="/#services" className="text-gray-400 hover:text-white transition-colors">Customer Service</Link>
                </li>
                <li>
                  <Link href="/#services" className="text-gray-400 hover:text-white transition-colors">HR Service Delivery</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/#about" className="text-gray-400 hover:text-white transition-colors">About</Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/bablePhish" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
                </li>
                <li>
                  <a href="https://linkedin.com/company/bablePhish" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                </li>
                <li>
                  <a href="mailto:hello@bablePhish.ai" className="text-gray-400 hover:text-white transition-colors">Email</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BablePhish. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{getModalTitle()}</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <Input placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <Input placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input type="email" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company</label>
              <Input placeholder="Your Company Name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input type="tel" placeholder="+1 (555) 123-4567" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {modalContent === 'enterprise' ? 'Enterprise Requirements' : 'Project Details'}
              </label>
              <Textarea 
                placeholder={getModalPlaceholder()} 
                rows={4}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-white"
              onClick={(e) => {
                e.preventDefault()
                setIsContactModalOpen(false)
                alert(getSuccessMessage())
              }}
            >
              {getButtonText()}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
