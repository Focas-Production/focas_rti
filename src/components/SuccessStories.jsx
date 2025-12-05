import React, { useEffect, useState } from "react";
import { IoPlay, IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";

const stories = [
  {
    name: "Gayathri",
    certificate: "images/certificate.png",
    video: "videos/Successful stories/Gayathri.mp4",
  },
  {
    name: "Harini Aiswariya",
    certificate: "images/certificate.png",
    video: "videos/Successful stories/Harini Aiswariya.mp4",
  },
  {
    name: "Jeshurun",
    certificate: "images/certificate.png",
    video: "videos/Successful stories/Jeshurun.mp4",
  },
  {
    name: "Marimuthu",
    certificate: "images/certificate.png",
    video: "videos/Successful stories/Marimuthu.mp4",
  },
  {
    name: "Sai shruthi",
    certificate: "images/certificate.png",
    video: "videos/Successful stories/Sai shruthi.mp4",
  },
  {
    name: "Sridevi",
    certificate: "images/certificate.png",
    video: "videos/Successful stories/Sridevi.mp4",
  },
];

const SuccessStories = () => {
  const [itemsPerPage, setItemsPerPage] = useState(1); // 1 on mobile, 2 on desktop
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Decide how many videos per page based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setItemsPerPage(2); // md and above → 2 videos in a slide
      } else {
        setItemsPerPage(1); // mobile → 1 video
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Group stories into pages
  const pages = [];
  for (let i = 0; i < stories.length; i += itemsPerPage) {
    pages.push(stories.slice(i, i + itemsPerPage));
  }

  const totalPages = pages.length;

  const goNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const goPrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const openVideo = (videoUrl) => setSelectedVideo(videoUrl);
  const closeVideo = () => setSelectedVideo(null);

  return (
    <section className="w-full mt-5 py-10 md:py-16">
      {/* Title */}
      <div className="text-center mt-10 md:my-16 px-4">
        <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
          Inspiring Student Stories
        </h2>
      </div>

      {/* Slider */}
      <div className="w-full px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {pages.map((page, pageIndex) => (
              <div
                key={pageIndex}
                className="w-full flex-shrink-0 flex flex-col md:flex-row gap-6 justify-center items-stretch"
              >
                {page.map((story, idx) => (
                  <div
                    key={`${pageIndex}-${idx}`}
                    className="relative bg-black rounded-2xl overflow-hidden 
                               w-full md:w-1/2 
                               h-[230px] sm:h-[260px] md:h-[300px] 
                               cursor-pointer shadow-xl"
                    onClick={() => openVideo(story.video)}
                  >
                    {/* Video Preview */}
                    <video
                      src={story.video}
                      className="w-full h-full object-cover opacity-90"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-white bg-opacity-90 rounded-full p-3 md:p-4 shadow-2xl">
                        <IoPlay className="w-6 h-6 md:w-7 md:h-7 text-gray-900" />
                      </div>
                    </div>

                    {/* Name & Label */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-white font-bold text-lg md:text-xl text-center">
                        {story.name}
                      </h3>
                      <p className="text-gray-300 text-xs md:text-sm text-center">
                        Success Story
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-6 md:mt-8">
            <button
              onClick={goPrev}
              disabled={currentPage === 0}
              className="rounded-full p-3 md:p-4 bg-[#a5ffaa] border border-black border-b-4 shadow-lg 
                         transition-all duration-300 hover:scale-110 disabled:opacity-40 disabled:hover:scale-100"
            >
              <IoChevronBack className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={goNext}
              disabled={currentPage === totalPages - 1}
              className="rounded-full p-3 md:p-4 bg-[#a5ffaa] border border-black border-b-4 shadow-lg 
                         transition-all duration-300 hover:scale-110 disabled:opacity-40 disabled:hover:scale-100"
            >
              <IoChevronForward className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-3 gap-2">
            {pages.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i === currentPage ? "bg-gray-800" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-md flex items-center justify-center z-50 p-2 md:p-4"
          onClick={closeVideo}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden mx-2 md:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-3 md:p-4 border-b border-gray-200">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                Success Story
              </h3>
              <button
                onClick={closeVideo}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                aria-label="Close video"
              >
                <IoClose className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            <div className="relative bg-black">
              <video
                src={selectedVideo}
                className="w-full h-auto max-h-[75vh] md:max-h-[80vh] object-contain"
                controls
                autoPlay
                preload="metadata"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SuccessStories;