import styled from 'styled-components';
import { colors } from './helpers/colors';

export const StyledAppWrapper = styled.div`
    .app-title {
        width: 100%;
        text-align: center;
    }

    .options {
        width: 70%;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid ${colors.mainGreen};
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;

        .dropdowns-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, 1fr);
            gap: 10px;
            align-items: start;
            width: 100%;
        }
    }

    .start-btn {
        color: #FFFFFF;
        background-color: ${colors.mainGreen};
        border: none;
        border-radius: 10px;
        cursor: pointer;
        padding: 10px;
        width: 300px;
        font-size: 20px;
    }

    .cells-container {
        width: ${(({ fieldWidth }) => `${fieldWidth}px`)};
        height: ${(({ fieldHeight }) => `${fieldHeight}px`)};;
        margin: auto;
        display: grid;
        grid-template-columns: repeat(${(({ fieldSize, fieldWidth }) => `${fieldSize}, ${fieldWidth/fieldSize}px`)});
        grid-template-rows: repeat(${(({ fieldSize, fieldHeight }) => `${fieldSize}, ${fieldHeight/fieldSize}px`)});
    }
    
    .cell {
        width: ${(({ fieldSize, fieldWidth }) => `${fieldWidth/fieldSize}px`)};
        height: ${(({ fieldSize, fieldHeight }) => `${fieldHeight/fieldSize}px`)};
        border: 1px solid ${colors.lightGreen};
    }

    .filled {
        background-color: ${colors.mainGreen}
    }
`