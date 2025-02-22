export default function InstagramReel() {
  const reelIds = ['DEx5DRKx7zT', 'C8ICTq0x5Tl', 'C9gCzr6xi9_', 'DAbqirfRQRE', 'DDNThB5SCvj', 'C_tNF2Yxl3n']; // IDs de los reels de Instagram

  return (
    <div className="overflow-x-auto whitespace-nowrap p-4">
      <div className="inline-flex space-x-4">
        {reelIds.map((reelId, index) => (
          <div key={index} className="inline-block">
            <iframe
              src={`https://www.instagram.com/p/${reelId}/embed`}
              width="320"
              height="480"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen={true}
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}