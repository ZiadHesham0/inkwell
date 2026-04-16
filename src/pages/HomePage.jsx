import { useAuth } from "@/features/auth/hooks/useAuth";
import PostCard from "@/features/posts/components/PostCard";
import PostCardSkeleton from "@/features/posts/components/PostCardSkeleton";
import getAllPosts, {
  deletePost,
  editPost,
} from "@/features/posts/services/posts.service";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const { user, userLoading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewModel, setViewModel] = useState("grid");
  const activeClass = "border border-zinc-800 bg-zinc-600";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeletePost = async (id) => {
    await deletePost(id);
    const fetchData = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };


  // console.log(posts);
  console.log(user);

  return (
    <>
      <div className="w-[95%] mx-auto">
        {/* Home Page Heading Section  */}
        <div className="p-3 mt-8 mb-10">
          <h1 className="h1 text-6xl mb-5 font-bold ">
            Editorial <span className="text-muted block">Selected.</span>
          </h1>
          <p className="text-muted text-sm">
            A curated selection of technical deep-dives and architectural
            designed for the modern engineer . narratives{" "}
          </p>
        </div>
        {/* Posts Rendering  */}
        <div className=" ">
          <div className="myt-5 mb-10 flex flex-wrap justify-between items-center p-3">
            <div className="section-header">
              <h3 className="text-2xl font-medium">Recent Publications</h3>
              <p className="text-sm text-muted">
                The latest from our global community of engineers.
              </p>
            </div>
            <div className="flex gap-x-1.5">
              <span
                className={`p-1.5 rounded-md  cursor-pointer ${viewModel == "grid" ? activeClass : "bg-zinc-800"}`}
                onClick={() => {
                  setViewModel("grid");
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 8V0H8V8H0ZM0 18V10H8V18H0ZM10 8V0H18V8H10ZM10 18V10H18V18H10ZM2 6H6V2H2V6ZM12 6H16V2H12V6ZM12 16H16V12H12V16ZM2 16H6V12H2V16Z"
                    fill="#C4C7C8"
                  />
                </svg>
              </span>
              <span
                className={`p-1.5 rounded-md cursor-pointer ${viewModel == "list" ? activeClass : "bg-zinc-800"}`}
                onClick={() => {
                  setViewModel("list");
                }}
              >
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 14H18V11.325H7V14ZM2 4.675H5V2H2V4.675ZM2 9.35H5V6.675H2V9.35ZM2 14H5V11.325H2V14ZM7 9.35H18V6.675H7V9.35ZM7 4.675H18V2H7V4.675ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2Z"
                    fill="#C4C7C8"
                  />
                </svg>
              </span>
            </div>
          </div>

          {error && <p className="text-red-400 text-center">{error}</p>}

          <div
            className={`grid gap-6  justify-center  mx-auto ${viewModel == "grid" ? " grid-cols-1 sm:grid-cols-2" : " grid-cols-1"}`}
          >
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <PostCardSkeleton
                    key={i}
                    loading={loading}
                    variant={viewModel}
                  />
                ))
              : posts.map((p) => (
                  <PostCard
                    key={p.id}
                    post={p}
                    variant={viewModel}
                    currentUser={p.author_id === user?.id}
                    deletePost={() => {
                      handleDeletePost(p.id);
                    }}
                  />
                ))}
          </div>
        </div>

        <div className="bg-white w-fit rounded-full p-2 fixed right-[3%] bottom-24 hover:scale-110 transition duration-300 cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.4)]">
          <Link to={"/posts/new"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="black"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomePage;
