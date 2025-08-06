import {useState} from "react";
import {useMutation} from "@apollo/client";
import * as React from "react";
import {toast} from "sonner";
import {SIGNUP_MUTATION} from "@/graphql/mutations/signup.ts";
import {SignupForm} from "@/components/auth/SignupForm.tsx";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        email: '',
        password: ''
    });

    const [signup, { loading }] = useMutation(SIGNUP_MUTATION);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { data } = await signup({
                variables: {
                    email: formState.email,
                    firstName: formState.firstName,
                    lastName: formState.lastName,
                    address: formState.address,
                    phoneNumber: formState.phoneNumber,
                    password: formState.password,
                },
            });

            const email = data?.signUp?.data?.email;

            if (email) {
                toast(data?.signUp?.message);
                navigate("/login");
            } else {
                toast(data?.signUp?.message);
            }

        } catch (err) {
            console.error("Sign up error:", err);
            toast("Sign up failed.");
        }
    };

    return (
        <div className="w-100 mx-auto mt-50">
            <div className="w-120">
                <SignupForm setFormState={setFormState} isLoading={loading} handleSubmit={handleSubmit} />
            </div>
        </div>
    );
};
export default Signup;
