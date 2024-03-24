"use client";
//ChatGPT helped add sendEmail functionality

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
var oneTime = 1;

export default function Mailing() {
  const form = useRef<HTMLFormElement>(null);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "loading" | "success" | "error" | "oneTime"
  >("idle");
  const validateForm = () => {
    if (form.current) {
      const formData = new FormData(form.current);
      if (
        !formData.get("user_name") ||
        !formData.get("user_email") ||
        !formData.get("subject") ||
        !formData.get("message")
      ) {
        alert("Please fill out all required fields.");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.get("user_email") as string)) {
        alert("Please enter a valid email address.");
        return false;
      }
      return true;
    }
    return false;
  };
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmissionStatus("loading");

    if (form.current) {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey && oneTime == 1) {
        console.log("success, oneTime: ", oneTime);
        emailjs
          .sendForm(serviceId, templateId, form.current, {
            publicKey,
          })
          .then(
            () => {
              console.log("SUCCESS!");
              setSubmissionStatus("success");
            },
            (error: any) => {
              console.log("FAILED...", error.text);
              setSubmissionStatus("error");
            }
          );
        oneTime = 0;
      } else if (oneTime == 0) {
        console.error("Can only send one email at a time");
        setSubmissionStatus("oneTime");
      } else {
        console.error(
          "One or more emailjs environment variables are undefined."
        );
        setSubmissionStatus("error");
      }
    }
  };

  return (
    <div className="w-3/5 py-12 lg:py-24">
      <div className="px-4 md:px-6">
        <div className="gap-12">
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none">
                Talk to me!
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                For any questions about projects or experience, feel free to
                reach out to me using the form below!
              </p>
            </div>
            {submissionStatus === "success" && (
              <div className="text-green-600 dark:text-green-400">
                Message sent successfully!
              </div>
            )}
            {submissionStatus === "error" && (
              <div className="text-red-600 dark:text-red-400">
                Failed to send message. Please try again later.
              </div>
            )}
            {submissionStatus === "oneTime" && (
              <div className="text-red-600 dark:text-red-400">
                Can only send one message each time. Please refresh and try
                again
              </div>
            )}
            <form ref={form} onSubmit={sendEmail}>
              <div className="space-y-4">
                <div className="gap-4">
                  <div className="space-y-2">
                    <label className="text-base" htmlFor="first-name">
                      First name
                    </label>
                    <input
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 dark:focus:ring-gray-600"
                      id="first-name"
                      name="user_name"
                      placeholder="Enter your first name"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-base" htmlFor="last-name">
                      Last name
                    </label>
                    <input
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 dark:focus:ring-gray-600"
                      id="last-name"
                      name="user_name"
                      placeholder="Enter your last name"
                      type="text"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-base" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 dark:focus:ring-gray-600"
                    id="email"
                    name="user_email"
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-base" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 dark:focus:ring-gray-600"
                    id="subject"
                    name="subject"
                    placeholder="Enter the subject"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-base" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 dark:focus:ring-gray-600 min-h-[100px]"
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                  />
                </div>
              </div>
              <button
                className="w-full py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="submit"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
