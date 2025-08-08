import {LoginForm} from "@/components/auth/LoginForm.tsx";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {LOGIN_MUTATION} from "@/graphql/mutations/auth/login.ts";
import * as React from "react";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import {saveToken} from "@/lib/token.ts";

const LoginPage = () => {

    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { loading }] = useMutation(LOGIN_MUTATION);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { data } = await login({
                variables: {
                    email: formState.email,
                    password: formState.password,
                },
            });

            const token = data?.login?.data?.accessToken;

            if (token) {
                saveToken(token);
                toast.success(data?.login?.message);
                navigate("/");
            } else {
                toast.error(data?.login?.message);
            }
        } catch (err: any) {
            console.error('LoginPage error:', err.message);
            toast('LoginPage failed.');
        }
    };

    return (
        <div className="w-100 mx-auto mt-50">
            <LoginForm setFormState={setFormState} isLoading={loading} handleSubmit={handleSubmit} />
        </div>
    );
};
export default LoginPage;
