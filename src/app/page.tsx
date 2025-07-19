import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, BookOpen, Users, Globe, TrendingUp, Shield, Zap, Database, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-green-800">AfroEvidence</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">
              About
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
              Sign In
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-4xl">
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                  <Zap className="mr-1 h-3 w-3" />
                  Powered by African Research
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-900">
                  Discover Evidence from
                  <span className="text-green-600"> African Research</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl lg:text-2xl">
                  Access comprehensive research evidence from across Africa. Search through thousands of studies,
                  reports, and publications to find the insights you need.
                </p>
              </div>

              {/* Search Bar */}
              <div className="w-full max-w-3xl space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for research evidence, studies, or topics..."
                    className="h-14 pl-12 pr-4 text-lg border-2 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-xl shadow-lg"
                  />
                  <Button
                    size="lg"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 rounded-lg"
                  >
                    Search
                  </Button>
                </div>
                <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
                  <span>Popular searches:</span>
                  <Button variant="link" size="sm" className="h-auto p-0 text-green-600 hover:text-green-700">
                    Healthcare
                  </Button>
                  <span>•</span>
                  <Button variant="link" size="sm" className="h-auto p-0 text-green-600 hover:text-green-700">
                    Education
                  </Button>
                  <span>•</span>
                  <Button variant="link" size="sm" className="h-auto p-0 text-green-600 hover:text-green-700">
                    Agriculture
                  </Button>
                  <span>•</span>
                  <Button variant="link" size="sm" className="h-auto p-0 text-green-600 hover:text-green-700">
                    Climate Change
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">50K+</div>
                  <div className="text-gray-600">Research Papers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">54</div>
                  <div className="text-gray-600">African Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">1M+</div>
                  <div className="text-gray-600">Monthly Searches</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                Why Choose AfroEvidence?
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Comprehensive, reliable, and accessible African research at your fingertips
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-green-200 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Comprehensive Database</CardTitle>
                  <CardDescription>
                    Access over 50,000 research papers, reports, and studies from across Africa
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-green-200 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Advanced Search</CardTitle>
                  <CardDescription>
                    Powerful search capabilities with filters by country, topic, methodology, and more
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-green-200 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Quality Assured</CardTitle>
                  <CardDescription>
                    All research is peer-reviewed and verified for accuracy and reliability
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-green-200 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Pan-African Coverage</CardTitle>
                  <CardDescription>
                    Research from all 54 African countries, ensuring comprehensive continental coverage
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-green-200 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Collaborative Platform</CardTitle>
                  <CardDescription>
                    Connect with researchers, share findings, and collaborate on projects
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-green-200 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Real-time Updates</CardTitle>
                  <CardDescription>
                    Stay current with the latest research as new studies are published daily
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">
                  Empowering African Research
                </h2>
                <p className="text-gray-600 text-lg">
                  AfroEvidence bridges the gap between African research and global accessibility, ensuring that valuable
                  insights from the continent reach those who need them most.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Evidence-Based Decisions</h3>
                      <p className="text-gray-600">Make informed decisions backed by rigorous African research</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Local Context</h3>
                      <p className="text-gray-600">Access research that understands African contexts and challenges</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Global Standards</h3>
                      <p className="text-gray-600">
                        Research that meets international quality and methodology standards
                      </p>
                    </div>
                  </div>
                </div>

                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Start Exploring Research
                </Button>
              </div>

              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="African researchers collaborating"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Ready to Discover African Evidence?
              </h2>
              <p className="mx-auto max-w-[600px] text-green-100 md:text-xl">
                Join thousands of researchers, policymakers, and students who rely on AfroEvidence for credible African
                research.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
                >
                  View Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 bg-gray-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">AfroEvidence</span>
              </div>
              <p className="text-gray-400">Empowering decisions through African research evidence.</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Product</h3>
              <div className="space-y-2 text-gray-400">
                <Link href="#" className="block hover:text-white transition-colors">
                  Features
                </Link>
                <Link href="#" className="block hover:text-white transition-colors">
                  Pricing
                </Link>
                <Link href="#" className="block hover:text-white transition-colors">
                  API
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Company</h3>
              <div className="space-y-2 text-gray-400">
                <Link href="#" className="block hover:text-white transition-colors">
                  About
                </Link>
                <Link href="#" className="block hover:text-white transition-colors">
                  Blog
                </Link>
                <Link href="#" className="block hover:text-white transition-colors">
                  Careers
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Support</h3>
              <div className="space-y-2 text-gray-400">
                <Link href="#" className="block hover:text-white transition-colors">
                  Help Center
                </Link>
                <Link href="#" className="block hover:text-white transition-colors">
                  Contact
                </Link>
                <Link href="#" className="block hover:text-white transition-colors">
                  Privacy
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AfroEvidence. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
