import styled from 'styled-components'
import { FaStar } from "react-icons/fa"
import { Link } from "react-router-dom"
import { IconContext } from "react-icons"


const IconProvider = ({ className, children }) => <IconContext.Provider
	value={ { className } }>{ children }</IconContext.Provider>

const ContainerSection = styled.section`
  position: relative;
  transition: opacity 1s ease-in-out;
  width: 100%;
  opacity: ${ props => props.active ? 1 : 0 };
  height: ${ props => props.active ? '100%' : 0 };
  overflow: hidden;
`

const StyledFaStar = styled(FaStar)`
  color: orange`

const UserLink = styled(Link)`
  width: 100%;
  height: 100%;
  padding: 1%;
  box-sizing: border-box;
  text-decoration: none;
  color: #1c1c1c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`

const ImageSection = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
`

const StyledProfileImg = styled.img`
  border-radius: 200px;
  width: 35%;

  @media screen and (max-width: 600px) {
    width: 25%;
  }
`

const StyledCarouselImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`

const UserProfileSection = styled.section`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  width: 35%;
  height: 35%;
  display: flex;
  margin-right: 10px;
  margin-bottom: 10px;

  @media screen and (max-width: 400px) {
    width: 50%;
    height: 50%;
  }
`

const ListingsNumberHeader = styled.h5`
  margin: 0;
  font-size: 1em;

  @media screen and (max-width: 500px) {
    font-size: 0.8em;
  }
`

const UserNames = styled.span`
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  font-size: 1em;

  @media screen and (max-width: 500px) {
    font-size: 70%;
  }
`

const StyledIconProvider = styled(IconProvider)`
  font-size: 1em;

  @media screen and (max-width: 500px) {
    font-size: 0.8em;
  }
`
const StyledSpanVotes = styled.span`
  font-size: 0.8em;

  @media screen and (max-width: 500px) {
    font-size: 0.6em;
  }
`

const StyledUserSectionDiv = styled.div`
  display: flex;
  align-items: flex-start;
  max-height: 20%;
`

const Slide = ({ listing, activeId }) => {
	const profileImg = listing.user.profileImg === "" ? "profile.svg" : listing.user.profileImg

	return (<ContainerSection active={ activeId === listing._id }>
		<ImageSection>
			<StyledCarouselImg src={ listing.mainImg } alt="Service Front Image"/>
		</ImageSection>
		<UserProfileSection>
			<UserLink to={ `/profile/${ listing.user._id }` }>
				<StyledProfileImg src={ `/${ profileImg }` } alt="User Profile Image"/>
				<StyledUserSectionDiv>
					<ListingsNumberHeader>{ listing.user.listings.length } обяви</ListingsNumberHeader>
				</StyledUserSectionDiv>
				<StyledUserSectionDiv>
					<UserNames>{ listing.user.nameAndSurname }</UserNames>
				</StyledUserSectionDiv>
				<StyledUserSectionDiv>
					<StyledIconProvider>
						<StyledFaStar/>
					</StyledIconProvider>
					<StyledSpanVotes>{ listing.user.rating }</StyledSpanVotes>
					<StyledSpanVotes> ({ listing.user.reviews.length } votes)</StyledSpanVotes>
				</StyledUserSectionDiv>
			</UserLink>
		</UserProfileSection>
	</ContainerSection>)
}

export default Slide