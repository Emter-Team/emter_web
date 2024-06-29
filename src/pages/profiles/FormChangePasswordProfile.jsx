import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "@/services/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import Error from "@/components/ui/error";
import SidebarProfile from "@/components/fragment/sidebar/sidebarProfile";
import Loading from "@/components/ui/loading";
import { useStateContext } from "@/contexts/ContextProvider";

export default function FormChangePasswordProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const { user } = useStateContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Send PUT request to update password
            await http.put(`/admin/profiles/${user.id}/change_password`, {
                current_password: currentPassword,
                password: password,
                password_confirmation: passwordConfirmation,
            });

            // Display success toast and navigate back to profile
            toast.success("Password updated successfully");
            navigate(`/profiles/${id}`);
        } catch (err) {
            // Handle error response
            const response = err.response;
            if (response && response.status === 400) {
                setError(response.data.message);
            } else {
                toast.error("Server error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loading />}
            <SidebarProfile />
            <div className="w-full mt-10 md:mt-20 p-0 md:p-4 md:w-10/12 h-screen">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="title w-full">
                        <h3 className="text-3xl font-semibold text-primary">
                            Change Password
                        </h3>
                        <p className="text-secondary">
                            Update your account password.
                        </p>
                    </div>
                </div>
                <div className="mt-6 border rounded-md border-primary/50 p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label htmlFor="current_password">
                                Current Password
                            </label>
                            <Input
                                id="current_password"
                                type="password"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                autoComplete="current-password"
                            />
                            {error.current_password && (
                                <Error>{error.current_password[0]}</Error>
                            )}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password">New Password</label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                            />
                            {error.password && (
                                <Error>{error.password[0]}</Error>
                            )}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password_confirmation">
                                Confirm Password
                            </label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={passwordConfirmation}
                                onChange={(e) =>
                                    setPasswordConfirmation(e.target.value)
                                }
                                autoComplete="new-password"
                            />
                            {error.password_confirmation && (
                                <Error>{error.password_confirmation[0]}</Error>
                            )}
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <Button type="submit" disabled={loading}>
                                Update Password
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
