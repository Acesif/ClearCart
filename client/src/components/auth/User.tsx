import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {useState} from "react";
import { Button } from '@/components/ui/button';

const tabs = ['Me', 'Lent', 'Borrowed', 'Bought', 'Sold'];

const User = () => {
    const [activeTab, setActiveTab] = useState('Me');

    return (
        <div className="w-[90%] h-[80vh] mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-sm overflow-y-auto">
            <div className="flex gap-4 border-b pb-2 mb-4">
                {tabs.map((tab) => (
                    <Button
                        variant="outline"
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-lg font-medium cursor-pointer ${
                            activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
                        }`}
                    >
                        {tab}
                    </Button>
                ))}
            </div>

            <div className="mb-6 text-gray-700">
                {activeTab === 'Me' ? (
                    <p className="text-lg">My Profile</p>
                ) : (
                    <p className="text-lg">
                        Showing your <strong>{activeTab}</strong> items.
                    </p>
                )}
            </div>


            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <p className="text-xl font-semibold">Username</p>
                    <p className="text-xl font-semibold">Email</p>
                    <p className="text-xl font-semibold">Address</p>
                    <p className="text-xl font-semibold">Phone Number</p>
                    <p className="text-xl font-semibold">Password</p>
                </div>

                <form className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" name="email" placeholder="e@mail.com" />
                    </div>
                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" name="username" placeholder="Username" />
                    </div>
                    <div>
                        <Label htmlFor="address">Address</Label>
                        <Input type="text" name="address" placeholder="Address" />
                    </div>
                    <div>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input type="text" name="phoneNumber" placeholder="Phone Number" />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" name="password" placeholder="Password" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default User;
