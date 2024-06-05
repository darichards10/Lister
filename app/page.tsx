'use client'
import React from 'react';

export default function Home() {

  return (
    <div className="bg-black min-h-screen text-white">
      <main className="container mx-auto px-4 py-10">
        <section className="text-center mb-12">
          <p className="mt-4 text-lg">
            The perfect tool for organizing your life. Whether you need to create a to-do list, manage projects, or share shopping lists, Lister makes it simple and intuitive.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example of Feature Cards */}
          <div className="bg-dark p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-orange">Create Lists</h3>
            <p className="mt-2">
              Easily create lists for any purpose. Add, edit, and remove items as you need.
            </p>
          </div>

          <div className="bg-dark p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-orange flex items-center">
              Edit Lists
              <span className="ml-2 text-sm text-darkest-orange px-2 py-1 rounded">Coming Soon</span>
            </h3>
            <p className="mt-2">
              Update your lists on the go. Lister&apos;s intuitive interface makes list management a breeze.
            </p>
          </div>

          <div className="bg-dark p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-orange flex items-center">
              Delete Lists
            </h3>
            <p className="mt-2">
              Keep your lists organized by deleting old or unnecessary lists quickly.
            </p>
          </div>

          <div className="bg-dark p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-orange flex items-center">
              Share Lists
              <span className="ml-2 text-sm text-darkest-orange px-2 py-1 rounded">Coming Soon</span>
            </h3>
            <p className="mt-2">
              Share your lists with others, whether they&apos;re private or public. Collaboration made easy.
            </p>
          </div>

          <div className="bg-dark p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-orange flex items-center">
              Privacy
              <span className="ml-2 text-sm text-darkest-orange px-2 py-1 rounded">Coming Soon</span>
            </h3>           
            <p className="mt-2">
              Manage your privacy settings and decide who can view or edit your lists.
            </p>
          </div>

          <div className="bg-dark p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-orange">Cross-Platform</h3>
            <p className="mt-2">
              Access your lists from any device. Lister works seamlessly on mobile, tablet, and desktop.
            </p>
          </div>
        </section>

        <section className="text-center mt-12">
          <h2 className="text-3xl font-semibold text-dark-orange">Get Started Today</h2>
          <p className="pt-4 pb-8 text-lg">
            Sign up now and take the first step towards better organization and productivity.
          </p>
          <a href="/api/auth/login" className="mt-8 px-8 py-3 bg-orange text-dark font-semibold rounded-lg hover:bg-dark-orange transition duration-300">
            Sign Up
          </a>
        </section>
      </main>
    </div>
  );
}
