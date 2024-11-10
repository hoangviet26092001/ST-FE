import React, { useContext } from "react";
import { Modal, Form, Input, Button, Flex } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as TaskAPI from "../api/task";
import TaskContext from "../context/taskContext";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  id: yup.string().notRequired(),

  status: yup.string().notRequired(),
});

interface EditTaskFormProps {
  visible: boolean;
  onClose: () => void;
  task: { id: string; title: string; status: string };
  onSuccess: () => void;
}

const EditTaskModal: React.FC<EditTaskFormProps> = ({
  visible,
  onClose,
  task,
  onSuccess,
}) => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("ParentComponent must be used within a TaskProvider");
  }

  const { updateTask } = context;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: task.id,
      title: task.title,
      status: task.status,
    },
  });

  const handleFormSubmit = (data: { title: string }) => {
    handleEditData(data);
  };

  const handleEditData = async ({ title }: { title: string }) => {
    try {
      await TaskAPI.editTask(task.id, { title, status: task.status });
      onSuccess();
      reset();
      onClose();
      updateTask("EDIT");
    } catch (error: any) {
      throw error;
    }
  };
  const handleDelData = async () => {
    try {
      await TaskAPI.deleteTask(task.id);
      reset();
      updateTask("DEL");
      onClose();
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <Modal
      title="Modify Task"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form onFinish={handleSubmit(handleFormSubmit)} layout="vertical">
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

        <Form.Item>
          <Flex justify="flex-end" gap="15px">
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>

            <Button
              type="primary"
              style={{ backgroundColor: "red" }}
              onClick={handleDelData}
            >
              Delete
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTaskModal;
