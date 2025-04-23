import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../assets/apis/Api";
import Swal from "sweetalert2";

export default function TotalPesanan({ keranjang, setKeranjang }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totals = keranjang.reduce((acc, item) => acc + item.harga, 0);
    setTotal(totals);
  }, [keranjang]);

  const handlePayment = async () => {
    if (!total) return alert("keranjang masih kosong!!!");

    const fetchData = async () => {
      try {
        const response = await axios.post(`${API_URL}pesanan`, {
          id: Date.now(),
          keranjang: keranjang,
          total: total,
        });

        Swal.fire({
          title: "Berhasil",
          text: "Membuat Pesanan",
          timer: 1000,
          showConfirmButton: false,
          icon: "success",
        });

        await Promise.all(keranjang.map((item) => axios.delete(`${API_URL}keranjangs/${item.id}`)));
        setKeranjang([]);
      } catch {
        (error) => console.log(error);
      }
    };

    fetchData();
  };

  return (
    <div className="bg-amber-400 ">
      <div className="flex items-center justify-around p-3 text-white">
        <p className="font-semibold text-lg">Total Bayar :</p>
        <div className="">Rp. {total?.toLocaleString()}</div>
      </div>
      <button onClick={handlePayment} className="btn btn-primary w-100 ">
        Buat Pesanan
      </button>
    </div>
  );
}
