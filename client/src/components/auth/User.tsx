import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {useState} from "react";
import { Button } from '@/components/ui/button';

const tabs = ['Me', 'Lent', 'Borrowed', 'Bought', 'Sold'];

const User = () => {
    const [activeTab, setActiveTab] = useState('Me');

    return (
        <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[50%] h-[80vh] mx-auto mt-10 p-8 border border-gray-300 rounded-lg shadow-lg bg-white overflow-hidden">
            <div className="flex gap-6 border-b pb-4 mb-6">
                {tabs.map((tab) => (
                    <Button
                        variant="outline"
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-lg font-medium cursor-pointer px-4 py-2 transition-all duration-300 ${
                            activeTab === tab
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-blue-500'
                        }`}
                    >
                        {tab}
                    </Button>
                ))}
            </div>

            <div className="mb-6 text-gray-700">
                {activeTab === 'Me' ? (
                    <p className="text-lg font-semibold">My Profile</p>
                ) : (
                    <p className="text-lg font-semibold">
                        Showing your <strong>{activeTab}</strong> items.
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-8">
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
                </form>
            </div>
        </div>
    );
};

export default User;
