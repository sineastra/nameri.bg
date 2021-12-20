import { useState, useEffect, useContext, useRef } from 'react'
import Slide from "../Slide/Slide.jsx"
import styled from "styled-components"
import NavDot from "../NavDot/NavDot.jsx"
import HomePageContext from "../../../../Contexts/HomePageContext.jsx"
import useInterval from "../../../../../hooks/useInterval.jsx"


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

const SlidesWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 90%;
`

const Carousel = ({ className }) => {
	const [activeId, setActiveId] = useState(0)
	const [timeDelay, setTimeDelay] = useState(null)
	const [contextData] = useContext(HomePageContext)
	const carouselData = contextData.listings
	const isFirstSlide = useRef(true)

	const changeActiveIDIdle = () => {
		const index = carouselData.findIndex(x => x._id === activeId)
		const newIndex = carouselData[index + 1] ? index + 1 : 0

		if (isFirstSlide.current) {
			isFirstSlide.current = false
		}

		setActiveId(carouselData[newIndex]._id)
	}

	useInterval(changeActiveIDIdle, timeDelay)

	const changeActiveIdClick = (newId) => {

		if (activeId !== newId) {
			setTimeDelay(null)
			setActiveId(newId)
		}

		if (isFirstSlide.current) {
			isFirstSlide.current = false
		}

	}

	useEffect(() => {
		if (carouselData) {
			setTimeDelay(4000)
			setActiveId(carouselData[0]._id)
		}
	}, [carouselData])

	useEffect(() => {
		if (timeDelay === null) {
			setTimeDelay(4000)
		}
	}, [timeDelay])

	return (
		carouselData
			? <section className={ className }>
				<SlidesWrapper>
					{ carouselData.map((listing, index) =>
						<Slide
							listing={ listing }
							key={ listing._id }
							activeId={ activeId }
							isFirstSlide={ isFirstSlide }
							index={ index }
						/>) }
				</SlidesWrapper>
				<NavDotsContainer>
					<NavDotsInnerCont>
						{ carouselData.map((listing) => (<StyledLi key={ listing._id }>
							<StyledNavDot
								id={ listing._id }
								activeId={ activeId }
								changeId={ changeActiveIdClick }
							/>
						</StyledLi>)) }
					</NavDotsInnerCont>
				</NavDotsContainer>
			</section>
			: null
	)
}

export default Carousel