import styled from "styled-components"


const CircleDot = styled.div`
  border-radius: 20px;
  width: 15px;
  height: 15px;
  background: ${ props => props.active ? '#ff7200' : 'lightgray' };
  cursor: pointer;

  &:hover {
    background: #ff7200;
  }`

const NavDot = ({ changeId, activeId, id }) => {
	const active = activeId === id

	return <CircleDot onClick={ () => changeId(id) } active={ active }/>
}

export default NavDot