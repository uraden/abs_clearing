import React, { useState } from "react";
import { Modal, Button, Upload, message } from "antd";
import type { UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile, UploadChangeParam } from "antd/lib/upload/interface";

interface UploadModalProps {
  visible: boolean;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ visible, onClose }) => {
  const [fileList, setFileList] = useState<RcFile[]>([]);

  const beforeUpload = (file: RcFile) => {
    const isJson = file.type === "application/json";
    if (!isJson) {
      message.error("You can only upload JSON files!");
    }
    return isJson;
  };

  //@ts-expect-error ignore for npm run build
  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<RcFile>
  ) => {
    setFileList(info.fileList);
    console.log(info.fileList);
  };

  const handleUpload = async () => {
    try {
      // Handle the file upload logic here
      // For simplicity, let's assume the first file in the list contains the JSON data
      const jsonFile = fileList[0];

      if (jsonFile) {
        //@ts-expect-error ignore for npm run build
        const jsonData = await readFileAsText(jsonFile.originFileObj);
        const parsedData = JSON.parse(jsonData);
        console.log("Parsed JSON Data:", parsedData);
      }

      // Close the modal after handling the upload
      onClose();
    } catch (error) {
      console.error("Error handling JSON file:", error);
    }
  };

  const readFileAsText = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          resolve(event.target.result as string);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.readAsText(file);
    });
  };

  return (
    <Modal
      visible={visible}
      title="Upload JSON File"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpload}>
          Submit
        </Button>,
      ]}
    >
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        beforeUpload={beforeUpload}
        accept="application/json"
        fileList={fileList}
        listType="text"
        onChange={handleChange}
        showUploadList={{ showPreviewIcon: false }}
      >
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
    </Modal>
  );
};

export default UploadModal;
