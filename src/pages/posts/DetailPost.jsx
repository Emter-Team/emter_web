import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "@/services/axios";
import Loading from "@/components/ui/loading";
import { formatDate } from "@/lib/dateUtils";
import { ChevronRight, MapPin } from "lucide-react";
import NavLink from "@/components/fragment/navlink";
import SidebarPost from "@/components/fragment/sidebar/sidebarPost";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default function DetailPost() {
    const { id } = useParams();
    const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDetailPost(id);
    }, [id]);

    const getDetailPost = async (postId) => {
        try {
            setLoading(true);
            const { data } = await http.get(`/admin/posts/${postId}`);
            setTimeout(() => {
                setLoading(false);
                setPost(data.data);
            }, 300);
        } catch (error) {
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }
    };

    const handleRelatedPostClick = async (slug) => {
        try {
            const { data } = await http.get(`/admin/posts/${slug}`);
            setTimeout(() => {
                setPost(data.data);
                navigate(`/posts/${slug}`);
            }, 300);
        } catch (error) {}
    };

    if (loading) {
        return <Loading />;
    }

    if (!post) {
        return <div>Post data not found.</div>;
    }

    return (
        <>
            <SidebarPost />
            <div className="w-full mt-10 md:mt-20 p-0 md:p-4 md:w-10/12 h-screen">
                <div className="w-full">
                    <div className="space-y-3">
                        <p>{formatDate(post.created_at)}</p>
                        <h3 className="text-xl md:text-3xl font-semibold text-primary">
                            {post.title}
                        </h3>
                        <span className="text-primary flex gap-x-2">
                            <MapPin
                                absoluteStrokeWidth="true"
                                className="text-primary"
                            />
                            {post.location}
                        </span>
                    </div>
                    <div className="flex gap-x-3 items-center mt-8 mb-4">
                        <div>
                            {post.institution.user.avatar ? (
                                <img
                                    src={post.institution.user.avatar}
                                    alt="Avatar"
                                />
                            ) : (
                                <img
                                    width="50"
                                    className="rounded"
                                    src="/images/notfound/notfound.jpg"
                                    alt="Not Found"
                                />
                            )}
                        </div>
                        <div>
                            <h6 className="font-semibold text-primary">
                                {post.institution.user.name}
                            </h6>
                            <p className="text-secondary text-sm">
                                {post.institution.user.address}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-x-8 flex-col md:flex-row">
                    <div className="w-full md:w-7/12 mb-12">
                        <div>
                            {post.image_posts.length > 0 ? (
                                <>
                                    <Carousel>
                                        <CarouselContent>
                                            {post.image_posts.map(
                                                (image_post, index) => (
                                                    <>
                                                        <CarouselItem>
                                                            <img
                                                                key={index}
                                                                className="rounded-md object-cover mb-4"
                                                                style={{
                                                                    height: "500px",
                                                                    width: "100%",
                                                                }}
                                                                src={
                                                                    image_post.image
                                                                }
                                                                alt={`Post Image ${
                                                                    index + 1
                                                                }`}
                                                            />
                                                        </CarouselItem>
                                                    </>
                                                )
                                            )}
                                        </CarouselContent>
                                        <CarouselPrevious />
                                        <CarouselNext />
                                    </Carousel>
                                </>
                            ) : (
                                <img
                                    className="rounded-md"
                                    width="100%"
                                    src="/images/notfound/notfound.jpg"
                                    alt="Not Found"
                                />
                            )}
                        </div>
                        <div className="font-light my-6 text-secondary">
                            {post.content}
                        </div>
                    </div>

                    <div className="w-full md:w-5/12 mb-12">
                        <div>
                            <div className="flex gap-x-3 items-center mt-8 mb-4">
                                <div>
                                    {post.institution.user.avatar ? (
                                        <img
                                            src={post.institution.user.avatar}
                                            alt="Avatar"
                                        />
                                    ) : (
                                        <img
                                            width="50"
                                            className="rounded"
                                            src="/images/notfound/notfound.jpg"
                                            alt="Not Found"
                                        />
                                    )}
                                </div>
                                <div>
                                    <h6 className="font-semibold  text-primary">
                                        {post.institution.user.name}
                                    </h6>
                                    <p className="text-secondary text-sm">
                                        {post.institution.user.address}
                                    </p>
                                </div>
                            </div>
                            <div className="text-secondary/80 mt-8">
                                Berita lainnya yang pernah dibuat:
                            </div>
                            {post.related_posts.map((related_post) => (
                                <div
                                    key={related_post.id}
                                    className="flex justify-between space-y-4"
                                >
                                    <NavLink
                                        onClick={() =>
                                            handleRelatedPostClick(
                                                related_post.slug
                                            )
                                        }
                                        className="text-primary"
                                    >
                                        {related_post.title}
                                    </NavLink>
                                    <ChevronRight className="text-secondary" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
