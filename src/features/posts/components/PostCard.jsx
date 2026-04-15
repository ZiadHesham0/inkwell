import { useMemo } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";

const timeAgo = (date) => {
  if (!date) return "";
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

function PostCard({ post, variant = "grid" }) {
  const categoriesStyles = [
    " bg-blue-950 text-blue-300 px-2 py-1 rounded-xl text-xs",
    "bg-green-950 text-green-300 px-3 py-1 rounded-xl text-xs",
    "bg-yellow-950 text-yellow-300 px-3 py-1 rounded-xl text-xs",
    "bg-purple-950 text-purple-300 px-3 py-1 rounded-xl text-xs",
    "bg-red-950 text-red-300 px-3 py-1 rounded-xl text-xs",
    "bg-pink-950 text-pink-300 px-3 py-1 rounded-xl text-xs",
    " bg-sky-950 text-sky-300 px-3 py-1 rounded-xl text-xs",
  ];

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
    <Card className="relative mx-auto  bg-transparent overflow-hidden pt-0  border-white/8 rounded-xl">
      {/* Card image */}
      <img
        src={post.image_url}
        alt="Post cover"
        className="w-lg object-cover grayscale brightness-50 rounded-b-xl"
      />

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
