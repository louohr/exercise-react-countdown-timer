import { useState, useEffect, useRef } from "react";

const CountdownTimer = () => {
  // State declarations
  const [timeLeft, setTimeLeft] = useState(5); // tid kvar
  const [isActive, setIsActive] = useState(false); // uppdaterar timeleft, aktiv eller inte
  const timerRef = useRef(0); // reference to the interval timer, paus eller återställning

  useEffect(() => {
    // när isActive eller timeLeft ändras, stannar om tiden är 0
    if (isActive && timeLeft > 0) {
      // starta nedräkning
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // stannar timern
            clearInterval(timerRef.current);
            setIsActive(false);
            console.log("Tiden är slut!");
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // stannar timer med cleanup
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  // återställ timer
  const resetTimer = () => {
    setIsActive(false); // stoppar timer
    clearInterval(timerRef.current); // rensar nuvarande värde för att stoppa timern
    setTimeLeft(5);
  };

  return (
    <div>
      <h1>Nedräkningstimer</h1>
      <h2>{timeLeft} sekunder kvar</h2>
      <button onClick={() => setIsActive(true)}>Starta</button>
      <button onClick={() => setIsActive(false)}>Pausa</button>
      <button onClick={resetTimer}>Återställ</button>
    </div>
  );
};

export default CountdownTimer;
