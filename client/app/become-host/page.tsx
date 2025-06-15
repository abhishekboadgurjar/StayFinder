import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, DollarSign, Users, Shield, Star, TrendingUp } from "lucide-react"

export default function BecomeHostPage() {
  const benefits = [
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Earn Extra Income",
      description: "Turn your extra space into a source of income. Set your own prices and availability.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Meet New People",
      description: "Connect with travelers from around the world and share local experiences.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Host Protection",
      description: "Benefit from our host guarantee and 24/7 customer support.",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Build Your Reputation",
      description: "Earn reviews and build a strong hosting profile to attract more guests.",
    },
  ]

  const steps = [
    {
      step: "1",
      title: "Create Your Host Account",
      description: "Sign up as a host and complete your profile with photos and details about yourself.",
    },
    {
      step: "2",
      title: "List Your Property",
      description: "Add photos, write a description, set your price, and list the amenities you offer.",
    },
    {
      step: "3",
      title: "Welcome Guests",
      description: "Start receiving bookings and provide amazing experiences for your guests.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
        <div className="container text-center">
          <Badge variant="secondary" className="mb-4">
            <Home className="h-4 w-4 mr-2" />
            Become a Host
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Share Your Space,
            <span className="block text-primary">Earn Extra Income</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of hosts who are earning money by sharing their homes with travelers from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/register">
                <Home className="mr-2 h-5 w-5" />
                Start Hosting Today
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link href="/listings">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Host with StayFinder?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the benefits of becoming a host and start your journey to financial freedom.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto text-primary mb-4">{benefit.icon}</div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How to Get Started</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to start hosting and earning money with your property.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">$2,500</div>
              <p className="text-muted-foreground">Average monthly earnings</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">4.8★</div>
              <p className="text-muted-foreground">Average host rating</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <p className="text-muted-foreground">Host satisfaction rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Hosting?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community of successful hosts and start earning money today.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
            <Link href="/auth/register">
              <TrendingUp className="mr-2 h-5 w-5" />
              Create Host Account
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
