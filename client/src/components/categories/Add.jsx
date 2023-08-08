import { Button, Form, Input, Modal, message } from "antd";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setCategories,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsAddModalOpen(false);
        })
        .catch((err) => console.log(err));
      message.success("Category Added Successfully");
      form.resetFields();
      setCategories([
        ...categories,
        {
          title: values.title,
          _id: Math.random().toString(36).substr(2, 9),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Add New Category"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Add Category"
          name="title"
          rules={[{ required: true, message: "Please enter a category name" }]}
        >
          <Input placeholder="Category Name" />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button className="" type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
