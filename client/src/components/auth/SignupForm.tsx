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
import {Eye, EyeOff} from "lucide-react";

type SignupFormProps = React.ComponentProps<"div"> & {
  setFormState: React.Dispatch<React.SetStateAction<{
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    email: string;
    password: string;
  }>>;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
};

export function SignupForm({
                             setFormState,
                             isLoading,
                             handleSubmit,
                             className,
                             ...props
                           }: SignupFormProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState("");

  return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Fill in the information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">

                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="mb-2">First Name</Label>
                    <Input
                        id="firstName"
                        placeholder="First Name"
                        onChange={(e) =>
                            setFormState((prev) => ({ ...prev, firstName: e.target.value }))
                        }
                        required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="mb-2">Last Name</Label>
                    <Input
                        id="lastName"
                        placeholder="Last Name"
                        onChange={(e) =>
                            setFormState((prev) => ({ ...prev, lastName: e.target.value }))
                        }
                        required
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="grid gap-3">
                  <Label htmlFor="address">Address</Label>
                  <Input
                      id="address"
                      placeholder="Address"
                      onChange={(e) =>
                          setFormState((prev) => ({ ...prev, address: e.target.value }))
                      }
                      required
                  />
                </div>

                {/* Email & Phone Number */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="mb-2">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        onChange={(e) =>
                            setFormState((prev) => ({ ...prev, email: e.target.value }))
                        }
                        required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber" className="mb-2">Phone Number</Label>
                    <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="Phone Number"
                        onChange={(e) =>
                            setFormState((prev) => ({ ...prev, phoneNumber: e.target.value }))
                        }
                        required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="grid gap-3 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      onChange={(e) =>
                          setFormState((prev) => ({ ...prev, password: e.target.value }))
                      }
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

                {/* Confirm Password */}
                <div className="grid gap-3 relative">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                  />
                  <button
                      type="button"
                      className="absolute right-3 top-8 text-sm"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>

                {/* Already have an account */}
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <a href="/login" className="underline underline-offset-4">
                    Log in
                  </a>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
  );
}
