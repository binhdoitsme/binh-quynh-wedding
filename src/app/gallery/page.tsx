"use client";
import { DotNavigationLayer } from "@/components/dotnav";
import { Section } from "@/components/dotnav/section";
import { useDotNavigationHooks } from "@/components/dotnav/hooks";
import { Gallery } from "../sections/gallery";
import { InvitationContent } from "../sections/invitation-content";
import { InvitationCover } from "../sections/invitation-cover";
import { RSVP } from "../sections/rsvp";
import { Story } from "../sections/story";
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
      <Section sectionKey="story" tooltipText="Our love story" {...commonProps}>
        <Story />
      </Section>
      <Section sectionKey="gallery" tooltipText="Gallery" {...commonProps}>
        <Gallery />
      </Section>
      <Section sectionKey="rsvp" tooltipText="RSVP" {...commonProps}>
        <RSVP />
      </Section>
      <Section sectionKey="thank-you" tooltipText="Thank you!">
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
