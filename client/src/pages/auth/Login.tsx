import {LoginForm} from "@/components/ui/login-form.tsx";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {LOGIN_MUTATION} from "@/graphql/mutations/login.ts";
import * as React from "react";

const Login = () => {

    const [formState, setFormState] = useState({ username: '', password: '' });
    const [login, { loading }] = useMutation(LOGIN_MUTATION);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { data } = await login({
                variables: {
                    username: formState.username,
                    password: formState.password,
                },
            });

            const token = data?.login?.data?.accessToken;
            const expiresIn = data?.login?.data?.expiresInSeconds;

            if (token) {
                localStorage.setItem('accessToken', token);
                alert(`Login successful: Token expires in ${expiresIn} seconds`);
            } else {
                alert('Login failed: No token returned');
            }
        } catch (err: any) {
            console.error('Login error:', err.message);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="w-100 mx-auto mt-50">
            <LoginForm setFormState={setFormState} isLoading={loading} handleSubmit={handleSubmit} />
        </div>
    );
};
export default Login;
