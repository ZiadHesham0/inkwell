import { useState } from "react";
import { Link, NavLink, Route, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";

function Navbar() {
  const navigate = useNavigate();
  const { user, userLoading, signOut } = useAuth();
  console.log(user);
  

  const [open, setOpen] = useState(false);
  const getNavLinkClass = (isActive) =>
    `hover:text-white transition duration-300 pb-1 ${
      isActive ? "text-white border-b border-white" : "text-second"
    }`;

  const navLinks = [
    { to: "/", label: "Articles" },
    // { to: "/Tutorials", label: "Tutorials" },
    // { to: "/Community", label: "Community" },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-50  p-3.5 bg-linear-to-t from-[#121313] to-[#1B1C1C] bordr-b border-white/5 shadow-[0_-8px_30px_rgb(0,0,0,0.5)] flex justify-between items-center">
      <div>
        <Link className="text-xl font-bold" to={"/"}>
          Inkwell
        </Link>
      </div>

      <div className="hidden sm:block">
        <ul className="text-muted flex gap-3 text-sm">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop user */}
      {user && (
        <div className="hidden sm:flex justify-between gap-2 items-center">
          <div className="flex gap-x-2 items-center ">
            <p className="text-muted text-sm">Hi , {user.username}</p>
            {user.img ? (
              <img src={user.img} alt="" className="size-5 rounded-full" />
            ) : (
              <img src="./public/user.png" className="size-6 rounded-full" />
            )}
          </div>

          <AlertDialog className='bg-zinc-950'>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Log Out</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm" className='bg-zinc-900 text-muted'> 
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                  <Trash2Icon />
                </AlertDialogMedia>
                <AlertDialogTitle className='text-white'>Log Out?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this chat conversation. delete
                  any memories saved during this chat.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className='bg-zinc-900 border-zinc-600'>
                <AlertDialogCancel variant="outline" className='text-zinc-800'>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={handleSignOut}
                >
                  Log Out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      {!user && (
        <Button
          variant="outline"
          className="bg-transparent cursor-pointer rounded-4xl px-4.5"
          onClick={() => navigate("./auth")}
        >
          Login/Register
        </Button>
      )}

      {/* Mobile hamburger + Sheet */}
      <div className="sm:hidden">
        <Sheet open={open} onOpenChange={setOpen} className={"relative"}>
          <SheetTrigger asChild>
            <button aria-label="Open menu">
              <Menu className="text-white size-6 cursor-pointer" />
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="bg-[#1B1C1C] border-l border-white/10 text-white w-56 p-6"
          >
            {/* Hidden title for screen readers */}
            <VisuallyHidden>
              <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden>

            {user && (
              <div className="">
                <div className="flex gap-x-2 items-center mb-8 mt-2 ">
                  {user.img ? (
                    <img
                      src={user.img}
                      alt=""
                      className="size-5 rounded-full"
                    />
                  ) : (
                    <img
                      src="./public/user.png"
                      className="size-6 rounded-full"
                    />
                  )}
                  <p className="text-muted text-sm">Hi , {user.username}</p>
                </div>
                <Button
                  variant="outline"
                  className="bg-transparent cursor-pointer rounded-4xl px-4.5"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            )}

            <ul className="text-muted flex flex-col gap-4 text-sm my-8">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => getNavLinkClass(isActive)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
            {!user && (
              <Button
                variant="outline"
                className="bg-transparent cursor-pointer rounded-4xl px-4.5 absolute bottom-2 w-[90%] "
              >
                Login/Register
              </Button>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

export default Navbar;
