import React, { useEffect,useState } from "react";
import "./app.component.css";
import { BannerComponent } from "./home/banner/banner.component";
import { showLabels } from "../services/label";
import { GridComponent } from "./common/grid-content/grid-content.component";
const HomeComponent = () => {
    let [banner, setBanner] =  useState([]);
    let [brand, setBrands] =  useState([]);

    const getAllBanners = async () => {
        try{
            let result = await showLabels('banner');
            if(result.status){
                setBanner(result.result);
            }
        } catch(error) {
            console.error("BannerError: ", error)
        }
    }

    const getAllBrands = async()=>{
        try{
            let result = await showLabels('brand', 12);
            if(result.status){
                setBrands(result.result)
            }
        } catch(error) {
            console.error("BrandError: ", error)
        }
    }

    useEffect(() => {
        getAllBanners();
        getAllBrands();
    },[])
    return (
        <>
            <BannerComponent 
                data={banner}
            />

            <GridComponent 
                title="Our Brands"
                data={brand}
            />

            
        </>
    );
}

export default HomeComponent;