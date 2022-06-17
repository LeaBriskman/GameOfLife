import { useState, useEffect } from 'react';

const Cell = ({ isAlive=false }) => {
    const [isFilled, setIsFilled] = useState('');

    useEffect(() => {
        isAlive ? setIsFilled('filled') : setIsFilled('');
    }, [isAlive]);

    return <div className={`cell ${isFilled}`}></div>
};

export default Cell;