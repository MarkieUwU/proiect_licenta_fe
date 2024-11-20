// src/components/CreatePostModal.tsx
import React, { ReactNode, useState } from "react";
import { Post, PostRequest } from "../models/post.models";
import { User } from "@/pages/ProfilePage/models/user.models";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreatePost, useUpdatePost } from "../hooks/post.hooks";
import { DialogClose } from "@/components/ui/dialog";

interface PostModalProps {
  post?: Post;
  user: User;
  onClose?: () => void;
  children: ReactNode;
}

const schema = yup.object({
  content: yup.string().required("The content is required").min(5),
});

const PostModal: React.FC<PostModalProps> = ({
  onClose,
  user,
  post,
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const content = watch("content");

  const onSubmit = handleSubmit(() => {
    setLoading(true);
    const postRequest: PostRequest = {
      content,
    };

    if (post) {
      updatePostMutation.mutate({ id: post.id, postRequest });
    }
    if (user) {
      createPostMutation.mutate({ userId: user.id, postRequest });
    }
    onClose();
  });

  return (
    <Modal
      trigger={children}
      title={post ? "Update Post" : "Create New Post"}
      content={
        <form>
          <textarea
            className="w-full p-2 border rounded"
            placeholder="What's on your mind?"
            rows={4}
            {...register("content")}
          ></textarea>
          {createPostMutation.isError && (
            <p className="text-red-500 mb-4">
              Failed to create post. Please try again.
            </p>
          )}
          {errors.content && (
            <p className="text-red-500">{errors.content?.message}</p>
          )}
        </form>
      }
      footerContent={
        <>
          <DialogClose>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={createPostMutation.isPending || !!errors.content}
            loading={loading}
            onClick={onSubmit}
          >
            {post ? "Create" : "Save"}
          </Button>
        </>
      }
    ></Modal>
  );
};

export default PostModal;
