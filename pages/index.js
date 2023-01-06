import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";


export default function Home() {
  const [temperature, setTemperature] = useState(0.5);
  const [sceneInput, setSceneInput] = useState("");
  const [result, setResult] = useState();
  console.log(result);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          scene: sceneInput,
          temperature: temperature, 
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setSceneInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Mystery Generator</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Set a Mystery</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="scene"
            placeholder="Enter an location"
            value={sceneInput}
            onChange={(e) => setSceneInput(e.target.value)}
          />
          {/* Add the range slider */}
          <label htmlFor="temperature">Temperature:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            id="temperature"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
          <span>{temperature}</span>
          <input type="submit" value="Generate scene" />

        </form>
        <div className={styles.result}>{result}</div>
        


      </main>
    </div>
  );
}
