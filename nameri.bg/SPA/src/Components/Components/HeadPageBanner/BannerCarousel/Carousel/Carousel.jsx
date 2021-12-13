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
import ErrorContext from "../../../../Contexts/ErrorContext.jsx"
import { useNavigate } from "react-router-dom"
import HomePageContext from "../../../../Contexts/HomePageContext.jsx"


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
  padding: 0;

  @media screen and (max-width: 400px) {
    width: 40%;
    justify-content: space-between;
  }
`

const Carousel = ({ className }) => {
	const [activeId, setActiveId] = useState(0)
	const [contextData] = useContext(HomePageContext)
	const carouselData = contextData.listings

	useEffect(() => {
		if (carouselData) {
			setActiveId(carouselData[0]._id)
		}
	}, [carouselData])

	return (
		carouselData
			? <section className={ className }>
				{ carouselData.map(listing =>
					<Slide
						listing={ listing }
						key={ listing._id }
						activeId={ activeId }
					/>)
				}
				<NavDotsContainer>
					<NavDotsInnerCont>
						{ carouselData.map((listing) => (
							<StyledLi key={ listing._id }>
								<StyledNavDot
									id={ listing._id }
									activeId={ activeId }
									changeId={ setActiveId }
								/>
							</StyledLi>
						)) }
					</NavDotsInnerCont>
				</NavDotsContainer>
			</section>
			: null
	)
}

export default Carousel