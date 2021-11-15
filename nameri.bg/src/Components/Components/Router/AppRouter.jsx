import React from 'react'
import { Route, Routes } from "react-router-dom"
import HomePage from "../../Pages/HomePage/HomePage.jsx"
import CategoriesPage from "../../Pages/Categories/CategoriesPage.jsx"
import Subcategories from "../../Pages/Subcategories/Subcategories.jsx"
import CustomerServices from "../../Pages/CustomerServices/CustomerServices.jsx"


const AppRouter = () => {
	return (
		<Routes>
			<Route exact path="/" element={<HomePage/>}/>
			<Route path="/categories" element={<CategoriesPage/>}/>
			<Route path="/categories/:id" element={<Subcategories/>}/>
			<Route path="/categories/:cId/subcategories/:sId" element={<CustomerServices/>}/>
		</Routes>
	)
}

export default AppRouter