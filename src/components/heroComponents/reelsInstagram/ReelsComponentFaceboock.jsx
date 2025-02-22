export default function ReelsComponentFaceboock() {
    const reelId = ['8907532939355470','8907532939355470']; // id de los reel de faceboock

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {reelId.map((url, index) => (
          <div key={index} className="flex justify-center">
            <iframe
            
              src={`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F${url}&width=500&show_text=false&appId=392084886626946&height=889`}
              width="800"
              height="400"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen={true}
              
            ></iframe>
          </div>
        ))}
      </div>
    );
  }
