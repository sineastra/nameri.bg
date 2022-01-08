import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes } from "react-router-dom"

import Spinner from "../Spinner/Spinner.jsx"
import ErrorPage from "../../Pages/ErrorPage/ErrorPage.jsx"


const HomePage = lazy(() => import("../../Pages/HomePage/HomePage.jsx"))
const CategoriesPage = lazy(() => import("../../Pages/Categories/CategoriesPage.jsx"))
const Subcategories = lazy(() => import("../../Pages/Subcategories/Subcategories.jsx"))
const SubcategoryListings = lazy(() => import("../../Pages/SubcategoryListings/SubcategoryListings.jsx"))
const ListingForm = lazy(() => import("../../Pages/ListingFormPage/ListingFormPage.jsx"))
const Messages = lazy(() => import("../../Pages/Messages/Messages.jsx"))
const ListingDetails = lazy(() => import("../../Pages/ListingDetails/ListingDetails.jsx"))
const Profile = lazy(() => import("../../Pages/Profile/Profile.jsx"))
const ProfileEdit = lazy(() => import("../../Pages/ProfileEdit/ProfileEdit.jsx"))
const Auth = lazy(() => import("../../Pages/Auth/Auth.jsx"))
const Search = lazy(() => import("../../Pages/Search/Search.jsx"))
const About = lazy(() => import("../../Pages/About/About.jsx"))
const ProtectedRoute = lazy(() => import("../../RouteGuards/ProtectedRoute.jsx"))
const OwnershipRoute = lazy(() => import("../../RouteGuards/OwnershipRoute.jsx"))
const TopUsers = lazy(() => import("../../Pages/TopUsers/TopUsers.jsx"))

const AppRouter = () => {

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	})

	return (
		<Suspense fallback={ <Spinner/> }>
			<Routes>

				{/*Public routes*/ }
				<Route exact path="/" element={ <HomePage/> }/>
				<Route path="/categories" element={ <CategoriesPage/> }/>
				<Route exact path="/categories/:id" element={ <Subcategories/> }/>
				<Route path="/categories/subcategories/:id" element={ <SubcategoryListings/> }/>
				<Route path="/details/:id" element={ <ListingDetails/> }/>
				<Route path="/profile/:id" element={ <Profile/> }/>
				<Route path="/search" element={ <Search/> }/>
				<Route path="/top-users" element={ <TopUsers/> }/>
				<Route path="/about" element={ <About/> }/>
				{/*End of public routes*/ }

				{/*Public ONLY routes*/ }
				<Route path="/sign-up" element={
					<ProtectedRoute type="public">
						<Auth authType={ "register" }/>
					</ProtectedRoute> }
				/>
				<Route path="/sign-in" element={
					<ProtectedRoute type="public">
						<Auth authType={ "login" }/>
					</ProtectedRoute> }
				/>
				{/*End of public ONLY routes*/ }

				{/*LoggedIn ONLY routes*/ }
				<Route path="/add-listing" element={
					<ProtectedRoute type="private">
						<ListingForm formType="add"/>
					</ProtectedRoute>
				}/>
				<Route path="/messages" element={
					<ProtectedRoute type="private">
						<Messages/>
					</ProtectedRoute>
				}/>
				<Route path="/profile/edit" element={
					<ProtectedRoute type="private">
						<ProfileEdit/>
					</ProtectedRoute>
				}/>

				{/*This one requires and that you own the item*/ }
				<Route path="/edit-listing/:id" element={
					<ProtectedRoute type="private">
						<OwnershipRoute type="listing">
							<ListingForm formType="edit"/>
						</OwnershipRoute>
					</ProtectedRoute>
				}/>
				{/*End of LoggedIn ONLY routes*/ }

				<Route path="*" element={ <ErrorPage/> }/>
			</Routes>
		</Suspense>
	)
}

export default AppRouter
