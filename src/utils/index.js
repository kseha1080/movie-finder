export const handleInput = ({e, state, component}) => {
    let newState = {...state};
    const stateName = e.target.name,
    stateValue = e.target.value;
    newState[stateName] = stateValue;
    component.setState()
};