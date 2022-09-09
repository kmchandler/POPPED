import React from 'react';
import Link from 'next/link';
import { GiFilmSpool } from 'react-icons/gi';
import { BsShuffle } from 'react-icons/bs';
import { FaTheaterMasks } from 'react-icons/fa';

export default function index() {
  return (
    <div className="homePage">
      <h1>welcome to POPPED</h1>
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
