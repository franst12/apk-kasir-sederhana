import { useState } from "react";
import CategorieMenu from "../components/CategorieMenu";
import KeranjangPesanan from "../components/KeranjangPesanan";
import Menu from "../components/Menu";

export default function Home() {
  const [selectCategori, setSelectCategori] = useState("");
  const [menuItem, setMenuItem] = useState([]);

  return (
    <div className="mx-3 flex divide-x-3 mt-30">
      <div className="w-1/4 fixed left-0 flex justify-center mt-16">
        <CategorieMenu onSelectCategori={setSelectCategori} />
      </div>
      <div className="w-1/2 mx-auto">
        <Menu selectCategori={selectCategori} onHandleClickMenu={setMenuItem} />
      </div>
      <div className="w-1/4 fixed right-0">
        <KeranjangPesanan menuItem={menuItem} />
      </div>
    </div>
  );
}
