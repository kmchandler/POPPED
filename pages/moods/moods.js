import React from 'react';
import Link from 'next/link';
import {
  CloudIcon, SunIcon, BellIcon, Battery0Icon,
} from '@heroicons/react/24/outline';
import {
  BsFillCloudLightningRainFill, TbMoodTongue, TbMoodConfuzed, TbMoodNeutral, GiMapleLeaf, ImHeartBroken, BsFillMoonStarsFill, BsEmojiExpressionless, BsEmojiWink, BsSkipBackward, IoSnow, IoIosWine,
} from 'react-icons';

export default function Moods() {
  return (
    <>
      <Link passHref href="/moods/anxious">
        <div className="anxiousIcon">
          <BellIcon className="anxiousIcon" />
          <h3 className="anxiousText">anxious</h3>
        </div>
      </Link>
      <Link passHref href="/moods/blah">
        <div className="blahIcon">
          <BsEmojiExpressionless className="blahIcon" />
          <h3 className="blahText">blah</h3>
        </div>
      </Link>
      <Link passHref href="/moods/bored">
        <div className="boredIcon">
          <TbMoodConfuzed className="boredIcon" />
          <h3 className="boredText">bored</h3>
        </div>
      </Link>
      <Link passHref href="/moods/buzzed">
        <div className="buzzedIcon">
          <IoIosWine className="buzzedIcon" />
          <h3 className="buzzedText">buzzed</h3>
        </div>
      </Link>
      <Link passHref href="/moods/chill">
        <div className="chillIcon">
          <IoSnow className="chillIcon" />
          <h3 className="chillText">chill</h3>
        </div>
      </Link>
      <Link passHref href="/moods/happy">
        <div className="happyIcon">
          <SunIcon className="faceSmileIcon" />
          <h3 className="happyText">happy</h3>
        </div>
      </Link>
      <Link passHref href="/moods/heartbroken">
        <div className="heartbrokenIcon">
          <ImHeartBroken className="heartbrokenIcon" />
          <h3 className="heartbrokenText">heartbroken</h3>
        </div>
      </Link>
      <Link passHref href="/moods/high">
        <div className="highIcon">
          <GiMapleLeaf className="highIcon" />
          <h3 className="highText">high</h3>
        </div>
      </Link>
      <Link passHref href="/moods/mischievous">
        <div className="mischievousIcon">
          <BsEmojiWink className="mischievousIcon" />
          <h3 className="mischievousText">mischievous</h3>
        </div>
      </Link>
      <Link passHref href="/moods/moody">
        <div className="moodyIcon">
          <BsFillCloudLightningRainFill className="moodyIcon" />
          <h3 className="moodyText">moody</h3>
        </div>
      </Link>
      <Link passHref href="/moods/nostalgic">
        <div className="nostalgicIcon">
          <BsSkipBackward className="nostalgicIcon" />
          <h3 className="nostalgicText">nostalgic</h3>
        </div>
      </Link>
      <Link passHref href="/moods/sad">
        <div className="sadIcon">
          <CloudIcon className="faceFrownIcon" />
          <h3 className="sadText">sad</h3>
        </div>
      </Link>
      <Link passHref href="/moods/sick">
        <div className="sickIcon">
          <Battery0Icon className="sickIcon" />
          <h3 className="sickText">sick</h3>
        </div>
      </Link>
      <Link passHref href="/moods/silly">
        <div className="sillyIcon">
          <TbMoodTongue className="sillyIcon" />
          <h3 className="sillyText">silly</h3>
        </div>
      </Link>
      <Link passHref href="/moods/stressed">
        <div className="stressedIcon">
          <TbMoodNeutral className="stressedIcon" />
          <h3 className="stressedText">stressed</h3>
        </div>
      </Link>
      <Link passHref href="/moods/wistful">
        <div className="wistfulIcon">
          <BsFillMoonStarsFill className="wistfulIcon" />
          <h3 className="wistfulText">wistful</h3>
        </div>
      </Link>
    </>
  );
}
