    import Dovi from "../assets/images/dovi.jpg";
    import mapfunde from "../assets/images/mapfunde.jpg";
    import zviyo from "../assets/images/zviyo.jpg";
    import mhunga from "../assets/images/mhunga.jpg";
    import huchi from "../assets/images/huchi.jpg";
    import type { Product } from "../types/products";
    const products: Product[] =[
        {id: 1,
        name: "Mhunga",
        price: "10.99",
        image: mhunga,
        category: "mhunga",
    },

        {id: 2,
        name: "Zviyo",
        price: "12.99",
        image: zviyo,
        category: "zviyo"
    },
        {id: 3,
        name: "Mapfunde",
        price: "9.99",
        image: mapfunde,
        category: "mapfunde"
    },
    {
        id: 4,
        name: "Dovi",
        price: "14.99",
        image: Dovi,
        category: "dovi"
    },
    {
        id: 5,
        name: "Huchi",
        price: "19.99",
        image: huchi,
        category: "huchi"
    }
]
export default products;