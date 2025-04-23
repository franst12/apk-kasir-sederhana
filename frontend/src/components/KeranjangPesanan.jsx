import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../assets/apis/Api";
import TotalPesanan from "./TotalPesanan";
import KeranjangMenu from "./KeranjangMenu";

export default function KeranjangPesanan({ menuItem }) {
  const [keranjang, setKeranjang] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}keranjangs`);
        const keranjangs = response.data;

        setKeranjang(keranjangs);
      } catch {
        (error) => {
          console.log(error);
        };
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!menuItem || !menuItem.id) return;

    const MenuItemExist = keranjang.find((item) => item.id === menuItem.id);

    if (MenuItemExist) {
      const updateKeranjang = keranjang.map((item) =>
        item.id === menuItem.id
          ? {
              ...item,
              qty: item.qty + 1,
              harga: item.harga + menuItem.harga,
            }
          : item
      );

      setKeranjang(updateKeranjang);

      axios
        .put(`${API_URL}keranjangs/${MenuItemExist.id}`, {
          harga: MenuItemExist.harga + menuItem.harga,
          id: menuItem.id,
          nama: menuItem.nama,
          gambar: menuItem.gambar,
          category: menuItem.category,
          qty: MenuItemExist.qty + 1,
        })
        .then((response) => console.log("item diupdate", response.data))
        .catch((err) => console.log("gagal  update item", err));
    } else {
      const newMenuItem = { ...menuItem, qty: 1, unitPrice: menuItem.harga };
      setKeranjang((prev) => [...prev, newMenuItem]);

      axios
        .post(`${API_URL}keranjangs`, newMenuItem)
        .then((response) => console.log("item Baru ditambahakan", response.data))
        .catch((err) => console.log("gagal menambahkan", err));
    }
  }, [menuItem]);

  return (
    <div className="h-screen flex flex-col">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <h3 className="p-4 pb-2 text-xs opacity-60 tracking-wide">Keranjang Pesanan</h3>
        {keranjang.length > 0 ? (
          keranjang.map((item, index) => {
            const gambarPath = item.category && item.category.nama ? `/assets/${item.category.nama.toLowerCase()}/${item.gambar}` : "/assets/default.jpeg";

            return (
              <li key={index}>
                <KeranjangMenu item={item} gambar={gambarPath} setKeranjang={setKeranjang} keranjang={keranjang} />
              </li>
            );
          })
        ) : (
          <h2>Keranjang masih kosong</h2>
        )}
      </ul>
      <div className="w-100 rounded-lg overflow-hidden fixed bottom-0 mx-14 fixed-bottom ">
        <TotalPesanan keranjang={keranjang} setKeranjang={setKeranjang} />
      </div>
    </div>
  );
}
