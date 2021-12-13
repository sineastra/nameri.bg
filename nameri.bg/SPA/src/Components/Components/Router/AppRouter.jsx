import { lazy, Suspense } from 'react'
import { Route, Routes } from "react-router-dom"
import Spinner from "../Spinner/Spinner.jsx"


const HomePage = lazy(() => import("../../Pages/HomePage/HomePage.jsx"))
const CategoriesPage = lazy(() => import("../../Pages/Categories/CategoriesPage.jsx"))
const Subcategories = lazy(() => import("../../Pages/Subcategories/Subcategories.jsx"))
const SubcategoryListings = lazy(() => import("../../Pages/SubcategoryListings/SubcategoryListings.jsx"))
const AddListing = lazy(() => import("../../Pages/AddListing/AddListing.jsx"))
const Messages = lazy(() => import("../../Pages/Messages/Messages.jsx"))
const ListingDetails = lazy(() => import("../../Pages/ListingDetails/ListingDetails.jsx"))
const Profile = lazy(() => import("../../Pages/Profile/Profile.jsx"))
const ProfileEdit = lazy(() => import("../../Pages/ProfileEdit/ProfileEdit.jsx"))
const Auth = lazy(() => import("../../Pages/Auth/Auth.jsx"))
const ErrorPage = lazy(() => import("../../Pages/ErrorPage/ErrorPage.jsx"))

const AppRouter = () => {
	return (
		<Suspense fallback={ <Spinner/> }>
			<Routes>
				<Route exact path="/" element={ <HomePage/> }/>
				<Route path="/categories" element={ <CategoriesPage/> }/>
				<Route exact path="/categories/:id" element={ <Subcategories/> }/>
				<Route path="/categories/subcategories/:id" element={ <SubcategoryListings/> }/>
				<Route path="/sign-up" element={ <Auth authType={ "register" }/> }/>
				<Route path="/sign-in" element={ <Auth authType={ "login" }/> }/>
				<Route path="/add-listing" element={ <AddListing/> }/>
				<Route path="/messages" element={ <Messages/> }/>
				<Route path="/details/:id" element={ <ListingDetails/> }/>
				<Route path="/profile/:id" element={ <Profile/> }/>
				<Route path="/profile/edit" element={ <ProfileEdit/> }/>
				<Route path="/error" element={ <ErrorPage/> }/>
			</Routes>
		</Suspense>
	)
}

export default AppRouter