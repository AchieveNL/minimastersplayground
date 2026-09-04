"use client";

import { createContext, useContext } from "react";
import { contentDefaults, type SiteContent } from "../content/defaults";

const ContentContext = createContext<SiteContent>(
  contentDefaults as SiteContent,
);

export function ContentProvider({
  content,
  children,
}: {
  content: SiteContent;
  children: React.ReactNode;
}) {
  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
