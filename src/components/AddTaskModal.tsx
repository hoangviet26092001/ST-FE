import { useState } from "react";
import { Button, Modal, Form, Input, Flex } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as TaskAPI from "../api/task";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
});

interface TaskFormValues {
  title: string;
}

const AddTaskModal = ({
  onAddSuccess,
}: {
  onAddSuccess: (data: any) => void;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormValues>({
    resolver: yupResolver(schema),
  });

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => {
    setIsModalVisible(false);
    reset();
  };

  const onSubmit = (data: TaskFormValues) => {
    const { title } = data;
    handleAddData(title);
  };

  const handleAddData = async (title: string) => {
    try {
      const res = await TaskAPI.addTaskList(title);
      onAddSuccess(res.results.object);
      handleCancel();
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <>
      <Flex justify="flex-end">
        <Button style={{ margin: 15 }} type="primary" onClick={showModal}>
          Add Task
        </Button>
      </Flex>

      <Modal
        title="Add Task"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
          {/* Field title */}
          <Form.Item
            label="Title"
            validateStatus={errors.title ? "error" : ""}
            help={errors.title?.message}
          >
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter task title" />
              )}
            />
          </Form.Item>

          {/* Nút submit */}
          <Form.Item>
            <Flex justify="flex-end">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddTaskModal;
