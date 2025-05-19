import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
          <Image className="w-28 md:w-32" src={assets.logo} alt="logo" />
        <p className="mt-6 text-sm" style={{ textAlign: "justify" }}>
        InstaCart is a dynamic eCommerce platform designed to enhance the online shopping and selling experience through specialized dashboards. Unlike traditional eCommerce sites, InstaCart offers separate, fully tailored dashboards for customers and sellers. Customers enjoy a smooth, intuitive interface for browsing products, tracking orders, and managing their profiles. Meanwhile, sellers have access to dedicated tools to manage inventory, view sales analytics, process orders, and communicate with customers — all from their personalized seller dashboard. This dual-dashboard system ensures that both buyers and sellers have a seamless, efficient, and organized experience on InstaCart.
        </p>
        </div>
        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="#">Home</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">About us</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">Contact us</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">Privacy policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+91-7589632410</p>
              <p>contact@SyedaViquarSultana.dev</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm">
        Copyright 2025 © S-ViquarSultana All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;