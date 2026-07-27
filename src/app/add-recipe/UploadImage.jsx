"use client"
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const UploadImage = () => {
    const [imageUrl, setImageUrl] = useState()
    const handleImage = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const url = URL.createObjectURL(file)
        setImageUrl(url)



    }
    return (
        <div className="md:col-span-2">
            <label htmlFor="image" className="mb-2 block font-semibold text-[#1f2f17] text-center">Recipe image</label>
            {
                imageUrl? 
                <Image src={imageUrl} alt="" height={500} width={500} className='object-cover rounded-md mx-auto'/>
                :
                <label htmlFor="image" className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#b8c9aa] mx-auto bg-[#f8fbf5] px-5 py-8 h-70 w-125 text-center transition hover:border-[#54920f] hover:bg-[#eff7e9]">
                    <span className="mb-3 grid h-11 w-11 place-items-center rounded-full bg-[#54920f] text-white"><ImagePlus size={21} /></span>
                    <span className="font-semibold text-[#1f2f17]">Upload a mouth-watering photo</span>
                    <span className="mt-1 text-sm text-[#778270]">PNG, JPG or WEBP up to 5MB</span>
                </label>
            }
            <input onChange={handleImage} id="image" name="image" type="file" accept="image/png,image/jpeg,image/webp" required className="sr-only" />
        </div>

    );
};

export default UploadImage;