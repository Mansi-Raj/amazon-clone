import { useState } from 'react';

export function AdminProducts() {
  const [product, setProduct] = useState({
    name: '', description: '', priceCents: 0, stockQuantity: 0, category: 'General', attributes: {} 
  });
  
  // State for the actual file
  const [imageFile, setImageFile] = useState(null);

  const updateAttribute = (key, value) => {
    setProduct(prev => ({
      ...prev,
      attributes: { ...prev.attributes, [key]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Create FormData to handle both text and files
    const formData = new FormData();
    
    // Convert product details to a JSON string and append it
    formData.append("productData", JSON.stringify(product));
    
    // Append the actual image file
    if (imageFile) {
        formData.append("imageFile", imageFile);
    }

    // 2. Send to backend (DO NOT set Content-Type manually when using FormData)
    try {
        const response = await fetch('http://localhost:8080/api/admin/products/add', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            },
            body: formData
        });

        if (response.ok) {
            alert('Product Added Successfully with Image!');
        } else {
            alert('Failed to add product');
        }
    } catch (error) {
        console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <h1>Product Management</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <input type="text" placeholder="Product Name" onChange={e => setProduct({...product, name: e.target.value})} required />
        <textarea placeholder="Small Description" onChange={e => setProduct({...product, description: e.target.value})} required />
        <input type="number" placeholder="Price (Cents)" onChange={e => setProduct({...product, priceCents: e.target.value})} required />
        <input type="number" placeholder="Quantity" onChange={e => setProduct({...product, stockQuantity: e.target.value})} required />
        
        {/* Changed from Text Input to File Input */}
        <input 
            type="file" 
            accept="image/png, image/jpeg, image/webp" 
            onChange={e => setImageFile(e.target.files[0])} 
            required 
        />
        
        <select onChange={e => setProduct({...product, category: e.target.value})}>
            <option value="General">General</option>
            <option value="Crockery">Crockery</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Footwear">Footwear</option>
        </select>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}