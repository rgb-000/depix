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

function computeChangeRows(imageData: ImageData): [number, number][] {
  const rowLen = imageData.width * 1;
  const changeRows: [number, number][] = [];
  let lastChangeY = 0;
  for (let y = 1; y < imageData.height; y++) {
    const lastOffset = (y - 1) * rowLen;
    const thisOffset = y * rowLen;
    const nextOffset = (y + 1) * rowLen;
    const lastRow = imageData.data.subarray(lastOffset, thisOffset - 1);
    const row = imageData.data.subarray(thisOffset, nextOffset - 1);
    if (!row.every((v, i) => v === lastRow[i])) {
      changeRows.push([lastChangeY, y]);
      lastChangeY = y;
    }
  }
  return changeRows;
}

function getCounts<T>(arr: readonly T[]): [Map<T, number>, number] {
  const counts: Map<T, number> = new Map();
  let highestCount = 0;
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i];
    const count = (counts.get(key) || 0) + 1;
    counts.set(key, count);
    highestCount = count > highestCount ? count : highestCount;
  }
  return [counts, highestCount];
}

function mostCommon<T>(arr: readonly T[]): [T | undefined, number] {
  const [counts, highestCount] = getCounts(arr);
  for (const [key, count] of counts) {
    if (count === highestCount) return [key, count];
  }
  return [undefined, 0];
}

function App() {
  const [input, setInput] = React.useState<InputImage | null>();
  const [scaleFactor, setScaleFactor] = React.useState<number>(1);
  const originalCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const scaledCanvasRef = React.useRef<HTMLCanvasElement>(null);

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
    const canvas = originalCanvasRef.current;
    if (!(input && canvas)) {
      return;
    }
    const width = (canvas.width = input.image.width);
    const height = (canvas.height = input.image.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.fillStyle = "cyan";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(input.image, 0, 0);
    const changeRows = computeChangeRows(ctx.getImageData(0, 0, width, height));
    changeRows.forEach(([y0, y1], i) => {
      ctx.fillStyle = "cyan";
      ctx.fillRect(width / 2 + (i % 2) * 5, y0, 2, y1 - y0);
    });
    const runs = changeRows.map(([a, b]) => b - a);
    const [mostCommonHeight] = mostCommon(runs);
    if (!mostCommonHeight) return;
    setScaleFactor(mostCommonHeight);
  }, [originalCanvasRef.current, input]);
  React.useEffect(() => {
    const canvas = scaledCanvasRef.current;
    if (!(input && canvas)) {
      return;
    }
    const width = (canvas.width = input.image.width * 8);
    const height = (canvas.height = input.image.height * 8);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(input.image, 0, 0, width, height);
  }, [scaledCanvasRef.current, input, scaleFactor]);
  return (
    <div id="container">
      <div>
              <div className="help">                <span><h1>Pixel art upscale tool</h1></span><br/>
                  <span>Upscale your Solsunsets (or any pixel art) here for high quality printing output. Just upload the image, then right click + save.</span><ul><li>Output for banner: 16000 x 5344px (3:1)</li><li>Output for pfp: 6144 x 6144px (1:1)
                </li></ul>
              </div>
        <div><label>
                  
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label></div>
      </div>
      <canvas ref={scaledCanvasRef} style={{ imageRendering: "pixelated" }} />
    </div>
  );
}

export default App;
