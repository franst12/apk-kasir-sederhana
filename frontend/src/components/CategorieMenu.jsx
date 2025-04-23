import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../assets/apis/Api";
import { NavLink } from "react-router-dom";
import { MdFoodBank, MdNoDrinks } from "react-icons/md";
import { BiSolidDrink } from "react-icons/bi";
import { IoFastFood } from "react-icons/io5";

export default function CategorieMenu({ onSelectCategori }) {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get(API_URL + "categories")
        .then((res) => setMenus(res.data))
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  const handleClickCategorie = (e) => {
    const selectMenuCategory = e;
    // console.log(selectMenuCategory);
    onSelectCategori(selectMenuCategory);
  };

  const MenuIcon = ({ menus }) => {
    if (menus === "Makanan") return <MdFoodBank className="text-2xl" />;
    if (menus === "Minuman") return <BiSolidDrink className="text-2xl" />;
    if (menus === "Camilan") return <IoFastFood className="text-2xl" />;
  };
  const isActive = ({ isActive }) => (isActive ? "bg-base-300" : "");

  return (
    <div>
      <div className="">
        <ul className="menu bg-base-200 rounded-box w-56">
          {menus.map((item) => (
            <div key={item.id}>
              <NavLink className={isActive}>
                <li onClick={() => handleClickCategorie(item.nama)} className="py-3 px-2 font-semibold ">
                  <span>
                    <MenuIcon menus={item.nama} />
                    {item.nama.toUpperCase()}
                  </span>
                </li>
              </NavLink>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
