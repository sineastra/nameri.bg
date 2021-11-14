import styled from 'styled-components'
import { FaStar } from "react-icons/fa"


const ContainerSection = styled.section`
  position: relative;
  transition: opacity 1s ease-in-out;
  opacity: ${props => props.active ? 1 : 0};
  height: ${props => props.active ? 'auto' : 0};
  overflow: ${props => props.active ? 'auto' : 'hidden'};
`

const StyledFaStar = styled(FaStar)`
  color: orange`

const UserSection = styled.section`
  z-index: 1;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  width: 25%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  right: 0;
  bottom: 0;
  padding: 30px 20px;
`

const ImageSection = styled.section`
  z-index: 0`

const StyledProfileImg = styled.img`
  border-radius: 200px;`

const Slide = ({ img, user, activeId }) => {

	return (
		<ContainerSection active={activeId === user.id}>
			<ImageSection>
				<img src={img} alt="Service Front Image"/>
			</ImageSection>
			<UserSection>
				<StyledProfileImg src={user.profileImg} alt="User Profile Image"/>
				<div>
					<h3>{user.profession}</h3>
				</div>
				<div>
					<span><i>{user.fullName}</i></span>
				</div>
				<div>
					<StyledFaStar/>
					<span>{user.rating}</span>
					<span> ({user.votedUsers} votes)</span>
				</div>
			</UserSection>
		</ContainerSection>
	)
}

export default Slide