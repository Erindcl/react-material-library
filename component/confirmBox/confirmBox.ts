//import * as React from "react";

import { Modal } from "antd";
const { confirm } = Modal;

export default function confrimBox(str, cb, okText?: string) {
  let strArr = str.split("|");
  confirm({
    title: strArr[0],
    content: strArr[1],
    okText: okText || "继续",
    className: "confirm-box",
    onOk() {
      cb(true);
    },
    onCancel() {
      cb(false);
    }
  });
}
