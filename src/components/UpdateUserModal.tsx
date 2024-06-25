import React, { useState } from "react";
import { UpdateUserRequest, UpdateUserResponse, User } from "../type/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/user.api";
import { Spinner } from "./Spinner";

interface UpdateUserModalProps {
  user: User;
  isOpen: boolean;
  onClose: (user: UpdateUserResponse) => void;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  // const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [fullName, setFullName] = useState<string>(user.fullName || "");
  const [email, setEmail] = useState<string>(user.email || "");
  const [bio, setBio] = useState<string>(user.bio || "");
  const initialUserData: UpdateUserRequest = {
    fullName: user.fullName,
    email: user.email,
    bio: user.bio,
  };
  const queryClient = useQueryClient();
  const updateUserMutation = useMutation({
    mutationFn: ({
      id,
      userRequest,
    }: {
      id: string;
      userRequest: UpdateUserRequest;
    }) => updateUser(id, userRequest),
    onSuccess: (user: UpdateUserResponse) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setFullName("");
      setEmail("");
      setBio("");
      onClose(user);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("bro");
    e.preventDefault();
    const userRequest: UpdateUserRequest = {
      fullName,
      email,
      bio,
    };

    updateUserMutation.mutate({ id: user.id, userRequest });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={() => onClose(initialUserData)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              id="bio"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
            ></textarea>
          </div>
          {/* <div className="mb-4">
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              className="mt-1 block w-full"
              onChange={(e) =>
                setProfilePicture(e.target.files ? e.target.files[0] : null)
              }
            />
          </div> */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              {updateUserMutation.isPending ? <Spinner /> : "Save"}
            </button>
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
              onClick={() => onClose(initialUserData)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
