import { Search, Home, Calendar } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-10 w-10" />,
      title: "Search",
      description: "Find the perfect place from our wide selection of listings.",
    },
    {
      icon: <Calendar className="h-10 w-10" />,
      title: "Book",
      description: "Book your stay with our secure and easy booking system.",
    },
    {
      icon: <Home className="h-10 w-10" />,
      title: "Stay",
      description: "Enjoy your stay at one of our quality-checked properties.",
    },
  ]

  return (
    <section className="bg-muted/50 py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How StayFinder Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Finding and booking your perfect stay is easy with our simple three-step process.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6">
              <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">{step.icon}</div>
              <h3 className="text-xl font-medium mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
