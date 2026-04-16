import { useMemo } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Trash2, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const timeAgo = (date) => {
  if (!date) return "";
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

function PostCard({ post, variant = "grid", currentUser, deletePost }) {
  const categoriesStyles = [
    " bg-blue-950 text-blue-300 px-2 py-1 rounded-xl text-xs",
    "bg-green-950 text-green-300 px-3 py-1 rounded-xl text-xs",
    "bg-yellow-950 text-yellow-300 px-3 py-1 rounded-xl text-xs",
    "bg-purple-950 text-purple-300 px-3 py-1 rounded-xl text-xs",
    "bg-red-950 text-red-300 px-3 py-1 rounded-xl text-xs",
    "bg-pink-950 text-pink-300 px-3 py-1 rounded-xl text-xs",
    " bg-sky-950 text-sky-300 px-3 py-1 rounded-xl text-xs",
  ];
  const navigate = useNavigate();

  console.log(post);

  const timeAgoValue = useMemo(() => {
    if (!post || !post.created_at) return "";
    return timeAgo(post.created_at);
  }, [post?.created_at]);

  if (variant === "list") {
    return (
      <Card className="relative w-full mb-10 overflow-hidden bg-transparent bg  border-white/8 rounded-xl flex flex-row p-0 ">
        {/*Card image */}
        <img
          src={post.image_url}
          alt="Post cover"
          className="w-48 md:w-52 lg:w-72 min-w-48 h-full object-cover grayscale brightness-50 rounded-r-xl"
        />
        {currentUser && (
          <div className="absolute flex gap-2 top-2 right-2">
            <AlertDialog className="bg-zinc-950">
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trash2-icon lucide-trash-2"
                  >
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    <path d="M3 6h18" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent size="sm" className="bg-zinc-900 text-muted">
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                    <Trash2Icon />
                  </AlertDialogMedia>
                  <AlertDialogTitle className="text-white">
                    Log Out?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this chat conversation. View
                    Settings delete any memories saved during this chat.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="bg-zinc-900 border-zinc-600">
                  <AlertDialogCancel
                    variant="outline"
                    className="text-zinc-800"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction variant="destructive" onClick={deletePost}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <span
              onClick={() => {
                navigate(`/posts/${post.id}`);
              }}
              className=" p-1.5 bg-zinc-900/50 w-fit rounded-lg  cursor-pointer hover:scale-105 transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2d3fc8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-square-pen-icon lucide-square-pen"
              >
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
              </svg>
            </span>
          </div>
        )}

        {/* Card content */}
        <div className="flex flex-col justify-between flex-1 px-4 py-4">
          <CardHeader className="p-0">
            {/* <div className="flex items-center justify-between gap-2"> */}
            <div className=" flex gap-1  mb-2.5">
              {post.post_categories.length > 0 &&
                post.post_categories.map((c, index) => (
                  <Badge key={index} className={categoriesStyles[index + 1]}>
                    {c.categories?.name}
                  </Badge>
                ))}
              {post.post_categories.length === 0 && (
                <Badge className={categoriesStyles[0]}>General</Badge>
              )}
            </div>
            {/* </div> */}

            <CardTitle className="text-white text-[17px] font-bold leading-snug">
              {post.title}
            </CardTitle>
            <CardDescription className="text-white/50 text-[13px] leading-relaxed mt-1">
              {post.content}
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex items-center justify-between pt-3 pb-0 px-0 border-0 bg-transparent">
            <div className="flex items-center gap-2.5">
              <img
                src={
                  post.profiles.avatar_url
                    ? post.profiles.avatar_url
                    : "./public/user.png"
                }
                alt={post.profiles.username}
                className="size-6 rounded-full object-cover"
              />
              <span className="text-[13px] text-white/75 font-medium">
                {post.profiles.username}
              </span>
            </div>
            <span className="text-xs text-white/40">{timeAgoValue}</span>
          </CardFooter>
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative mx-auto  bg-transparent overflow-hidden pt-0  border-white/8 rounded-xl ">
      {/* Card image */}
      <img
        src={post.image_url}
        alt="Post cover"
        className="w-lg object-cover grayscale brightness-50 rounded-b-xl"
      />

      {currentUser && (
        <div className="absolute flex gap-2 top-2 right-2">
          <AlertDialog className="bg-zinc-950">
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trash2-icon lucide-trash-2"
                >
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm" className="bg-zinc-900 text-muted">
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                  <Trash2Icon />
                </AlertDialogMedia>
                <AlertDialogTitle className="text-white">
                  Log Out?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this chat conversation. View
                  Settings delete any memories saved during this chat.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="bg-zinc-900 border-zinc-600">
                <AlertDialogCancel variant="outline" className="text-zinc-800">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={deletePost}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <span
            onClick={() => {
              navigate(`/posts/${post.id}`);
            }}
            className=" p-1.5 bg-zinc-900/50 w-fit rounded-lg  cursor-pointer hover:scale-105 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2d3fc8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-square-pen-icon lucide-square-pen"
            >
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
            </svg>
          </span>
        </div>
      )}

      <CardHeader className="p-0 ">
        {/* <div className="flex items-center justify-between gap-2 mb-2.5"> */}
        <div className=" flex gap-1  mb-2.5">
          {post.post_categories.length > 0 &&
            post.post_categories.map((c, index) => (
              <Badge key={index} className={categoriesStyles[index + 1]}>
                {c.categories?.name}
              </Badge>
            ))}
          {post.post_categories.length === 0 && (
            <Badge className={categoriesStyles[0]}>General</Badge>
          )}
        </div>
        {/* </div> */}

        <CardTitle className="text-white text-[17px] font-bold leading-snug">
          {post.title}
        </CardTitle>
        <CardDescription className="text-white/50 text-[13px] leading-relaxed mt-1">
          {post.content}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center justify-between pt-1 pb-4 px-0 border-0 bg-transparent">
        <div className="flex items-center gap-2.5">
          <img
            src={
              post.profiles.avatar_url
                ? post.profiles.avatar_url
                : "./public/user.png"
            }
            alt={post.profiles.username}
            className="size-6 rounded-full object-cover"
          />
          <span className="text-[13px] text-white/75 font-medium">
            {post.profiles.username}
          </span>
        </div>
        <span className="text-xs text-white/40">{timeAgoValue}</span>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
