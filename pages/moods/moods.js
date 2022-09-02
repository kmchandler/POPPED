import React from 'react';
import Link from 'next/link';
import FaceFrownIcon from '@heroicons/react/24/outline';

export default function moods() {
  return (
    <>
      <Link passHref href="/moods/anxious">
        <div>
          <div>anxious</div>
        </div>
      </Link>
      <div>blah</div>
      <div>chill</div>
      <div>bored</div>
      <div>buzzed</div>
      <div>chill</div>
      <div>heartbroken</div>
      <div>high</div>
      <div>mischievous</div>
      <div>moody</div>
      <div>nostalgic</div>
      <Link passHref href="/moods/anxious">
        <div>
          <FaceFrownIcon />
          <h3>sad</h3>
        </div>
      </Link>
      <div>sick</div>
      <div>silly</div>
      <div>stressed</div>
      <div>wistful</div>
    </>
  );
}
