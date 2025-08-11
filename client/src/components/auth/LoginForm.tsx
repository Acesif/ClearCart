import { cn } from "@/lib/utils.ts"
import { Button } from "@/components/ui/button.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import * as React from "react";
import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";
import Loader from "@/components/commons/Loader.tsx";

type LoginFormProps = React.ComponentProps<"div"> & {
  setFormState: React.Dispatch<React.SetStateAction<{
    email: string,
    password: string
  }>>;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
};

export function LoginForm({
    setFormState,
    isLoading,
    handleSubmit,
    className,
    ...props
}: LoginFormProps) {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) =>
                      setFormState((prev) =>
                          ({ ...prev, email: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="grid gap-3 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => {
                      setFormState((prev) => ({ ...prev, password: e.target.value }));
                    }}
                    required
                />
                <button
                    type="button"
                    className="absolute right-3 top-8 text-sm"
                    onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (<Loader className="w-5 h-5"/>) : <p>Login</p> }
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
