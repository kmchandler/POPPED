import React from 'react';
import { useRouter } from 'next/router';

export default function TryAgain() {
  const router = useRouter();
  const onClick = () => router.push('/shuffle');
  return (
    <div>
      <div>no flicks found matching this criteria. please go back and try again.</div>
      <button type="button" onClick={onClick}>try again</button>
    </div>
  );
}
