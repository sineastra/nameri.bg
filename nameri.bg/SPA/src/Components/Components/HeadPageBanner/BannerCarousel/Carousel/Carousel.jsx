import { useState, useEffect, useContext } from 'react'
import Slide from "../Slide/Slide.jsx"
import styled from "styled-components"
import NavDot from "../NavDot/NavDot.jsx"
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