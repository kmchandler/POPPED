import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GiFilmSpool } from 'react-icons/gi';
import { BsShuffle } from 'react-icons/bs';
import { FaTheaterMasks } from 'react-icons/fa';
import logo2 from '../components/logo2.png';

export default function index() {
  return (
    <div className="homePage">
      <h1 className="welcomeMain">welcome to</h1>
      <Image src={logo2} className="logoMain" />
      <br />
      <h3>pick your flick before the popcorn&apos;s ready</h3>
      <br />
      <div className="linkIconDiv">
        <Link passHref href="/flicks/watchlist">
          <div className="watchlistIconDiv">
            <GiFilmSpool className="watchlistIcon" />
            <h4 className="watchlistText">watchlist</h4>
          </div>
        </Link>
        <Link passHref href="/shuffle">
          <div className="shuffleIconDiv">
            <BsShuffle className="shuffleIcon" />
            <h4 className="shuffleText">shuffle</h4>
          </div>
        </Link>
        <Link passHref href="/moods/moods">
          <div className="moodsIconDiv">
            <FaTheaterMasks className="moodsIcon" />
            <h4 className="moodsText">moods</h4>
          </div>
        </Link>
      </div>
    </div>
  );
}
