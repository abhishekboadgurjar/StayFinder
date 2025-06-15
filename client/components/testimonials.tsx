import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, NY",
      comment:
        "StayFinder made it so easy to find the perfect apartment for our family vacation. The booking process was seamless and the place was exactly as described!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      location: "San Francisco, CA",
      comment:
        "As a host, I love how simple it is to list my property. I've had great guests and the platform handles everything smoothly.",
      rating: 5,
    },
    {
      name: "Emma Wilson",
      location: "London, UK",
      comment:
        "I've used StayFinder for both business and leisure travel. The variety of properties available is impressive and I always find exactly what I need.",
      rating: 4,
    },
  ]

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from our community of travelers and hosts about their experiences with StayFinder.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                    />
                  ))}
                </div>
                <p className="mb-4 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
