import { Button, Form, Input, Modal, Table, message } from "antd";
import { useState } from "react";

const Edit = ({
  isEditModalOpen,
  setIsEditModalOpen,
  categories,
  setCategories,
}) => {
  const [editingRow, setEditingRow] = useState(false);

  const onFinish = (values) => {
    try {
      fetch(`http://localhost:3001/category/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, _id: editingRow._id }),
      });
      message.success("Category Updated Successfully");
      setCategories(
        categories.map((category) => {
          if (category._id === editingRow._id) {
            return {
              ...category,
              title: values.title,
            };
          } else {
            return category;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    if(window.confirm("Are you sure you want to delete this category?")) {
      try {
        await fetch(`http://localhost:3001/category/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: id }),
        });
        message.success("Category Deleted Successfully");
        setCategories(categories.filter((category) => category._id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };



  const columns = [
    {
      title: "Category",
      dataIndex: "title",
      render: (_, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <Input defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return <span>{record.title}</span>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_ , record) => {
        return (
          <div>
            <Button type="link" onClick={() => setEditingRow(record)}
            className="pl-0">
              Edit
            </Button>
            <Button type="link" htmlType="submit" className="text-green-500">
              Save
            </Button>
            <Button type="text" danger onClick={() => deleteCategory(record._id)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      open={isEditModalOpen}
      title="Edit Category"
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
        />
      </Form>
    </Modal>
  );
};
export default Edit;
