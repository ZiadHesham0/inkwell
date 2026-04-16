import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { createPost, editPost, getAllCategories, getPost } from "../services/posts.service";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Field, FieldLabel } from "@/components/ui/field";

function PostsForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [mode] = useState(id === "new" ? "add" : "edit");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    image_url: Yup.string()
      .url("Please enter a valid URL")
      .required("Image URL is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      image_url: "",
      author_id: user?.id,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const postData = {
          title: values.title,
          content: values.content,
          image_url: values.image_url,
          author_id: user?.id,
        };

        if (mode === "edit") {
          await editPost(id, postData, selectedCategories);
        } else {
          await createPost(postData, selectedCategories);
        }
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch post data if edit mode
  useEffect(() => {
    if (mode === "add") return;
    const handleGetPost = async () => {
      try {
        const data = await getPost(id);
        formik.setValues({
          title: data?.title,
          content: data?.content,
          image_url: data?.image_url,
          author_id: user?.id,
        });
        setImagePreview(data?.image_url);
        // Set existing categories
        console.log(data);
        
        const existingCatIds = data?.post_categories?.map(
          (pc) => pc.categories.id
        ) ?? [];
        setSelectedCategories(existingCatIds);
      } catch (err) {
        console.log(err);
      }
    };
    handleGetPost();
  }, [id]);

  // Auto preview image when URL changes
  useEffect(() => {
    if (formik.values.image_url) {
      setImagePreview(formik.values.image_url);
    } else {
      setImagePreview(null);
    }
  }, [formik.values.image_url]);

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="w-[75%] mx-auto py-10 px-4">
      {/* Header */}
      <div className="form-header mb-10">
        <span className="text-xs font-semibold tracking-widest text-indigo-400">
          DRAFT
        </span>
        <h1 className="font-black text-4xl mt-2 mb-3">
          {mode === "add" ? "Create New Post" : "Edit Post"}
        </h1>
        <p className="text-sm text-white/60 max-w-lg">
          Sculpt your thoughts into the digital monolith. Inkwell technical
          articles prioritize clarity, structure, and high-quality visuals.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">

        {/* Title */}
        <Field>
          <FieldLabel className="text-white/80">Post Title</FieldLabel>
          <Input
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="The Future of Distributed Systems..."
            className="bg-transparent border-zinc-700 focus:border-white py-5 text-white placeholder:text-zinc-600"
          />
          {formik.touched.title && formik.errors.title && (
            <span className="text-red-500 text-xs">{formik.errors.title}</span>
          )}
        </Field>

        {/* Image URL + Auto Preview */}
        <Field>
          <FieldLabel className="text-white/80">Image URL</FieldLabel>
          <Input
            name="image_url"
            value={formik.values.image_url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="https://images.unsplash.com/photo..."
            className="bg-transparent border-zinc-700 focus:border-white py-5 text-white placeholder:text-zinc-600"
          />
          {formik.touched.image_url && formik.errors.image_url && (
            <span className="text-red-500 text-xs">{formik.errors.image_url}</span>
          )}
          {/* Auto Preview */}
          {imagePreview && (
            <div className="relative mt-3 rounded-xl overflow-hidden border border-zinc-700">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-h-72 object-cover grayscale brightness-50"
                onError={() => setImagePreview(null)}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs tracking-widest text-white/50">
                IMAGE PREVIEW
              </span>
            </div>
          )}
        </Field>

        {/* Content */}
        <Field>
          <FieldLabel className="text-white/80">Post Content</FieldLabel>
          <Textarea
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Write your technical masterpiece here..."
            rows={8}
            className="bg-transparent border-zinc-700 focus:border-white text-white placeholder:text-zinc-600 resize-none"
          />
          {formik.touched.content && formik.errors.content && (
            <span className="text-red-500 text-xs">{formik.errors.content}</span>
          )}
        </Field>

        {/* Categories */}
        <Field>
          <FieldLabel className="text-white/80">Categories</FieldLabel>
          <div className="flex flex-wrap gap-2 mt-1">
            {categories.map((cat) => {
              const isSelected = selectedCategories.includes(cat.id);
              return (
                <Badge
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`cursor-pointer px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200
                    ${isSelected
                      ? "bg-white text-black hover:bg-white/80"
                      : "bg-transparent border border-zinc-600 text-zinc-400 hover:border-white hover:text-white"
                    }`}
                >
                  {cat.name}
                </Badge>
              );
            })}
          </div>
        </Field>

        {/* Submit */}
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-white text-black hover:bg-white/80 py-6 text-sm font-semibold tracking-wide cursor-pointer"
        >
          {formik.isSubmitting
            ? "Publishing..."
            : mode === "add"
            ? "Publish to Inkwell"
            : "Save Changes"}
        </Button>

      </form>
    </div>
  );
}

export default PostsForm;