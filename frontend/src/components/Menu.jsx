import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../assets/apis/Api";
import { numberWithCommas } from "../assets/apis/number";
import { FaCartPlus } from "react-icons/fa";

export default function Menu({ selectCategori, onHandleClickMenu }) {
  const [data, setData] = useState([]);
  const [menuName, setMenuName] = useState(selectCategori);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datas = await axios.get(`${API_URL}products?category.nama=${selectCategori}`);
        const menu = datas.data;
        setData(menu);
      } catch {
        (err) => console.log(`Error ini terjadi karena ${err}`);
      }
    };
    fetchData();
  }, [selectCategori]);

  const handleClickMenu = (item) => {
    const handleItem = {
      id: item.id,
      nama: item.nama,
      harga: item.harga,
      gambar: item.gambar,
      category: item.category,
      qty: 1,
    };

    onHandleClickMenu(handleItem);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Menampilkan Menu: {selectCategori}</h2>
      <div>
        <ul className="grid grid-cols-3 gap-3 px-3 py-5 overflow-auto">
          {data.map((item, index) => {
            const gambarPath = item.category && item.category.nama ? `/assets/${item.category.nama.toLowerCase()}/${item.gambar}` : "/assets/default.jpeg";
            return (
              <li key={index} className="bg-white p-1 text-black rounded">
                <div className="w-object-fit-cover ">
                  <img className="w-full h-64" src={gambarPath} />
                </div>
                <div className="py-2 relative">
                  <h3 className="text-lg font-semibold">{item.nama}</h3>
                  <p className="font-semibold">Rp.{numberWithCommas(item.harga)}</p>
                  <div onClick={() => handleClickMenu(item)}>
                    <FaCartPlus className="absolute  right-1 bottom-1 text-3xl cursor-pointer hover:scale-[1.1] transition-all duration-200 text-slate-400 hover:text-red-500" />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
