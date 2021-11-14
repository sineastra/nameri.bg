import React from 'react'
import { Route, Routes } from "react-router-dom"
import HomePage from "../../Pages/HomePage/HomePage.jsx"
import CategoriesPage from "../../Pages/Categories/CategoriesPage.jsx"


const AppRouter = () => {
	return (
		<Routes>
			<Route exact path="/" element={<HomePage/>}/>
			<Route path="/categories" element={<CategoriesPage/>}/>
		</Routes>
	)
}

export default AppRouter