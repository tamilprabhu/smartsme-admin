import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { API_BASE_URL } from "../../config";
import { apiRequest } from "../../services/api";

function ProductCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productId: "",
    companyId: "FINO001",
    productName: "",
    rawMaterial: "",
    weight: "",
    wastage: "",
    norms: "",
    totalWeight: "",
    cavity: "",
    shotRate: "",
    perItemRate: "",
    incentiveLimit: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = `/product`
    await apiRequest(endpoint,"POST",formData);
    // const token = localStorage.getItem("accessToken");
    // await fetch(`${API_BASE_URL}/product`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify(formData),
    // });
    navigate("/product");
  };

  return (
    <div>
      <h1>Create Product</h1>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Raw Material</Form.Label>
              <Form.Control
                name="rawMaterial"
                value={formData.rawMaterial}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Wastage (%)</Form.Label>
              <Form.Control
                type="number"
                name="wastage"
                value={formData.wastage}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cavity</Form.Label>
              <Form.Control
                type="number"
                name="cavity"
                value={formData.cavity}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="me-2">
              Create
            </Button>
            <Link to="/product" className="btn btn-secondary">
              Cancel
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductCreate;
