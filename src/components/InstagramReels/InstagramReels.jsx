import React from "react";

const InstagramReels = ({ reels }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {reels.map((reel, index) => (
        <div
          key={index}
          className="relative w-full h-64 bg-black rounded-lg overflow-hidden shadow-lg"
        >
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.instagram.com/reel/${reel.id}/embed`}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            title={`Instagram Reel ${index + 1}`}
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default InstagramReels;
