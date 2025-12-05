// FocasLanding.jsx
import React, { useState, useEffect } from "react";
import { X, Play } from "lucide-react";
import SuccessStories from "./SuccessStories";
import Feedback from "./Feedback";
import RTI_Video from "../../public/videos/rtivideo.mp4"
import RTI_Pic from "../../public/images/RTIThumbnail.png"
import { loadRazorpayScript } from "../utils/razorpay";
import axios from "axios";

export default function FocasLanding() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
 const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    sro: "",
    caLevel: "",
    previousAttempt: "",
    rtiLink: "",
    locationOfResidence: "",
    paymentOption: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowWhatsapp(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  // 1️⃣ VALIDATION — Check required fields
  const requiredFields = [
    "name",
    "email",
    "phoneNumber",
    "sro",
    "caLevel",
    "previousAttempt",
    "rtiLink",
    "locationOfResidence",
    "paymentOption",
  ];

  const emptyFields = requiredFields.filter(
    (field) => !formData[field] || formData[field].trim() === ""
  );

  if (emptyFields.length > 0) {
    alert("Please fill all required fields");
    return;
  }

  // 2️⃣ LOAD RAZORPAY SCRIPT
  const res = await loadRazorpayScript();
  if (!res) return alert("Razorpay SDK failed to load");

  try {
    setIsSubmitting(true);

    // 3️⃣ CREATE ORDER
    const createOrderRes = await axios.post(
  `${apiUrl}/api/payment/rti/create-order`,
      formData
    );

    if (!createOrderRes.data.success) {
      setIsSubmitting(false);
      return alert("Failed to create order");
    }

    const { order, keyId, userData } = createOrderRes.data;

    // 4️⃣ OPEN RAZORPAY PAYMENT WINDOW
    const options = {
      key: keyId,
      amount: order.amount,
      currency: "INR",
      name: "CA Guru.AI",
      description: "RTI Payment",
      order_id: order.id,

      handler: async (response) => {
        try {
          // 5️⃣ VERIFY PAYMENT
          await axios.post(
            `${apiUrl}/api/payment/rti/verify-payment`,
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              formData: userData,
            }
          );

          alert("Payment Successful!");
          // 6️⃣ CLEAR FORM
          setFormData({
            name: "",
            email: "",
            phoneNumber: "",
            sro: "",
            caLevel: "",
            previousAttempt: "",
            rtiLink: "",
            locationOfResidence: "",
            paymentOption: "",
          });
              // ---- REDIRECT ----
      const redirectUrl = `https://focasedu.com/success?whatsapp_number=${encodeURIComponent(
        "91 " + formData.phoneNumber
      )}&level=${encodeURIComponent(formData.caLevel)}`;

      window.location.href = redirectUrl;
           
        } catch (error) {
          console.error(error);
          alert("Error verifying payment");
        }
      },

      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phoneNumber,
      },

      theme: { color: "#4f46e5" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    alert("Something went wrong!");
  }

  setIsSubmitting(false);
};





  const benefits = [
    {
      icon: "https://focasedu.com/wp-content/themes/edumodo/images/images/Icon-Hand-On.webp",
      title: "Complete Breakdown of Every Answer",
      description:
        "How the examiner likely evaluated it, mark-by-mark.",
    },
    {
      icon: "https://focasedu.com/wp-content/themes/edumodo/images/images/Icon-Learning.webp",
      title: "Identification of Mistakes & Missed Marks",
      description:
        "Spotting areas where marks could have been improved.",
    },
    {
      icon: "https://focasedu.com/wp-content/themes/edumodo/images/images/Icon-Expert-Guidance.webp",
      title: "Presentation & Structure Feedback",
      description:
        "Because half the marks in CA exams come from how you present.",
    },
    {
      icon: "https://focasedu.com/wp-content/themes/edumodo/images/images/Icon-Creative.webp",
      title: "Next-Attempt Strategy",
      description:
        "Paper-wise 15–20 day improvement plan to recover lost marks.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Header Logo */}
      <div className="flex justify-center pt-6 pb-4 px-4">
        <img
          src="https://focasedu.com/wp-content/uploads/2024/02/Focus-logo-tagline-01-1-1.png"
          alt="Logo"
          className="h-16 md:h-20 max-w-full"
        />
      </div>

      {/* Hero Section */}
      <section className="px-4 md:px-6 lg:px-8 py-8 md:py-12 bg-gray-100 rounded-lg mx-2 md:mx-4 lg:mx-8 mb-20 lg:mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {/* Limited Seats Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 md:px-6 py-3 mb-6 md:mb-8">
              <h3 className="text-xs md:text-sm font-semibold text-blue-800">
                Limited Seats : 100 Students Only
              </h3>
              <img
                src="https://focasedu.com/wp-content/themes/edumodo/images/images/fire.webp"
                alt="Fire"
                className="h-3 md:h-4"
              />
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
            
             <span>Get Your Certified Copies <br /> 
             <span className="font-large text-blue-500">Personally Reviewed</span> by a CA </span> <br />
             
            </h1>

            {/* Description */}
            <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-8 md:mb-10">
              FOCAS Personalised Fastrack Classes are designed for CA aspirants
              who want efficient preparation without compromising on quality.
              With a unique 1 tutor for every 10 students ratio, we ensure every
              student receives personalized attention and doubt resolution.
            </p>

            {/* Video Section */}
            <div className="mb-8 md:mb-12">
              <div className="flex items-center gap-3 md:gap-6 mb-8 md:mb-10 flex-wrap">
                <div className="flex gap-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
                    <img
                      src="https://focasedu.com/wp-content/themes/edumodo/images/images/Mari%20Muthu.jpg"
                      alt="Student"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
                    <img
                      src="https://focasedu.com/wp-content/themes/edumodo/images/images/Mohanapriyadharsini.jpg"
                      alt="Student"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
                    <img
                      src="https://focasedu.com/wp-content/themes/edumodo/images/images/sri%20devi.jpeg"
                      alt="Student"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <img
                    src="https://focasedu.com/wp-content/themes/edumodo/images/images/five-stars.svg"
                    alt="Stars"
                    className="h-5 md:h-6 mb-1 md:mb-2"
                  />
                  <p className="text-xs md:text-sm">
                    <strong>4.9</strong> Ratings by Students ⭐
                  </p>
                </div>
              </div>

              {/* Video Player */}
<div
  className="relative rounded-lg md:rounded-xl overflow-hidden group cursor-pointer"
  onClick={() => setIsVideoPlaying(true)}
>
  <img
    src={RTI_Pic}
    alt="Thumbnail"
    className="w-full h-full object-cover block"
  />

  <button className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition">
    <div className="bg-black bg-opacity-70 text-white rounded-full p-3 md:p-4">
      <Play size={28} />
    </div>
  </button>
</div>


              {isVideoPlaying && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-3 sm:p-4">
                  <div className="bg-white rounded-lg max-w-4xl w-full">
                    <div className="flex justify-end p-3 md:p-4">
                      <button
                        onClick={() => setIsVideoPlaying(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    <div className="px-3 pb-4 md:px-4 md:pb-6">
                      <video
                        src={RTI_Video}
                        controls
                        autoPlay
                        className="w-full h-auto max-h-[80vh] rounded-lg object-contain bg-black"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <img
                src="https://focasedu.com/wp-content/themes/edumodo/images/images/Kit-Certificate-Icon.svg"
                alt="Certificate"
                className="h-5 md:h-6"
              />
              <h3 className="text-base md:text-lg font-semibold">
               70% Students Improved Their Next Attempt
              </h3>
            </div>

            {/* Course Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="bg-blue-50 p-3 md:p-4 rounded-lg text-center">
                <h4 className="text-gray-400 text-xs md:text-sm">Mode</h4>
                <p className="font-semibold text-gray-800 text-sm md:text-base">
                  Recorded Video by a CA
                </p>
              </div>
              <div className="bg-blue-50 p-3 md:p-4 rounded-lg text-center">
                <h4 className="text-gray-400 text-xs md:text-sm">
                  Delivery
                </h4>
                <p className="font-semibold text-gray-800 text-sm md:text-base">
                  Question Wise Report in 7-10 days
                </p>
              </div>
              <div className="bg-blue-50 p-3 md:p-4 rounded-lg text-center">
                <h4 className="text-gray-400 text-xs md:text-sm">Language</h4>
                <p className="font-semibold text-gray-800 text-sm md:text-base">
                  English
                </p>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
                Question-Wise Report + Personal Video Review
              </h3>
              <h5 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                Make this Your Last Attempt
              </h5>
             {/*  <p className="text-sm md:text-base text-gray-700 mb-4">
                <strong>FOCAS Personalised CA Coaching</strong> combines
                expert-led classes, hands-on practice, and a unique{" "}
                <strong>1 tutor for every 10 students</strong> approach to
                ensure personalized guidance and accountability. Our{" "}
                <strong>'Study as you Learn' method</strong> integrates concept
                clarity with real-time practice, making you exam-ready within
                the class duration. Whether you're mastering fundamentals or
                tackling advanced topics, FOCAS equips you with the skills,
                confidence, and strategies to succeed in your CA journey. Make
                this <strong>Your Last Attempt!</strong>
              </p> */}
              <p className="text-sm md:text-base text-gray-700 mb-4">
                Every CA student deserves clarity on how their answers were evaluated.
But Certified Copies (RTIs) PDFs alone don’t tell you: 

 <li className="flex items-center gap-2"> ✓ Why marks were reduced Where presentation went wrong</li>

 <li className="flex items-center gap-2">✓ Which parts were correct but not awarded</li>

<li className="flex items-center gap-2">✓ What you must fix immediately for your next attempt</li>


That’s why we created CA-Led Personal Video Reviews — a step-by-step explanation of your certified copies so you finally understand exactly what went right and what didn’t.
              </p>


            </div>

           

            {/* Why Choose FOCAS */}
            <div className="mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                What You Get in the Personal Video Review ?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {benefits.map((benefit, idx) => (
                  <div key={idx}>
                    <img
                      src={benefit.icon}
                      alt={benefit.title}
                      className="h-10 md:h-12 mb-3 md:mb-4"
                    />
                    <h4 className="text-base md:text-lg font-bold mb-2 text-gray-800">
                      {benefit.title}
                    </h4>
                    <p className="text-sm md:text-base text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials Carousel */}
            <Feedback />

            {/* Success Stories (Video Cards) */}
            <SuccessStories />

            {/* CTA Section */}
            <div className="bg-blue-600 text-white rounded-lg p-4 md:p-8 mb-4 md:mb-8">
              <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 leading-snug">
             <span className="flex items-center justify-center"> Get Your Certified Copies Personally Reviewed by a CA</span>
              </h2>
              <button
                onClick={() => setIsPopupOpen(true)}
                className="w-full bg-white text-blue-600 font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-gray-100 transition text-sm md:text-base"
              >
                Book My Video Review Now
              </button>
            </div>
          </div>

          {/* Right Sidebar - Fixed Box (Hidden on Mobile) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-1 mb-4 text-sm">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-red-600 font-semibold">Video Review</span>
              </div>

              <h3 className="text-lg font-bold mb-4">
                Limited Spots : 100 Students ONLY
              </h3>
              <p className="text-sm mb-4">
                <strong>70%</strong>{" "}
                <span className="text-gray-500">Students Improved Their Next Attempt ⭐</span>
              </p>

              <button
                onClick={() => setIsPopupOpen(true)}
                className="w-full bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-6 hover:bg-blue-800 transition"
              >
               Book My Video Review Now
              </button>

              <h4 className="font-bold mb-3">Benefits for Students</h4>
              <ul className="space-y-2 text-sm">
                <li>✓ Personalised Review by a CA – Not a Generic Template</li>
                <li>✓ Boosted Performance for the Next Attempt</li>
                <li>✓ Complete Transparency on Evaluation</li>
                <li>✓ Time-Saving</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile CTA Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg z-40">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition text-sm"
        >
          Enroll Now - Limited Spots
        </button>
      </div>

      {/* WhatsApp Button */}
      {showWhatsapp && (
        <a
          href="https://wa.me/+916383514285"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 bg-green-500 hover:bg-green-600 rounded-full p-3 md:p-4 shadow-lg transition-transform hover:scale-110 z-40"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-6 h-6 md:w-8 md:h-8"
          />
        </a>
      )}

      {/* Popup Modal */}
     {isPopupOpen && (
  <div
    className="fixed inset-0 bg-white/10 backdrop-blur-md z-50 flex items-start justify-center p-4 overflow-y-auto animate-fadeIn"
  >
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md mx-auto my-12 animate-scaleIn">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold">Enter Details</h2>
        <button
          onClick={() => setIsPopupOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={26} />
        </button>
      </div>

      {/* FORM */}
      <form className="space-y-5" onSubmit={handleSubmit}>

        {/* Name */}
        <div>
          <label className="block text-sm font-bold mb-2.5">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-2.5"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-bold mb-2.5">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-2.5"
          />
        </div>

        {/* WhatsApp Number */}
        <div>
          <label className="block text-sm font-bold mb-2.5">WhatsApp Number</label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Enter 10-digit WhatsApp number"
            value={formData.phoneNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) {
                setFormData((prev) => ({ ...prev, phoneNumber: value }));
              }
            }}
            maxLength={10}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-2.5"
          />
        </div>

        {/* SRO */}
        <div>
          <label className="block text-sm font-bold mb-2.5">SRO Number</label>
          <input
            type="text"
            name="sro"
            placeholder="Enter SRO number"
            value={formData.sro}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-2.5"
          />
        </div>

        {/* CA Level */}
        <div>
          <label className="block text-sm font-bold mb-2.5">CA Level</label>
          <select
            name="caLevel"
            value={formData.caLevel}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-2.5"
          >
            <option value="">Select Level</option>
            <option value="CA Foundation">CA Foundation</option>
            <option value="CA Intermediate">CA Intermediate</option>
            <option value="CA Final">CA Final</option>
          </select>
        </div>

        {/* Previous Attempt */}
        <div>
          <label className="block text-sm font-bold mb-3">Previous Attempt?</label>
          <div className="space-y-2.5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="previousAttempt"
                value="Yes"
                checked={formData.previousAttempt === "Yes"}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span className="text-sm">Yes</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="previousAttempt"
                value="No"
                checked={formData.previousAttempt === "No"}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span className="text-sm">No</span>
            </label>
          </div>
        </div>

        {/* RTI Link */}
        <div>
          <label className="block text-sm font-bold mb-2.5">Certified Copy (RTI) Link</label>
          <input
            type="text"
            name="rtiLink"
            placeholder="Paste Google Drive link"
            value={formData.rtiLink}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-2.5"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-bold mb-2.5">Location of Residence</label>
          <input
            type="text"
            name="locationOfResidence"
            placeholder="Enter your city"
            value={formData.locationOfResidence}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-2.5"
          />
        </div>

        {/* Payment Option */}
        <div>
          <label className="block text-sm font-bold mb-3">Payment Option</label>
          <select
            name="paymentOption"
            value={formData.paymentOption}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-2.5"
          >
            <option value="">Select Payment Type</option>
            <option value="PER_PAPER">Per Paper - ₹199</option>
            <option value="PER_GROUP">Per Group - ₹499</option>
            <option value="BOTH_GROUPS">Both Groups - ₹799</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

    </div>
  </div>
)}

    </div>
  );
}
