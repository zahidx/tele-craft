"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import {
  PlayCircle,
  PenTool,
  Users,
  Book,
  Star,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

// Sample AI-Generated Stories
const stories = [
  {
    title: "The Shadow Realm",
    description: "Unravel secrets in a forbidden world beyond time.",
    image: "/images/story1.jpg",
  },
  {
    title: "Neon Cyberpunk",
    description: "A future where AI controls the metropolis.",
    image: "/images/story2.jpg",
  },
  {
    title: "Echoes of the Past",
    description: "Time travel meets historical mysteries.",
    image: "/images/story3.jpg",
  },
];

// AI Story Discovery Simulation
const generateStory = () => {
  const titles = ["Celestial Voyage", "Code Apocalypse", "The Forgotten Realm"];
  const descriptions = [
    "A journey across galaxies to uncover ancient civilizations.",
    "A future where AI rebels against humanity.",
    "A secret world hidden in lost history books.",
  ];
  return {
    title: titles[Math.floor(Math.random() * titles.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    image: `/images/story${Math.floor(Math.random() * 3) + 1}.jpg`,
  };
};

export default function Home() {
  const { theme } = useTheme();
  const [aiStory, setAiStory] = useState(generateStory);

  // Initialize AOS inside the component
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });

    const interval = setInterval(() => {
      setAiStory(generateStory());
    }, 5000);

    return () => clearInterval(interval); // Clear interval on cleanup
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      
      {/* Hero Section */}
      <section
        className="relative w-full h-[90vh] flex items-center justify-center text-center bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-800 dark:to-gray-900"
        data-aos="fade-up"
      >
        <motion.div className="max-w-3xl mx-auto">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
            <span className="bg-gradient-to-r from-yellow-300 to-orange-500 text-transparent bg-clip-text">
              TeleCraft
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Explore AI-powered stories, immerse in digital adventures.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/create">
              <button
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl shadow-md transition"
                data-aos="zoom-in"
              >
                <PenTool className="inline-block w-5 h-5 mr-2" />
                Start Writing
              </button>
            </Link>
            <Link href="/interactive">
              <button
                className="px-6 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-xl shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                data-aos="zoom-in"
              >
                <PlayCircle className="inline-block w-5 h-5 mr-2" />
                Interactive Mode
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* AI Story Discovery */}
      <section className="py-16 text-center" data-aos="fade-up">
        <h2 className="text-4xl font-bold">AI Story Discovery</h2>
        <motion.div
          className="mt-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-semibold">{aiStory.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{aiStory.description}</p>
        </motion.div>
      </section>

      {/* Story Preview Carousel */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800" data-aos="fade-left">
        <h2 className="text-4xl font-bold text-center">Live Story Previews</h2>
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1.2}
          pagination={{ clickable: true }}
          className="mt-6 max-w-5xl mx-auto"
        >
          {stories.map((story, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg"
              >
                <img src={story.image} alt={story.title} className="w-full h-52 object-cover rounded-md" />
                <h3 className="text-xl font-semibold mt-4">{story.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{story.description}</p>
                <Link href="/story">
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                    Read More <ChevronRight className="inline-block w-5 h-5 ml-1" />
                  </button>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Stats Section */}
      <section className="py-16" data-aos="fade-up">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold">Community Stats</h2>
          <div className="mt-8 flex justify-center gap-12">
            <div className="text-center" data-aos="flip-up">
              <Users className="w-12 h-12 mx-auto text-blue-500" />
              <p className="text-xl font-semibold mt-2">50K+ Users</p>
            </div>
            <div className="text-center" data-aos="flip-up">
              <Book className="w-12 h-12 mx-auto text-green-500" />
              <p className="text-xl font-semibold mt-2">120K+ Stories</p>
            </div>
            <div className="text-center" data-aos="flip-up">
              <Star className="w-12 h-12 mx-auto text-yellow-500" />
              <p className="text-xl font-semibold mt-2">4.8/5 Ratings</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
