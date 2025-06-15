import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">StayFinder</h3>
            <p className="text-sm text-muted-foreground">Find your perfect stay anywhere in the world.</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/listings" className="text-sm text-muted-foreground hover:text-foreground">
                  All Listings
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Featured Stays
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Host</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/become-host" className="text-sm text-muted-foreground hover:text-foreground">
                  Become a Host
                </Link>
              </li>
              <li>
                <Link href="/host/listings" className="text-sm text-muted-foreground hover:text-foreground">
                  Manage Listings
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} StayFinder. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
