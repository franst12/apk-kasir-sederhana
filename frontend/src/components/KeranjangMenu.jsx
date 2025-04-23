import React from "react";
import { API_URL } from "../assets/apis/Api";
import axios from "axios";

export default function KeranjangMenu({ item, gambar, setKeranjang, keranjang }) {
  const handleEditPesanan = (itemId, qty) => {
    const newQty = parseInt(qty);
    if (isNaN(newQty) || newQty < 1) return;

    const updatedKeranjang = keranjang.map((menuItem) =>
      menuItem.id === itemId
        ? {
            ...menuItem,
            qty: newQty,
            harga: menuItem.unitPrice ? menuItem.unitPrice * newQty : menuItem.harga * (newQty / menuItem.qty), // fallback perhitungan
          }
        : menuItem
    );

    setKeranjang(updatedKeranjang);

    axios
      .put(`${API_URL}keranjangs/${itemId}`, {
        qty: newQty,
        harga: item.unitPrice ? item.unitPrice * newQty : item.harga * (newQty / item.qty),
      })
      .then((res) => console.log("qty updated", res.data))
      .catch((err) => console.log("gagal update", err));
  };

  const handleDelete = (itemId) => {
    const updateKeranjang = keranjang.filter((menuItems) => menuItems.id !== itemId);

    axios
      .delete(`${API_URL}keranjangs/${itemId}`)
      .then((res) => item.id === itemId && setKeranjang(updateKeranjang))
      .catch((err) => console.log("gagal menghapus", err));
  };

  return (
    <div>
      <div className="list-row flex items-center justify-between p-2 border-b">
        <div className="flex items-center gap-2">
          <img className="size-10 rounded-box" src={gambar} alt={item.nama} />
          <div>
            <div className="font-semibold">{item.nama}</div>
            <div className="text-xs uppercase font-semibold opacity-60">Rp. {item.harga?.toLocaleString("id-ID")}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input type="number" min="1" value={item.qty} onChange={(e) => handleEditPesanan(item.id, e.target.value)} className="w-16 p-1 text-center border rounded" />
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
