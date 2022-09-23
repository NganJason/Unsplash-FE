import React from "react";
import s from "./s.module.scss";

import { Button, Form, message, Modal, Spin, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";


import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useUploadImage } from "../../_shared/mutations/unsplash";
import { UploadChangeParam } from "antd/lib/upload";

const UploadModal = (): JSX.Element => {
    const [search] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [modalVisible, setModalVisible] = React.useState(false);
    const [fileList, setFileList] = React.useState<any[]>([]);
    

    React.useEffect(() => {
      let isUpload = search.get("upload");

      if (isUpload) {
        setModalVisible(true);
      } else {
        setModalVisible(false);
      }
    }, [search]);

    const { mutate: uploadImages, isLoading: isUploadLoading } = useUploadImage(
      {
        onSuccess: (): void => {
          setFileList([]);
          navigate(location.pathname);
          window.location.reload()
        },
        onError: (err): void => {
          if (err instanceof Error) {
            message.error(err.message);
          }
        },
      }
    );

    const onChangeHandler = (e: UploadChangeParam) => {
      let newList: Array<File | undefined> = []

      for (var file of e.fileList) {
        newList.push(file.originFileObj)
      }

      setFileList(newList)
      e.file.status = "done";
    };

    const onSubmitHandler = async () => {
        if (fileList.length > 1) {
          message.error("Only 1 image is allowed at a time.")
          return
        }
        uploadImages(fileList[0])
    };

    const normFile = (e: any) => {
      console.log("Upload event:", e);
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };

    return (
      <div>
        <Modal
          title=""
          closable={false}
          maskClosable={true}
          footer={null}
          width={1000}
          centered
          visible={modalVisible}
          onCancel={() => {
            navigate(location.pathname);
          }}
          className={s.modal}
        >
          <div>
            {isUploadLoading ? (
              <div className={s.uploadLoading}>
                <Spin size="large" />
              </div>
            ) : (
              <Form.Item
                name="dragger"
                noStyle
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload.Dragger
                  name="files"
                  multiple={true}
                  className={s.uploadContainer}
                  onChange={onChangeHandler}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Only one file is allowed at a time.
                  </p>
                </Upload.Dragger>
              </Form.Item>
            )}

            <Form.Item>
              <Button
                className={s.submitBtn}
                htmlType="submit"
                onClick={onSubmitHandler}
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Modal>
      </div>
    );
}

export default UploadModal;