import styled from 'styled-components';
import { colors } from '../helpers/colors';

export const StyledDropdownLabel = styled.label`
    font-size: 18px;
    
    select {
        height: 30px;
        margin: 0 20px;
        border: 1px solid ${colors.lightGreen};
        outline: none;
        font-size: 14px;
    }

`