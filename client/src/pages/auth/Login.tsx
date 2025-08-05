import {LoginForm} from "@/components/ui/login-form.tsx";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {LOGIN_MUTATION} from "@/graphql/mutations/login.ts";
import * as React from "react";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import {saveToken} from "@/lib/token.ts";

const Login = () => {

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
                toast(`Login successful`);
                navigate("/");
            } else {
                toast('Login failed: No token returned');
            }
        } catch (err: any) {
            console.error('Login error:', err.message);
            toast('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="w-100 mx-auto mt-50">
            <LoginForm setFormState={setFormState} isLoading={loading} handleSubmit={handleSubmit} />
        </div>
    );
};
export default Login;
