"use client";

import { UnderlinedHeading } from "@/components/heading/underlined-heading";
import {
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
  ScrollShadow,
} from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { bindRSVPForm } from "./api";

const events = [
  {
    name: "Tiệc nhà gái",
    value: "tiec-nha-gai",
    date: "01-11-2024",
  },
  {
    name: "Lễ Vu Quy",
    value: "le-vu-quy",
    date: "02-11-2024",
  },
  {
    name: "Lễ thành hôn & Tiệc nhà trai",
    value: "le-thanh-hon",
    date: "02-11-2024",
  },
];

export function RSVP() {
  const [willParticipate, setWillParticipate] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const submitParticipationForm = () => {
    if (!formRef.current) {
      return;
    }
    const formData = new FormData(formRef.current);
    const data = bindRSVPForm(formData);
    console.log(data);
  };

  return (
    <ScrollShadow className="w-full h-full border border-collapse flex flex-col items-center py-4">
      <UnderlinedHeading text="Tham gia đám cưới" />
      <div className="w-2/3 lg:w-2/3">
        <p className="italic text-center">
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
            errorMessage="Please enter a valid email"
          />
          <Input
            size="md"
            placeholder="Số điện thoại"
            name="phoneNumber"
            label="Số điện thoại"
            labelPlacement="outside"
            isRequired
          />
          <Input
            size="md"
            placeholder="Email"
            name="email"
            label="Địa chỉ email"
            labelPlacement="outside"
            isRequired
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
            onChange={(ev) =>
              setWillParticipate(ev.currentTarget.value === "yes")
            }
          >
            <Radio className="mr-4" value="yes">
              Có
            </Radio>
            <Radio className="mr-4" value="no">
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
                >
                  {events.map(({ name, value, date }, index) => (
                    <Checkbox key={index} className="mr-4" value={value}>
                      {name} ({date})
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </motion.div>
            )}
          </AnimatePresence>
          <ButtonGroup>
            <Button type="submit" color="primary">
              Gửi
            </Button>
          </ButtonGroup>
        </form>
      </div>
    </ScrollShadow>
  );
}
