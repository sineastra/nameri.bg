import React from 'react'
import { Route, Routes } from "react-router-dom"
import HomePage from "../../Pages/HomePage/HomePage.jsx"
import CategoriesPage from "../../Pages/Categories/CategoriesPage.jsx"
import Subcategories from "../../Pages/Subcategories/Subcategories.jsx"
import SubcategoryListings from "../../Pages/SubcategoryListings/SubcategoryListings.jsx"
import AddService from "../../Pages/AddService/AddService.jsx"
import Messages from "../../Pages/Messages/Messages.jsx"
import ListingDetails from "../../Pages/ListingDetails/ListingDetails.jsx"
import ProfilePage from "../../Pages/ProfilePage/ProfilePage.jsx"
import ProfileEdit from "../../Pages/ProfileEdit/ProfileEdit.jsx"
import Auth from "../../Pages/Auth/Auth.jsx"
import ErrorPage from "../../Pages/ErrorPage/ErrorPage.jsx"


const AppRouter = () => {
	return (
		<Routes>
			<Route exact path="/" element={ <HomePage/> }/>
			<Route path="/categories" element={ <CategoriesPage/> }/>
			<Route exact path="/categories/:id" element={ <Subcategories/> }/>
			<Route path="/categories/subcategories/:id" element={ <SubcategoryListings/> }/>
			<Route path="/sign-up" element={ <Auth authType={ "register" }/> }/>
			<Route path="/sign-in" element={ <Auth authType={ "login" }/> }/>
			<Route path="/add-service" element={ <AddService/> }/>
			<Route path="/messages" element={ <Messages/> }/>
			<Route path="/details/:id" element={ <ListingDetails/> }/>
			<Route path="/profile/:id" element={ <ProfilePage/> }/>
			<Route path="/profile-edit" element={ <ProfileEdit/> }/>
			<Route path="/error" element={ <ErrorPage/> }/>
		</Routes>
	)
}

export default AppRouter