import styled from 'styled-components'
import { FaStar } from "react-icons/fa"
import { Link } from "react-router-dom"


const ContainerSection = styled.section`
  position: relative;
  transition: opacity 1s ease-in-out;
  width: 100%;
  opacity: ${ props => props.active ? 1 : 0 };
  height: ${ props => props.active ? '100%' : 0 };
  overflow: ${ props => props.active ? 'auto' : 'hidden' };
`

const StyledFaStar = styled(FaStar)`
  color: orange`

const UserLink = styled(Link)`
  z-index: 1;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  width: 25%;
  height: 20%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  right: 0;
  bottom: 0;
  padding: 30px 15px;
  cursor: pointer;
  text-decoration: none;
  color: #1c1c1c;
  margin-right: 10px;
  margin-bottom: 10px;
`

const ImageSection = styled.section`
  width: 100%;
  height: 100%;
  position: relative;`

const StyledProfileImg = styled.img`
  border-radius: 200px;
  width: 40%;`

const StyledCarouselImg = styled.img`
  width: 100%;
  height: 100%;`

const Slide = ({ listing, activeId }) => {
	const profileImg = listing.user.profileImg === "" ? "profile.svg" : listing.user.profileImg

	return (
		<ContainerSection active={ activeId === listing._id }>
			<ImageSection>
				<StyledCarouselImg src={ listing.mainImg } alt="Service Front Image"/>
			</ImageSection>
			<section>
				<UserLink to={ `/profile/${ listing.user._id }` }>
					<StyledProfileImg src={ profileImg } alt="User ProfilePage Image"/>
					<div>
						<h5>{ listing.user.listings.length } обяви</h5>
					</div>
					<div>
						<span><i>{ listing.user.nameAndSurname }</i></span>
					</div>
					<div>
						<StyledFaStar/>
						<span>{ listing.user.rating }</span>
						<span> ({ listing.user.reviews.length } votes)</span>
					</div>
				</UserLink>
			</section>
		</ContainerSection>
	)
}

export default Slide