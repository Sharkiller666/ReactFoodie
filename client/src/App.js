import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import { FaStar } from "react-icons/fa";

function App() {
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    rating: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    Axios.get("http://localhost:3001/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleLogin = () => {
    if (loginName == "" || loginPassword == "") {
      alert("Empty Name or Password");
      return;
    }

    Axios.post("http://localhost:3001/login", {
      name: loginName,
      password: loginPassword,
    })
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error Login:", error);
        alert("Invalid username or password");
        setLoginName("");
        setLoginPassword("");
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginPassword("");
  };

  const handleRegister = (e) => {
    if (loginName == "" || loginPassword == "") {
      alert("Empty Name or Password");
      return;
    }

    Axios.post("http://localhost:3001/register", {
      name: loginName,
      password: loginPassword,
    })
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        alert("Invalid username or password");
        setLoginName("");
        setLoginPassword("");
      });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (
      !newProduct.name ||
      !newProduct.rating ||
      !newProduct.description ||
      !newProduct.image
    ) {
      alert("All fields are required!");
      return;
    }

    const newId =
      products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const productToAdd = {
      id: newId,
      ...newProduct,
      rating: parseInt(newProduct.rating),
    };

    Axios.post("http://localhost:3001/create", {
      id: newId,
      name: newProduct.name,
      rating: newProduct.rating,
      description: newProduct.description,
      image: newProduct.image,
    })
      .then(() => {
        setProducts((prevProducts) => [...prevProducts, productToAdd]);
        setNewProduct({ name: "", rating: "", description: "", image: "" });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result }));
        alert(reader.result);
      };
    }
  };

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 0; i < rating; i++) {
      stars.push(<FaStar color="yellow" />);
    }
    return stars;
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn ? (
          <div className="Products-container">
            <h2 className="Products-title">Restaurant</h2>
            <div className="Products-grid">
              {products.map((product) => (
                <div key={product.id} className="Products-item">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="Product-image"
                    />
                  )}
                  <h3>{product.name}</h3>
                  <p>Rating: {product.rating}</p>
                  {renderStars(product.rating)}
                  <p>{product.description}</p>
                </div>
              ))}
            </div>
            <form className="Add-product-form" onSubmit={handleAddProduct}>
              <input
                type="text"
                placeholder="Restaurant Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct((prev) => ({ ...prev, name: e.target.value }))
                }
                className="App-input"
                required
              />
              <input
                type="number"
                placeholder="Rating (1-5)"
                value={newProduct.rating}
                onChange={(e) =>
                  setNewProduct((prev) => ({ ...prev, rating: e.target.value }))
                }
                className="App-input"
                min="1"
                max="5"
                required
              />
              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="App-input"
                required
              />
              <input
                type="text"
                placeholder="Product Image Link"
                onChange={(e) => {
                  setNewProduct((prev) => ({ ...prev, image: e.target.value }));
                }}
                className="App-input"
                required
              />
              <button type="submit" className="App-button">
                Add Product
              </button>
            </form>
            <button onClick={handleLogout} className="App-button">
              Logout
            </button>
          </div>
        ) : (
          <div className="Login-container">
            <h2 className="Login-title">Login</h2>
            <div className="Login-form">
              <input
                type="text"
                placeholder="Username"
                className="App-input"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="App-input"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <button
                type="submit"
                className="App-button"
                onClick={() => {
                  handleLogin();
                }}
              >
                Login
              </button>
              <button
                type="submit"
                className="Register-button"
                onClick={() => {
                  handleRegister();
                }}
              >
                Register
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
