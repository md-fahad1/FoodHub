"use client";

import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "Why Fresh Ingredients Matter in Every Dish",
    author: "Chef Fahad",
    date: "August 5, 2025",
    image: "blog3.jpeg",
    description:
      "Fresh ingredients not only boost the flavor of your meals, but also offer better nutrition and sustainability for the environment.",
  },
  {
    id: 2,
    title: "Top 5 Customer-Favorite Dishes This Month",
    author: "Manager Sarah",
    date: "August 2, 2025",
    image: "blog4.jpeg",
    description:
      "Explore the meals our customers love the most — featuring savory pasta, grilled rolls, and creamy desserts!",
  },
  {
    id: 3,
    title: "Behind the Scenes: A Day in Our Kitchen",
    author: "Team DreamChef",
    date: "July 28, 2025",
    image: "/blog1.jpeg",
    description:
      "Meet the chefs, see the process, and experience the passion that goes into every dish we serve.",
  },
];

const Blog = () => {
  return (
    <section className="px-4 md:px-12 py-14 bg-gray-50" id="blog">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[max(2vw,24px)] font-bold text-[#262626] mb-4">
          Blog & Stories
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-5">
                <p className="text-sm text-gray-400 mb-1">
                  By {post.author} • {post.date}
                </p>
                <h3 className="text-xl font-semibold text-gray-800 hover:text-tomato transition">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {post.description}
                </p>
                <div className="mt-4">
                  <button className="text-tomato font-medium text-sm hover:underline group flex items-center gap-1">
                    Read More
                    <span className="transform group-hover:translate-x-1 transition duration-200">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
