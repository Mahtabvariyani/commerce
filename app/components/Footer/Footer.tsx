import React from "react";
import Container from "../Container";
import FooterList from "./footerList";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
import { AiFillShop } from "react-icons/ai";
import { CiInstagram } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

function Footer() {
  return (
    <footer className="bg-yellow-400 text-black text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold md-2 ">Shop Categories</h3>
            <Link href="#">Perfumes</Link>
            <Link href="#">Assesories</Link>
            <Link href="#">MakeUp</Link>
            <Link href="#">hair</Link>
            <Link href="#">underWear</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold md-2 ">About us</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum
              a ratione molestias, eaque amet quasi rerum obcaecati officiis
              nobis, maiores ipsum architecto sapiente, error ullam? Facere
              repudiandae eum laudantium nulla!
            </p>
            <p>@copy;{new Date().getFullYear()} perfume Shop</p>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold md-2 ">Shop Categories</h3>
            <Link href="#">Perfumes</Link>
            <Link href="#">Assesories</Link>
            <Link href="#">MakeUp</Link>
            <Link href="#">hair</Link>
            <Link href="#">underWear</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold md-2 ">Social</h3>
            <div className="flex flex-col">
              <Link href="#">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <AiFillShop size={24} />
              </Link>
              <Link href="#">
                <CiInstagram size={24} />
              </Link>
              <Link href="#">
                <FaYoutube size={24} />
              </Link>
              <Link href="#">
                <CgWebsite size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
