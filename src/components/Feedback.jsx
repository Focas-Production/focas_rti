import React, { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const testimonials = [
  {
    student: "Yashika",
    batch: "2024",
    Userimage: "images/Testimonial/Yakshika.jpeg",
    feedback:
      "The method of teaching followed by FOCAS Academy is perfect. I was able to score 82 just by enrolling in their fasttrack – imagine how their regular course would be!",
  },
  {
    student: "Aravindha Lochanan",
    batch: "2023",
    Userimage: "/images/Testimonial/Aravind lochan.jpg",
    feedback:
      "Best mentorship with coaching for struggling students with last minute pending syllabus and repeaters. My friends also greatly benefited from these individual-attention batches. Join FOCAS, make it your last attempt.",
  },
  {
    student: "Mercy",
    batch: "2025",
    Userimage: "images/Testimonial/Mercy.jpeg",
    feedback:
      "Really happy and satisfied with the tutors. The way of teaching here is enough and effective. The Deep FOCAS group gave me the confidence I was always looking for.",
  },
  {
    student: "Naveen",
    batch: "2023",
    Userimage: "images/Testimonial/Naveen.jpeg",
    feedback:
      "I was able to complete preparation in class itself because it was live studying with no procrastination. Doubts were cleared then and there, and cumulative revisions helped me recall in the exams.",
  },
  {
    student: "Jagadeesh",
    batch: "2025",
    Userimage: "images/Testimonial/Jagadeesh.jpeg",
    feedback:
      "FOCAS helped me study in the best possible way. Their tutor sessions helped me get out of the vicious circle of Audit. I even thought of quitting CA, but because of them, I could study again. Thanks FOCAS team!",
  },
];

const TestimonialCard = ({ student, batch, Userimage, feedback }) => {
  return (
    <div className="w-full max-w-2xl bg-white border border-black rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row gap-5 sm:gap-7 items-stretch mx-auto">
      {/* Bigger Image */}
      <div className="w-full sm:w-2/5 flex-shrink-0">
        <img
          src={Userimage}
          alt={student}
          className="w-full h-52 sm:h-72 lg:h-80 object-cover rounded-xl border border-black"
        />
      </div>

      {/* Text */}
      <div className="flex-1 flex flex-col justify-between gap-4">
        <img
          src="/images/quote.png"
          alt=""
          className="w-10 sm:w-12 lg:w-14 object-contain hidden sm:block"
        />
        <p className="text-xs sm:text-sm lg:text-sm leading-relaxed text-gray-700">
          {feedback}
        </p>
        <div className="mt-2">
          <h2 className="font-bold text-base sm:text-lg lg:text-xl mb-1">
            {student}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-1">{batch} Batch</p>
          <p className="text-sm sm:text-base">⭐⭐⭐⭐⭐</p>
        </div>
      </div>
    </div>
  );
};

const Feedback = () => {
  // one-by-one slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    setCurrentIndex((prev) =>
      prev < testimonials.length - 1 ? prev + 1 : prev
    );
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <h1 className="w-full text-center text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4 sm:mt-5">
        What Our Students Say
      </h1>

      <div className="w-full mt-4 sm:mt-6 py-8 sm:py-10 relative">
        {/* Slider wrapper */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              // each slide is 100% width, move 1 by 1
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 flex justify-center"
              >
                <TestimonialCard
                  student={t.student}
                  batch={t.batch}
                  Userimage={t.Userimage}
                  feedback={t.feedback}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center mt-6 sm:mt-8 space-x-4">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 disabled:opacity-40 disabled:hover:scale-100 focus:outline-none bg-[#a5ffaa] cursor-pointer border border-black border-b-4 shadow-lg"
            type="button"
          >
            <HiChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex === testimonials.length - 1}
            className="rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 disabled:opacity-40 disabled:hover:scale-100 focus:outline-none bg-[#a5ffaa] cursor-pointer border border-black border-b-4 shadow-lg"
            type="button"
          >
            <HiChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-3 gap-2">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === currentIndex ? "bg-gray-800" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;