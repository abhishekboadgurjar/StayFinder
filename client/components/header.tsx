"use client"

import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, User, Home, LogOut, PlusCircle, UserCircle } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-6 w-6" />
            <span className="text-xl font-bold">StayFinder</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/listings" className="text-sm font-medium hover:underline">
              Explore
            </Link>
            {user?.isHost && (
              <>
                <Link href="/host/listings" className="text-sm font-medium hover:underline">
                  My Listings
                </Link>
              </>
            )}
            {user && (
              <Link href="/bookings" className="text-sm font-medium hover:underline">
                My Bookings
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>{user.name}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <UserCircle className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  {user.isHost && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/host/listings">My Listings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/host/listings/new">
                          <PlusCircle className="mr-2 h-4 w-4" /> Add Listing
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/bookings">My Bookings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/register">Register</Link>
                </Button>
              </>
            )}
          </div>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/listings"
                  className="text-lg font-medium hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Explore
                </Link>
                {user && (
                  <>
                    <Link
                      href="/profile"
                      className="text-lg font-medium hover:underline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    {user.isHost && (
                      <>
                        <Link
                          href="/host/listings"
                          className="text-lg font-medium hover:underline"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Listings
                        </Link>
                        <Link
                          href="/host/listings/new"
                          className="text-lg font-medium hover:underline"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Add Listing
                        </Link>
                      </>
                    )}
                    <Link
                      href="/bookings"
                      className="text-lg font-medium hover:underline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Bookings
                    </Link>
                  </>
                )}
                <div className="h-px bg-border my-2" />
                {user ? (
                  <>
                    <div className="text-lg font-medium">{user.name}</div>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="justify-start" asChild onClick={() => setIsMenuOpen(false)}>
                      <Link href="/auth/login">Login</Link>
                    </Button>
                    <Button className="justify-start" asChild onClick={() => setIsMenuOpen(false)}>
                      <Link href="/auth/register">Register</Link>
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
