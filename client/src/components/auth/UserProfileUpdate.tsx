import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import { Button } from "../ui/button";

const UserProfileUpdate = () => {
    return (
        <div className="flex flex-col gap-8 ml-150 mr-150">
            <p className="text-lg font-semibold text-center">My Profile</p>
            <div className="space-y-4">
                <p className="text-lg text-gray-600">Update your details below:</p>
            </div>

            <form className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="email" className="text-gray-700 mb-2">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="e.g. user@mail.com"
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div>
                        <Label htmlFor="username" className="text-gray-700 mb-2">Username</Label>
                        <Input
                            type="text"
                            name="username"
                            placeholder="Your Username"
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div>
                        <Label htmlFor="address" className="text-gray-700 mb-2">Address</Label>
                        <Input
                            type="text"
                            name="address"
                            placeholder="Your Address"
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div>
                        <Label htmlFor="phoneNumber" className="text-gray-700 mb-2">Phone Number</Label>
                        <Input
                            type="text"
                            name="phoneNumber"
                            placeholder="e.g. (123) 456-7890"
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div>
                        <Label htmlFor="password" className="text-gray-700 mb-2">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button type="submit" className="w-50 cursor-pointer">
                        Update Profile
                    </Button>
                </div>
            </form>
        </div>
    );
};
export default UserProfileUpdate;
