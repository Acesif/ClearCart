import type {UserInformation} from "@/types/UserInformation.ts";

export function saveToken(token: string) {
    localStorage.setItem('accessToken', token);
}

export function removeToken() {
    localStorage.removeItem('accessToken');
}

export function extractUserInformation(): UserInformation | null {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    try {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));

        if (decodedPayload.exp * 1000 <= Date.now()) {
            localStorage.removeItem("accessToken");
            return null;
        }

        return {
            userId: decodedPayload.sub,
            roles: decodedPayload.roles ?? [""],
        };
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
}
