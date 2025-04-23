"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser, loginUser, formatAuthError } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Message {
  type: "success" | "error";
  text: string;
}

export default function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const [message, setMessage] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {
      let user;
      if (isSignup) {
        user = await signupUser(email, password);
        setMessage({
          type: "success",
          text: "Account created successfully! Redirecting to dashboard..."
        });
      } else {
        user = await loginUser(email, password);
        setMessage({
          type: "success",
          text: "Login successful! Redirecting to dashboard..."
        });
      }

      // Get the ID token
      const token = await user.getIdToken();

      // Set the token in a cookie
      document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict; Secure`;
      
      // Redirect immediately
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setMessage({
        type: "error",
        text: formatAuthError(error)
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-sm mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800 dark:text-green-100">
        {isSignup ? "Create Account" : "Welcome Back"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            minLength={6}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isSignup ? "Creating Account..." : "Logging In..."}
            </span>
          ) : (
            isSignup ? "Create Account" : "Log In"
          )}
        </Button>
      </form>

      <button
        onClick={() => {
          setIsSignup(!isSignup);
          setMessage(null);
        }}
        className="w-full text-sm text-green-600 dark:text-green-400 mt-4 text-center hover:underline"
      >
        {isSignup ? "Already have an account? Log In" : "New user? Create Account"}
      </button>

      {message && (
        <div
          className={`mt-4 p-3 rounded-md text-sm ${
            message.type === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
          }`}
        >
          {message.text}
        </div>
      )}
    </Card>
  );
}
