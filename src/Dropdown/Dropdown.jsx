import { StyledDropdownLabel } from './Dropdown.styled';

const Dropdown = ({ options, value, onChange, label }) => {
    return (
      <StyledDropdownLabel>
        {label}
        <select value={value} onChange={onChange}>
          {options.map((option, i) => {
            return <option value={option.value} key={i}>{option.label}</option>
          })}
        </select>
      </StyledDropdownLabel>
    );
};

export default Dropdown;