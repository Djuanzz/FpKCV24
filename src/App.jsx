import React, { useState } from "react";
import huan from "./assets/huan.jpeg";
import alpan from "./assets/alpan.jpeg";
import wendi from "./assets/wendi.jpeg";
import "./App.css";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [movieData, setMovieData] = useState([]);
  // const [showData, setShowData] = useState(false);

  async function sendData() {
    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plot: inputText }),
      });
      const data = await response.json();
      setMovieData(data.data);
      // movieData.push(data);
      console.log(movieData);
      // console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleInputChange(event) {
    setInputText(event.target.value);
  }

  return (
    <>
      <main className="w-full h-screen bg-kuneng flex flex-col justify-center items-center ">
        <h1 className="flex text-[50px] font-bold text-biru">
          FP KACEVE YA GES YA
        </h1>

        <div className="flex items-start">
          <div className="flex flex-col items-center">
            <div className="input flex justify-center items-center m-5 flex-col">
              <textarea
                name="input"
                id="1"
                cols="120"
                rows="7"
                className="border-2 rounded-lg border-yellow p-3"
                placeholder="Alur film seperti apa yang ingin kamu tonton?"
                value={inputText}
                onChange={handleInputChange}></textarea>

              <button
                onClick={sendData}
                className="flex bg-biru text-white font-bold p-2 rounded-lg mt-5">
                Search
              </button>
            </div>

            {movieData.top_titles ? (
              <div className="bg-biru m-5 p-3 text-white font-bold rounded-lg overflow-hidden">
                <h1 className="item-center flex justify-center">List Film</h1>
                <table className="border-collapse border border-slate-400 p-2">
                  <thead>
                    <tr>
                      <th className="border border-slate-300 p-2">No</th>
                      <th className="border border-slate-300 p-2">Film</th>
                      <th className="border border-slate-300 p-2">Tahun</th>
                      <th className="border border-slate-300 p-2">Wiki</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movieData.top_titles.map((title, index) => (
                      <tr key={index}>
                        <td className="border border-slate-300 p-2">
                          {index + 1}
                        </td>
                        <td className="border border-slate-300 p-2">{title}</td>
                        <td className="border border-slate-300 p-2">
                          {movieData.top_year[index]}
                        </td>
                        <td className="border border-slate-300 p-2">
                          <a
                            href={movieData.top_wiki[index]}
                            target="_blank"
                            rel="noopener noreferrer">
                            {movieData.top_wiki[index]}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="foto-kita flex flex-col justify-center items-center bg-biru rounded-lg w-fit">
                <div className="title">
                  <h1 className="font-bold text-white text-[25px] pt-2">
                    Kita semangat terus kok
                  </h1>
                </div>

                <div className="fotos flex justify-center items-center">
                  <div className="flex flex-col justify-center items-center text-white pb-3">
                    <img src={huan} alt="" className="personil" />
                    <h1>Juan | 5025221155</h1>
                  </div>
                  <div className="flex flex-col justify-center items-center text-white pb-3">
                    <img src={alpan} alt="" className="personil" />
                    <h1>Alfan | 5025221275</h1>
                  </div>
                  <div className="flex flex-col justify-center items-center text-white pb-3">
                    <img src={wendi} alt="" className="personil" />
                    <h1>Wendy | 5025221162</h1>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* <div className="bg-biru m-5 p-3 text-white font-bold rounded-lg">
            <h1 className="item-center flex justify-center">List Film</h1>
            <div>
              {movieData.length > 0 ? (
                // Tampilkan data hanya jika movieData tidak kosong
                movieData.map((movie, index) => (
                  <div key={index}>
                    <h1>
                      {index + 1}. {movie}
                    </h1>
                  </div>
                ))
              ) : (
                // Tampilkan teks "No data available" jika movieData kosong
                <p>No data available</p>
              )}
            </div>
          </div> */}
        </div>
      </main>
    </>
  );
};

export default App;

