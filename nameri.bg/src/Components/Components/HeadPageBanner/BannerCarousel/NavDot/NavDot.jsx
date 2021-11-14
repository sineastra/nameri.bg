import styled from "styled-components"


const CircleDot = styled.div`
  border-radius: 20px;
  width: 30px;
  height: 10px;
  background: ${props => props.active ? 'red' : 'lightgrey'};
  cursor: pointer;

  &:hover {
    background: red;
  }`

const NavDot = ({ changeId, activeId, id }) => {
	return <CircleDot onClick={() => changeId(id)} acive={activeId === id}/>
}

export default NavDot