"use client";
import { DotNavigationLayer } from "@/components/dotnav";
import { useDotNavigationHooks } from "@/components/dotnav/hooks";
import { Section } from "@/components/dotnav/section";
import { BrideAndGroom } from "../sections/bride-groom";
import { Gallery } from "../sections/gallery";
import { InvitationContent } from "../sections/invitation-content";
import { InvitationCover } from "../sections/invitation-cover";
import { RSVP } from "../sections/rsvp";
import { SendGifts } from "../sections/send-gifts";
import { ThankYou } from "../sections/thank-you";

export default function GalleryPage() {
  const {
    attachSection: attachMenu,
    dotNavigationRef,
    menus,
    updateActiveSection: updateActiveMenu,
    scrollToTab,
  } = useDotNavigationHooks();
  const commonProps = { attachMenu, updateActiveMenu };
  return (
    <>
      <Section sectionKey="invitation-cover" tooltipText="" {...commonProps}>
        <InvitationCover
          handleViewInvitationContent={() => scrollToTab("invitation-content")}
        />
      </Section>
      <Section
        sectionKey="invitation-content"
        tooltipText="Thiệp mời"
        {...commonProps}
      >
        <InvitationContent />
      </Section>
      <Section
        sectionKey="bride-groom"
        tooltipText="Cô dâu & Chú rể"
        {...commonProps}
      >
        <BrideAndGroom />
      </Section>
      {/* <Section sectionKey="story" tooltipText="Câu chuyện" {...commonProps}>
        <Story />
      </Section> */}
      <Section sectionKey="gallery" tooltipText="Ảnh cưới" {...commonProps}>
        <Gallery />
      </Section>
      <Section
        sectionKey="rsvp"
        tooltipText="Xác nhận tham dự"
        {...commonProps}
      >
        <RSVP />
      </Section>
      <Section
        sectionKey="send-gifts"
        tooltipText="Gửi quà"
        className="w-full h-[50vh]"
        {...commonProps}
      >
        <SendGifts />
      </Section>
      <Section
        sectionKey="thank-you"
        tooltipText="Lời cảm ơn"
        className="w-full h-screen relative"
        {...commonProps}
      >
        <ThankYou />
      </Section>
      <DotNavigationLayer
        ref={dotNavigationRef}
        menus={Object.values(menus)}
        tooltipPlacement="right"
        onTabChange={scrollToTab}
      />
    </>
  );
}
