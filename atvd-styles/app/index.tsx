import Caroussel from "@/components/caroussel";
import FilterChips from "@/components/filter-chips";
import Header from "@/components/header";
import RecentGrid from "@/components/recent-grid";
import ScreenWrapper from "@/components/screen-wrapper";
import { metallicaAlbums } from "@/mocks/albums";
import React from "react";

export default function index() {
  return (
    <ScreenWrapper>
      <Header />
      <FilterChips />
      <RecentGrid />
      <Caroussel title="Jump Back in" albums={metallicaAlbums} />
      <Caroussel title="Metallica" albums={metallicaAlbums} />
      <Caroussel title="Metallica" albums={metallicaAlbums} />
      <Caroussel title="Metallica" albums={metallicaAlbums} />
      <Caroussel title="Metallica" albums={metallicaAlbums} />
      <Caroussel title="Metallica" albums={metallicaAlbums} />
    </ScreenWrapper>
  );
}
