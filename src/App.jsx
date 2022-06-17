import { useState, useEffect, useMemo } from 'react';
import cloneDeep from 'lodash.clonedeep';
import { StyledAppWrapper } from './App.styled';
import Cell from './Cell/Cell';
import Dropdown from './Dropdown/Dropdown';
import { sizeOptions, numOfLivingCellsOptions, generationsDelayOptions, autoRestartOptions, policyOptions } from './helpers/dropdownOptions';
import { checkIsAlive } from './helpers/checkIfAliveLogic';

const App = () => {
  const [currentArr, setCurrentArr] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState();
  const [fieldSize, setFieldSize] = useState(10);
  const [initialNumOfLivingCells, setInitialNumOfLivingCells] = useState(0.3);
  const [generationsDelay, setGenerationsDelay] = useState(500);
  const [autoRestart, setAutoRestart] = useState('');
  const [policy, setPolicy] = useState('conway');

  let nextStep = useMemo(() => cloneDeep(currentArr), [currentArr]);

  const fieldWidth = 600;
  const fieldHeight = 600;
 
  //initial 2d array 
  const fillArraysWithZeros = () => {
    let currArr = [];
    for (let i = 0; i < fieldSize; i++) {
      currArr[i] = [];
      for (let j = 0; j < fieldSize; j++) {
        currArr[i][j] = 0;
      }
   }
   setCurrentArr(currArr);
  };

  useEffect(() => fillArraysWithZeros(), [fieldSize]);

  //creating first generation
  const fillWithRandomNumbers = () => {
    let inititalArr = cloneDeep(currentArr);
    for (let i = 0; i < fieldSize; i++) {
      for (let j = 0; j < fieldSize; j++) inititalArr[i][j] = (Math.random() < initialNumOfLivingCells) ? 1 : 0;
    }
    setCurrentArr(inititalArr);
  };

  const startGame = () => {
    fillWithRandomNumbers();
    setIsGameStarted(true);
  };
  
  //game process - checks for next generation and stoppes/restarts if needed
  useEffect(() => {
    if (isGameStarted) { 
      currentArr.forEach((el, i) => checkIsAlive(el, i, currentArr, fieldSize, nextStep, policy));
      if (JSON.stringify(nextStep) === JSON.stringify(currentArr)) {
        if (autoRestart) startGame()
        else if (!autoRestart) setIsGameStarted(false);
        return;
      };
      setTimeout(() => setCurrentArr(nextStep), generationsDelay);
    };
  }, [currentArr]);

  const renderCells = arr => {
    return arr.map(el => {
     return <Cell key={Math.random()} isAlive={el === 1 ? true : false}></Cell>
    })
  };

  //handlers for dropdowns changes
  const onSizeFieldChange = e => !isGameStarted && setFieldSize(e.target.value);

  const onNumOfLivingCellsChange = e => !isGameStarted && setInitialNumOfLivingCells(e.target.value);

  const onNumGenerationsDelayChange = e => !isGameStarted && setGenerationsDelay(e.target.value);

  const onAutoRestartChange = e => setAutoRestart(e.target.value);

  const onPolicyChange = e => !isGameStarted && setPolicy(e.target.value);

  return (
    <StyledAppWrapper fieldSize={fieldSize} fieldWidth={fieldWidth} fieldHeight={fieldHeight}>
      <h1 className='app-title'>Game of life</h1>
      <div className='options'>
        <div className='dropdowns-container'>
          <Dropdown 
            value={fieldSize}
            onChange={onSizeFieldChange}
            options={sizeOptions}
            label='Size:'
          />
          <Dropdown 
            value={initialNumOfLivingCells}
            onChange={onNumOfLivingCellsChange}
            options={numOfLivingCellsOptions}
            label='Seed:'
          />
          <Dropdown 
            value={generationsDelay}
            onChange={onNumGenerationsDelayChange}
            options={generationsDelayOptions}
            label='Speed:'
          />
          <Dropdown 
            value={policy}
            onChange={onPolicyChange}
            options={policyOptions}
            label='Policy:'
          />
          <Dropdown 
            value={autoRestart}
            onChange={onAutoRestartChange}
            options={autoRestartOptions}
            label='Auto restart:'
          />
        </div>
        <button className='start-btn' onClick={startGame}>Start</button>
      </div>
      <div className='cells-container'>
        {currentArr.map(arr => renderCells(arr))}
      </div>
    </StyledAppWrapper>
  );
}

export default App;
