"use client";

import { UnderlinedHeading } from "@/components/heading/underlined-heading";
import {
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { bindRSVPForm, submitForm } from "./api";

const events = [
  {
    name: "Tiệc nhà gái",
    value: "bride-party",
    date: "01-11-2024",
  },
  {
    name: "Lễ Vu Quy",
    value: "bride-ceremony",
    date: "02-11-2024",
  },
  {
    name: "Lễ thành hôn & Tiệc nhà trai",
    value: "wedding-ceremony",
    date: "02-11-2024",
  },
];

export function RSVP() {
  const [willParticipate, setWillParticipate] = useState<boolean | undefined>();
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const formRef = useRef<HTMLFormElement | null>(null);
  const abortController = useMemo(() => new AbortController(), []);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const submitParticipationForm = async () => {
    if (!formRef.current) {
      return;
    }
    const formData = new FormData(formRef.current);
    const [data, invalidFields] = bindRSVPForm(formData);
    if (invalidFields.length) {
      setInvalidFields(invalidFields);
    } else {
      try {
        setLoading(true);
        await submitForm(data, abortController);
        formRef.current.reset();
        setError(undefined);
        setWillParticipate(false);
        // eslint-disable-next-line
      } catch (err: any) {
        setError(`${err.response.data.detail}`);
      }
      onOpen();
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-auto border-y border-collapse flex flex-col items-center py-4">
      <UnderlinedHeading text="Tham gia đám cưới" />
      <div className="h-auto w-full flex justify-center">
        <div className="w-2/3 lg:w-2/3">
          <p className="italic text-center text-small">
            Nếu có thể tham gia đám cưới, anh/chị vui lòng điền thông tin để gia
            đình sắp xếp và đón tiếp chu đáo ạ!{" "}
          </p>
          <form
            ref={formRef}
            className="my-4 py-4 flex flex-col gap-4"
            name="registration"
            onSubmit={submitParticipationForm}
          >
            <Input
              size="md"
              placeholder="Họ và tên"
              name="fullName"
              label="Họ và tên"
              labelPlacement="outside"
              isRequired
              isInvalid={invalidFields.includes("fullName")}
              errorMessage="Hãy nhập họ và tên"
              onChange={() => {
                setInvalidFields(invalidFields.filter((f) => f !== "fullName"));
              }}
            />
            <Input
              size="md"
              placeholder="Số điện thoại"
              name="phoneNumber"
              label="Số điện thoại"
              labelPlacement="outside"
              isRequired
              isInvalid={invalidFields.includes("phoneNumber")}
              errorMessage="Hãy nhập số điện thoại đúng"
              onChange={() => {
                setInvalidFields(
                  invalidFields.filter((f) => f !== "phoneNumber")
                );
              }}
            />
            <Input
              size="md"
              placeholder="Email"
              name="email"
              label="Địa chỉ email"
              labelPlacement="outside"
              isRequired
              isInvalid={invalidFields.includes("email")}
              errorMessage="Hãy nhập email đúng"
              onChange={() => {
                setInvalidFields(invalidFields.filter((f) => f !== "email"));
              }}
            />
            <RadioGroup
              label={
                <small className="text-small font-medium">
                  Anh/chị có thể tham gia lễ cưới không?
                </small>
              }
              orientation="horizontal"
              color="primary"
              isRequired
              onChange={(ev) => {
                setWillParticipate(ev.currentTarget.value === "yes");
                setInvalidFields(invalidFields.filter((f) => f !== "joining"));
              }}
              isInvalid={invalidFields.includes("joining")}
              errorMessage="Hãy chọn Có hoặc Không"
              name="joining"
            >
              <Radio className="mr-4" value="yes" name="joining">
                Có
              </Radio>
              <Radio className="mr-4" value="no" name="joining">
                Không
              </Radio>
            </RadioGroup>

            <AnimatePresence>
              {willParticipate && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: "-1rem" }}
                  animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                  exit={{ opacity: 0, height: 0, marginTop: "-1rem" }}
                  style={{ overflow: "hidden" }}
                >
                  <CheckboxGroup
                    name="events"
                    label={
                      <small className="text-small font-medium">
                        Sự kiện sẽ tham dự
                      </small>
                    }
                    orientation="horizontal"
                    color="primary"
                    onChange={() =>
                      setInvalidFields(
                        invalidFields.filter((f) => f !== "events")
                      )
                    }
                    isInvalid={
                      willParticipate && invalidFields.includes("events")
                    }
                    errorMessage="Hãy chọn ít nhất 1 sự kiện"
                  >
                    {events.map(({ name, value, date }, index) => (
                      <Checkbox
                        key={index}
                        className="mr-4 text-[#FAFAFA]"
                        value={value}
                        name="events"
                        form="registration"
                      >
                        {name} ({date})
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </motion.div>
              )}
            </AnimatePresence>
            <ButtonGroup>
              <Button
                className="text-[#FAFAFA] transition-all"
                color="primary"
                onClick={submitParticipationForm}
                isDisabled={loading}
              >
                {loading && <Spinner color="white" size="sm" />}
                Gửi
              </Button>
            </ButtonGroup>
          </form>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {!error ? "Cảm ơn" : "Xin lỗi"}
              </ModalHeader>
              <ModalBody>
                <p>{error ? error : "Cảm ơn anh chị đã xác nhận tham dự!"}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="solid" onPress={onClose}>
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
