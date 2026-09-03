"use client";

import { MouseEvent } from "react";

export default function SkipLink() {
  function moveToContent(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const content = document.getElementById("main-content");
    if (!content) return;
    content.focus();
    content.scrollIntoView();
    window.history.replaceState(null, "", "#main-content");
  }

  return (
    <a href="#main-content" className="skip-link" onClick={moveToContent}>
      Vai al contenuto principale
    </a>
  );
}
