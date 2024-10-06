import { useScreenSize } from "@/hooks/views";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Imperial_Script } from "next/font/google";
import Image from "next/image";
import qrBinhVTMoney from "./qr-binh-vtmoney.jpeg";
import qrQuynhTech from "./qr-quynh-tech.jpeg";

const scriptFont = Imperial_Script({
  weight: "400",
  subsets: ["vietnamese"],
});

function GiftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2rem"
      height="1.2rem"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="#ededed"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <path d="M3 9a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm9-1v13" />
        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7m2.5-4a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5a2.5 2.5 0 0 1 0 5" />
      </g>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2rem"
      height="1.2rem"
      viewBox="0 0 24 24"
    >
      <path
        fill="#000000"
        d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"
      />
    </svg>
  );
}

export function SendGifts() {
  const { isOpen, onOpenChange } = useDisclosure();

  const screenSize = useScreenSize();

  return (
    <div className="h-full w-full bg-red-800 text-[#EDEDED] flex flex-col justify-center items-center gap-6">
      <h1 className={`${scriptFont.className} text-5xl p-6 text-center`}>
        Gửi quà cho cô dâu & chú rể
      </h1>
      <Button
        variant="bordered"
        className="min-w-4 border-[#EDEDED] border-1 hover:scale-105"
        onClick={onOpenChange}
      >
        <GiftIcon />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={screenSize?.device === "mobile" ? "xl" : "xl"}
        scrollBehavior="inside"
      >
        <ModalContent className="bg-[#ededed]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Gửi quà mừng
              </ModalHeader>
              <ModalBody className="flex flex-col md:flex-row h-96 overflow-scroll gap-6">
                <div className="w-full flex flex-col gap-2">
                  <Image
                    src={qrBinhVTMoney}
                    alt="Groom's QR code"
                    className="h-full object-cover"
                  />
                  <Button
                    href={qrBinhVTMoney.src}
                    as={Link}
                    download="qr-binh-vtmoney.jpeg"
                  >
                    <DownloadIcon /> Tải QR chú rể
                  </Button>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Image
                    src={qrQuynhTech}
                    alt="Bride's QR code"
                    className="h-full -mb-4"
                    style={{
                      objectFit: "cover",
                      objectPosition: "right 0 top -1.25rem",
                    }}
                  />
                  <Button
                    href={qrQuynhTech.src}
                    as={Link}
                    download="qr-quynh-tech.jpeg"
                  >
                    <DownloadIcon /> Tải QR cô dâu
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="shadow" onPress={onClose}>
                  Đóng
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
