import React from 'react'
import { Route, Routes } from "react-router-dom"
import HomePage from "../../Pages/HomePage/HomePage.jsx"
import CategoriesPage from "../../Pages/Categories/CategoriesPage.jsx"
import Subcategories from "../../Pages/Subcategories/Subcategories.jsx"
import CustomerServices from "../../Pages/CustomerServices/CustomerServices.jsx"
import Register from "../../Pages/Register/Register.jsx"
import Login from "../../Pages/Login/Login.jsx"
import AddService from "../../Pages/AddService/AddService.jsx"
import Messages from "../../Pages/Messages/Messages.jsx"
import ServiceDetails from "../../Pages/ServiceDetails/ServiceDetails.jsx"
import ProfilePage from "../../Pages/ProfilePage/ProfilePage.jsx"


const AppRouter = () => {
	return (
		<Routes>
			<Route exact path="/" element={ <HomePage/> }/>
			<Route path="/categories" element={ <CategoriesPage/> }/>
			<Route path="/categories/:id" element={ <Subcategories/> }/>
			<Route path="/categories/:cId/subcategories/:sId" element={ <CustomerServices/> }/>
			<Route path="/sign-up" element={ <Register/> }/>
			<Route path="/sign-in" element={ <Login/> }/>
			<Route path="/add-service" element={ <AddService/> }/>
			<Route path="/messages" element={ <Messages/> }/>
			<Route path="/details/:id" element={ <ServiceDetails/> }/>
			<Route path="/profile/:id" element={ <ProfilePage/> }/>
		</Routes>
	)
}

export default AppRouter