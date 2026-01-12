import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { CropCalendar } from "@/components/sections/resources/CropCalendar"
import { ScreenReaderOnly } from "@/components/shared/screen-reader-only"
import { HomeContent } from "@/components/sections/home-content"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1" id="main-content">
        <ScreenReaderOnly as="h1">
          Savaj Seeds - Premium Quality Seeds for Optimal Farming Growth
        </ScreenReaderOnly>

        <HomeContent cropCalendar={<CropCalendar />} />
      </main>

      <SiteFooter />
    </div >
  )
}

