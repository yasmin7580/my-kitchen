"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const SubmitForm = ({ children }) => {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const form = e.target;
            const formData = new FormData(form);

            const recipe = Object.fromEntries(formData);

            // Upload image
            const imageData = new FormData();
            imageData.append("image", recipe.image);

            const { data } = await axios.post(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_BB_API_KEY}`,
                imageData
            );

            recipe.image = data.data.url;

            // Add logged-in user information
            recipe.userEmail = session?.user?.email;
            recipe.userName = session?.user?.name;
            recipe.userId = session?.user?.id;

            await axios.post("https://my-kitchen-server-mu.vercel.app/recipes", recipe);

            router.push("/all-recipe");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="rounded-3xl border border-[#dfe5d9] bg-white p-5 shadow-sm sm:p-8"
        >
            {children}
        </form>
    );
};

export default SubmitForm;