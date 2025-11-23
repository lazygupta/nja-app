"use client";

import { useEffect } from "react";

export default function FbEmbed({ url }: { url: string }) {
  useEffect(() => {
    if ((window as any).FB) {
      (window as any).FB.XFBML.parse();
    }
  }, []);

  return (
    <>
      <div
        className="fb-post w-full"
        data-href={url}
        data-width="350"
        data-show-text="true"
      ></div>

      <script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0"
      ></script>
    </>
  );
}
