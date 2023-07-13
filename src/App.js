/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Input, List, Select, Space, TimePicker } from "antd";
import * as dayjs from "dayjs";
import { useState } from "react";
import "./App.css";

const format = "HH:mm";

function App() {
  // const [form] = Form.useForm();
  const [value, setValue] = useState("");
  const [values, setValues] = useState(() => {
    let storageWorker = localStorage.getItem("jobs");
    if (storageWorker == null) {
      return [];
    } else {
      return JSON.parse(storageWorker);
    }
  });

  var [timeStart, setTimeStart] = useState("");
  var [timeEnd, setTimeEnd] = useState("");
  var [type, setType] = useState("");
  // var [isOpenModal, setIsOpenModal] = useState(false);

  const clearInput = () => {
    setValue("");
    setTimeStart("");
    setTimeEnd("");
  };
  const onSubmit = () => {
    timeStart = dayjs(timeStart).format(format);
    timeEnd = dayjs(timeEnd).format(format);

    setValues((worker) => {
      const newWorker = [
        ...worker,
        {
          nameTitle: value === "" ? "không có dữ liệu" : value,
          timeStart: timeStart === "Invalid Date" ? "không có dữ liệu" : timeStart,
          timeEnd: timeEnd === "Invalid Date" ? "không có dữ liệu" : timeEnd,
          type: type === "" ? "không có dữ liệu" : type,
        },
      ];

      const jsonWorker = JSON.stringify(newWorker);
      localStorage.setItem("jobs", jsonWorker);
      return newWorker;
    });
    clearInput();
  };
  const onDelete = (key) => {
    const storageWorker = localStorage.getItem("jobs");
    let arrParse = JSON.parse(storageWorker);

    const newValue = arrParse.filter((item, index) => index !== key);

    localStorage.setItem("jobs", JSON.stringify(newValue));
    return setValues(newValue);
  };

  return (
    <>
      <div className="App">
        <Space direction={"vertical"}>
          <Space direction={"vertical"}>
            <p>Todolist</p>
            <Space direction={"horizontal"}>
              <Input
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />

              <TimePicker
                value={timeStart}
                format={format}
                onChange={(e) => {
                  setTimeStart(e);
                }}
              />
              <TimePicker
                value={timeEnd}
                format={format}
                onChange={(e) => {
                  setTimeEnd(e);
                }}
              />
              <Select
                className="w-100"
                allowClear
                value={type}
                style={{
                  width: 120,
                }}
                onChange={(e) => {
                  console.log(e);
                  setType(e);
                }}
                options={[
                  { value: "Công viêc", label: "Công việc" },
                  { value: "Việc nhà", label: "Việc nhà" },
                ]}
              />
              <Button type="primary" onClick={onSubmit}>
                Add
              </Button>
            </Space>
          </Space>
          <Space>
            <List
              size="small"
              bordered
              dataSource={values}
              itemLayout="vertical"
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  actions={[
                    <a key="list-loadmore-edit" onClick={() => {}}>
                      edit
                    </a>,
                    <a
                      key="list-loadmore-delete"
                      onClick={() => {
                        onDelete(index);
                      }}>
                      delete
                    </a>,
                  ]}>
                  <h2>{item.nameTitle}</h2>
                  <p>Bắt đầu: {item.timeStart}</p>
                  <p>Kết thúc: {item.timeEnd}</p>
                  <p>Trạng thái: {item.type}</p>
                </List.Item>
              )}
            />
          </Space>
        </Space>
      </div>
    </>
  );
}

export default App;
