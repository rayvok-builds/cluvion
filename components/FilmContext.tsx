"use client";

import React, { createContext, useContext, useState } from "react";
import { WorkItem } from "../lib/data";

interface FilmContextType {
  isProjectModalOpen: boolean;
  openProjectModal: (prefillCategory?: string) => void;
  closeProjectModal: () => void;
  selectedCategory: string;
  activeVideo: WorkItem | null;
  openVideoLightbox: (item: WorkItem) => void;
  closeVideoLightbox: () => void;
  isCaseStudyOpen: boolean;
  openCaseStudy: () => void;
  closeCaseStudy: () => void;
  isArchiveOpen: boolean;
  openArchive: () => void;
  closeArchive: () => void;
}

const FilmContext = createContext<FilmContextType | undefined>(undefined);

export function FilmProvider({ children }: { children: React.ReactNode }) {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Brand Film");
  const [activeVideo, setActiveVideo] = useState<WorkItem | null>(null);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  const openProjectModal = (prefillCategory?: string) => {
    if (prefillCategory) setSelectedCategory(prefillCategory);
    setIsProjectModalOpen(true);
  };

  const closeProjectModal = () => setIsProjectModalOpen(false);

  const openVideoLightbox = (item: WorkItem) => setActiveVideo(item);
  const closeVideoLightbox = () => setActiveVideo(null);

  const openCaseStudy = () => setIsCaseStudyOpen(true);
  const closeCaseStudy = () => setIsCaseStudyOpen(false);

  const openArchive = () => setIsArchiveOpen(true);
  const closeArchive = () => setIsArchiveOpen(false);

  return (
    <FilmContext.Provider
      value={{
        isProjectModalOpen,
        openProjectModal,
        closeProjectModal,
        selectedCategory,
        activeVideo,
        openVideoLightbox,
        closeVideoLightbox,
        isCaseStudyOpen,
        openCaseStudy,
        closeCaseStudy,
        isArchiveOpen,
        openArchive,
        closeArchive,
      }}
    >
      {children}
    </FilmContext.Provider>
  );
}

export function useFilm() {
  const context = useContext(FilmContext);
  if (!context) {
    throw new Error("useFilm must be used within a FilmProvider");
  }
  return context;
}

