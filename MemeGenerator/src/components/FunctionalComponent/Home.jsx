import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { Rnd } from "react-rnd";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [images, setImages] = useState([]);
  const [texts, setTexts] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [color, setColor] = useState("#000000"); 
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () =>
      setImages([...images, { src: reader.result, id: Date.now() }]);
    reader.readAsDataURL(file);
  };

  const addText = () => {
    setTexts([
      ...texts,
      { content: "New Text", id: Date.now(), x: 50, y: 50, color },
    ]);
  };

  const addShape = (shapeType) => {
    setShapes([
      ...shapes,
      {
        id: Date.now(),
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        shapeType,
        color,
      },
    ]);
  };

  const handleDownload = () => {
    const workspace = document.getElementById("workspace");
    html2canvas(workspace).then((canvas) => {
      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "Delete" &&
        selectedElement &&
        document.activeElement.contentEditable !== "true"
      ) {
        const { type, id } = selectedElement;
        if (type === "image") {
          setImages(images.filter((image) => image.id !== id));
        } else if (type === "text") {
          setTexts(texts.filter((text) => text.id !== id));
        } else if (type === "shape") {
          setShapes(shapes.filter((shape) => shape.id !== id));
        }
        setSelectedElement(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedElement, images, texts, shapes]);

  const selectElement = (type, id) => {
    if (selectedElement) {
      const previousElement = document.getElementById(selectedElement.id);
      if (previousElement) {
        previousElement.classList.remove("selected");
      }
    }

    setSelectedElement({ type, id });
    const element = document.getElementById(id);
    if (element) {
      element.classList.add("selected");
    }
  };

  const updateTextContent = (id, newContent) => {
    setTexts(
      texts.map((text) =>
        text.id === id ? { ...text, content: newContent } : text
      )
    );
  };

  const updateElementColor = (color) => {
    if (selectedElement) {
      const { type, id } = selectedElement;
      if (type === "text") {
        setTexts(
          texts.map((text) => (text.id === id ? { ...text, color } : text))
        );
      } else if (type === "shape") {
        setShapes(
          shapes.map((shape) => (shape.id === id ? { ...shape, color } : shape))
        );
      }
    }
  };
  const handleSave = () => {
    const workspace = document.getElementById("workspace");
    html2canvas(workspace).then((canvas) => {
      const savedImages = JSON.parse(localStorage.getItem("savedImages")) || [];
      savedImages.push(canvas.toDataURL());
      localStorage.setItem("savedImages", JSON.stringify(savedImages));
    });
  };

  return (
    <div className="home">
      <nav className="nav-bar">
        <div className="nav-content">
          <div className="nav-title">Meme Generator</div>
          <ol className="nav-list">
            <li>
              <Link to="/home" className="link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/mycol" className="link">
                My Collection
              </Link>
            </li>
            <li>
              <Link to="/" className="link">
                Logout
              </Link>
            </li>
          </ol>
        </div>
      </nav>

      <div className="toolbar">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={addText}>Add Text</button>
        <select
          onChange={(e) => addShape(e.target.value)}
          defaultValue=""
          className="dropdown"
        >
          <option value="" disabled>
            Select Shape
          </option>
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
          <option value="square">Square</option>
          <option value="triangle">Triangle</option>
          <option value="oval">Oval</option>
        </select>
        <input
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value); 
            updateElementColor(e.target.value);
          }}
        />
        <button onClick={handleDownload}>Download</button>
        <button onClick={handleSave}>Save</button>
      </div>

      <div id="workspace" className="workspace">
        {images.map((image) => (
          <Rnd
            key={image.id}
            id={image.id}
            default={{ x: 50, y: 50, width: 200, height: 200 }}
            bounds="parent"
            onClick={() => selectElement("image", image.id)}
          >
            <img src={image.src} alt="meme" className="workspace-image" />
          </Rnd>
        ))}
        {texts.map((text) => (
          <Rnd
            key={text.id}
            id={text.id}
            default={{ x: text.x, y: text.y, width: 200, height: 50 }}
            bounds="parent"
            onClick={() => selectElement("text", text.id)}
          >
            <div
              contentEditable
              suppressContentEditableWarning
              className="workspace-text"
              style={{ color: text.color }}
              onBlur={(e) => updateTextContent(text.id, e.target.textContent)}
            >
              {text.content}
            </div>
          </Rnd>
        ))}
        {shapes.map((shape) => (
          <Rnd
            key={shape.id}
            id={shape.id}
            default={{
              x: shape.x,
              y: shape.y,
              width: shape.width,
              height: shape.height,
            }}
            bounds="parent"
            onClick={() => selectElement("shape", shape.id)}
            className="workspace-shape"
            style={{
              backgroundColor:
                shape.shapeType === "circle" || shape.shapeType === "square"
                  ? shape.color
                  : "transparent",
              borderRadius:
                shape.shapeType === "circle" ? "50%" :
                shape.shapeType === "oval" ? "50% / 25%" :
                "0",
              border:
                shape.shapeType === "triangle"
                  ? `2px solid ${shape.color}`
                  : `2px solid ${shape.color}`,
              width: shape.shapeType === "triangle" ? 0 : shape.width,
              height: shape.shapeType === "triangle" ? 0 : shape.height,
              clipPath:
                shape.shapeType === "triangle"
                  ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                  : "none",
            }}
          />
        ))}
        {images.length === 0 && texts.length === 0 && shapes.length === 0 && (
          <p style={{ color: "gray", textAlign: "center" }}>
            No elements added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
