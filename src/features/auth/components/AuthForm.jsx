import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ButtonGroup } from "@/components/ui/button-group";
import { useAuth } from "../hooks/useAuth";

function AuthForm() {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    avatar_url: "",
  });

  const [reqError, setReqError] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const activeLinkStyle = "bg-white text-black";
  const [activeLink, setActiveLink] = useState("login");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleActiveLink = () => {
    // Reset everything on tab switch
    setFormData({
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
      avatar_url: "",
    });
    setReqError("");
    setEmailError(null);
    setPasswordError(null);
    setUsernameError(null);
    setConfirmPasswordError(null);
    setAvatarPreview(null);
    activeLink === "login" ? setActiveLink("register") : setActiveLink("login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setReqError("");
    setEmailError("");
    setPasswordError("");
    setUsernameError("");
    setConfirmPasswordError("");
    let err = false;

    if (formData.email.length < 1 || !formData.email.includes("@")) {
      setEmailError("Please enter a valid email");
      err = true;
    }
    if (formData.password.length < 6) {
      setPasswordError("Password must be 6 characters or more");
      err = true;
    }

    if (activeLink === "register") {
      if (formData.username.length < 1) {
        setUsernameError("Please enter a username");
        err = true;
      }
      if (formData.confirmPassword !== formData.password) {
        setConfirmPasswordError("Passwords do not match");
        err = true;
      }
    }

    if (err) return;

    try {
      if (activeLink === "login") {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(
          formData.email,
          formData.password,
          formData.username,
          formData.avatar_url || null
        );
      }
      navigate("/");
    } catch (err) {
      console.log(err);
      setReqError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="w-[70%] md:w-[50%] lg:w-[40%] mx-auto my-8 p-4 md:py-6 md:px-8 lg:px-16 bg-zinc-900 rounded-xl">
        <div className="form-header mb-10 text-center">
          <h1 className="font-black text-4xl my-2">
            {activeLink === "login" ? "Welcome Back" : "Join Inkwell"}
          </h1>
          <p className="text-sm text-white/60">
            Continue your journey into the monolith.
          </p>
        </div>

        <div className="bg-zinc-90 mb-6 rounded-lg">
          <ButtonGroup
            className={"w-full flex justify-center text-muted bg-transparent"}
          >
            <Button
              variant="outline"
              className={`w-[45%] py-4 text-muted border-muted-foreground bg-black/80 ${activeLink === "login" ? activeLinkStyle : ""}`}
              onClick={toggleActiveLink}
            >
              Login
            </Button>
            <Button
              variant="outline"
              className={`w-[45%] py-4 text-muted border-muted-foreground bg-black/80 ${activeLink === "register" ? activeLinkStyle : ""}`}
              onClick={toggleActiveLink}
            >
              Register
            </Button>
          </ButtonGroup>
        </div>

        <form onSubmit={handleSubmit}>
          <span className="text-red-700 mt-2 text-center block">{reqError}</span>

          {/* Email Field */}
          <div className="">
            <Field>
              <FieldLabel htmlFor="fieldgroup-email" className="text-white/80">
                Email Address :
              </FieldLabel>
              <Input
                onChange={handleChange}
                name="email"
                value={formData.email}
                id="fieldgroup-email"
                type="email"
                placeholder="name@example.com"
                className="placeholder:text-muted-foreground placeholder:text-sm py-5 px-4 w-full bg-black border-black"
              />
              <span className="text-red-700">{emailError}</span>
            </Field>
          </div>

          {/* Password Field */}
          <div className="my-4">
            <Field>
              <FieldLabel htmlFor="fieldgroup-password" className="text-white/80">
                Password :
              </FieldLabel>
              <Input
                name="password"
                onChange={handleChange}
                value={formData.password}
                id="fieldgroup-password"
                type="password"
                placeholder="••••••••••••••"
                className="placeholder:text-muted-foreground placeholder:text-lg py-5 px-4 w-full bg-black border-black"
              />
              <span className="text-red-700">{passwordError}</span>
            </Field>
          </div>

          {/* Register-only fields */}
          {activeLink === "register" && (
            <>
              {/* Username Field */}
              <div className="my-4">
                <Field>
                  <FieldLabel htmlFor="fieldgroup-username" className="text-white/80">
                    Username :
                  </FieldLabel>
                  <Input
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                    id="fieldgroup-username"
                    type="text"
                    placeholder="your_username"
                    className="placeholder:text-muted-foreground placeholder:text-sm py-5 px-4 w-full bg-black border-black"
                  />
                  <span className="text-red-700">{usernameError}</span>
                </Field>
              </div>

              {/* Confirm Password Field */}
              <div className="my-4">
                <Field>
                  <FieldLabel htmlFor="fieldgroup-confirm-password" className="text-white/80">
                    Confirm Password :
                  </FieldLabel>
                  <Input
                    name="confirmPassword"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    id="fieldgroup-confirm-password"
                    type="password"
                    placeholder="••••••••••••••"
                    className="placeholder:text-muted-foreground placeholder:text-lg py-5 px-4 w-full bg-black border-black"
                  />
                  <span className="text-red-700">{confirmPasswordError}</span>
                </Field>
              </div>

              {/* Avatar URL Field + Preview */}
              <div className="my-4">
                <Field>
                  <FieldLabel htmlFor="fieldgroup-avatar" className="text-white/80">
                    Profile Image URL (optional) :
                  </FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      name="avatar_url"
                      onChange={handleChange}
                      value={formData.avatar_url}
                      id="fieldgroup-avatar"
                      type="text"
                      placeholder="https://example.com/photo.jpg"
                      className="placeholder:text-muted-foreground placeholder:text-sm py-5 px-4 w-full bg-black border-black"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-black border-zinc-700 text-white/80 hover:bg-zinc-800"
                      onClick={() => setAvatarPreview(formData.avatar_url)}
                    >
                      Preview
                    </Button>
                  </div>
                  {avatarPreview && (
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="mt-3 size-16 rounded-full object-cover border border-zinc-700"
                      onError={() => setAvatarPreview(null)}
                    />
                  )}
                </Field>
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="mt-6">
            <Field>
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-white/80 py-5 hover:text-black cursor-pointer"
              >
                {activeLink === "login" ? "Sign In" : "Create Account"}
              </Button>
            </Field>
          </div>
        </form>
      </div>
    </>
  );
}

export default AuthForm;