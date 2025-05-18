"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Instagram } from "lucide-react";

export default function InstagramSection() {
  const [instaFeed] = useState([
    {
      image: `${process.env.NEXT_PUBLIC_CDN_URL}/insta01.png`,
      link: "https://www.instagram.com/p/DIoW4DAhBKE/",
    },
    {
      image: `${process.env.NEXT_PUBLIC_CDN_URL}/insta02.png`,
      link: "https://www.instagram.com/p/DIly2SjRiNh/",
    },
    {
      image: `${process.env.NEXT_PUBLIC_CDN_URL}/insta03.png`,
      link: "https://www.instagram.com/p/DIjapyIIxLs/?img_index=1",
    },
  ]);

  return (
    <div>
      {/* Section Title */}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="mb-2 md:text-3xl text-2xl font-bold sm:text-4xl">
          Nexibles On Instagram
        </h2>
        <p className="mb-8 text-gray-smartest-600">#Nexibles</p>
      </div>

      {/* Instagram Feed - Grid layout */}
      <div className="max-w-3xl mx-auto grid grid-cols-3 mb-12 gap-[0.2px]">
        {instaFeed.map((post, idx) => (
          <a
            key={idx}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block overflow-hidden group aspect-square"
          >
            <Image
              src={post.image}
              alt={`Instagram Post ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 33vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/50 group-hover:opacity-100">
              <Instagram size={24} className="w-6 h-6 text-white sm:w-12 sm:h-12" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}