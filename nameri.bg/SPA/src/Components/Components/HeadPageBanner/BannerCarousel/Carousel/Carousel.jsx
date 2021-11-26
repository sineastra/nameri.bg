import { useState, useEffect, useContext } from 'react'
import Slide from "../Slide/Slide.jsx"
import styled from "styled-components"
import profPic1 from "../../../../../assets/images/profile-pic1.webp"
import profPic2 from "../../../../../assets/images/profile-pic2.webp"
import profPic3 from "../../../../../assets/images/profile-pic3.webp"
import banner1 from "../../../../../assets/images/hero-instance-2--desktop.webp"
import banner2 from "../../../../../assets/images/hero-instance-4--desktop.webp"
import banner3 from "../../../../../assets/images/hero-instance-5--desktop.webp"
import NavDot from "../NavDot/NavDot.jsx"
import listingsServices from "../../../../../services/listingsServices.js"
import ErrorContext from "../../../../../Contexts/ErrorContext.jsx"
import { useNavigate } from "react-router-dom"


const StyledNavDot = styled(NavDot)`
  display: inline-block;`

const StyledLi = styled.li`
  list-style: none;
  display: inline-block;
`

const NavDotsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const NavDotsInnerCont = styled.ul`
  display: inline-flex;
  width: 20%;
  justify-content: space-around;
`

const fakeDb = {
	users: [{
		id: 1,
		profileImg: profPic1,
		profession: 'Patladjan',
		fullName: "Pesho Kalibrata",
		rating: 4.5,
		votedUsers: 100,
	}, {
		id: 2,
		profileImg: profPic2,
		profession: 'Patladjan',
		fullName: "Gosho",
		rating: 4.5,
		votedUsers: 100,
	}, {
		id: 3,
		profileImg: profPic3,
		profession: 'Patladjan',
		fullName: "Siika",
		rating: 4.5,
		votedUsers: 100,
	}],
	banners: [banner1, banner2, banner3],
}

const Carousel = () => {
	const navigate = useNavigate()
	const [activeId, setActiveId] = useState(0)
	const [carouselData, setCarouselData] = useState([])

	useEffect(async () => {
		try {
			const data = await listingsServices.getBest(2)
			setCarouselData(data)
			setActiveId(1)
		} catch (e) {
			navigate("/error", {
				state: {
					statusCode: e.statusCode,
					status: e.status,
				},
			})
		}

	}, [])

	return (
		<section>
			{ carouselData.map(listing =>
				<Slide
					user={ listing.user }
					img={ listing.mainImg }
					key={ listing._id }
					activeId={ activeId }
				/>)
			}
			<NavDotsContainer>
				<NavDotsInnerCont>
					{ carouselData.map(({ user }) => (
						<StyledLi>
							<StyledNavDot
								key={ user._id }
								id={ user._id }
								activeId={ activeId }
								changeId={ setActiveId }
							/>
						</StyledLi>
					)) }
				</NavDotsInnerCont>
			</NavDotsContainer>
		</section>
	)
}

export default Carousel