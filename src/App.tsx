import React from "react";

interface InputImage {
  file: File;
  image: HTMLImageElement;
}

function loadImage(file: File): Promise<InputImage> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.addEventListener("load", (e) => {
      const url = fr.result;
      if (!url) {
        return reject("no file result");
      }
      const image = new Image();
      image.addEventListener("load", (e) => {
        resolve({ file, image });
      });
      image.addEventListener("error", reject);
      image.src = url.toString();
    });
    fr.addEventListener("error", reject);
    fr.readAsDataURL(file);
  });
}

function App() {
  const [input, setInput] = React.useState<InputImage | null>();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const handleImageChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        loadImage(file).then(setInput);
      }
    },
    []
  );
  React.useEffect(() => {
    let canvas = canvasRef.current;
    if (!(input && canvas)) {
      return;
    }
    canvas.width = input.image.width;
    canvas.height = input.image.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.drawImage(input.image, 0, 0);
  }, [canvasRef.current, input]);
  return (
    <div>
      <label>
        Pick image file:&nbsp;
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      <br />
      <canvas ref={canvasRef} />
    </div>
  );
}

export default App;
