import React from "react";

export default function PanelUp() {
  return (
    <div className="flex z-10 justify-center fixed top-16 w-full">
      <h3 className="w-1/4 bg-teal-600 py-2 text-center font-bold text-xl">Kategori Menu</h3>
      <h3 className="w-1/2 bg-teal-700 py-3 text-center font-bold text-2xl">Daftar Menu</h3>
      <h3 className="w-1/4 bg-teal-600 py-2 text-center font-bold text-xl">Keranjang</h3>
    </div>
  );
}
