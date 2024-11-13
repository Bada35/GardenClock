import { useEffect, useState } from 'react';

const ALL_SIDES = [
  'digit-square-border-top',
  'digit-square-border-left',
  'digit-square-border-right',
  'digit-square-border-bottom',
];

const NUMBER_TO_CLASSES = {
  0: { top: ['digit-square-border-top', 'digit-square-border-left', 'digit-square-border-right'], bottom: ['digit-square-border-bottom', 'digit-square-border-left', 'digit-square-border-right'] },
  1: { top: ['digit-square-border-right'], bottom: ['digit-square-border-right'] },
  2: { top: ['digit-square-border-top', 'digit-square-border-right', 'digit-square-border-bottom'], bottom: ['digit-square-border-top', 'digit-square-border-left', 'digit-square-border-bottom'] },
  3: { top: ['digit-square-border-top', 'digit-square-border-right', 'digit-square-border-bottom'], bottom: ['digit-square-border-top', 'digit-square-border-right', 'digit-square-border-bottom'] },
  4: { top: ['digit-square-border-left', 'digit-square-border-right', 'digit-square-border-bottom'], bottom: ['digit-square-border-right', 'digit-square-border-top'] },
  5: { top: ['digit-square-border-top', 'digit-square-border-left', 'digit-square-border-bottom'], bottom: ['digit-square-border-top', 'digit-square-border-right', 'digit-square-border-bottom'] },
  6: { top: ['digit-square-border-top', 'digit-square-border-left', 'digit-square-border-bottom'], bottom: ALL_SIDES },
  7: { top: ['digit-square-border-top', 'digit-square-border-right'], bottom: ['digit-square-border-right'] },
  8: { top: ALL_SIDES, bottom: ALL_SIDES },
  9: { top: ALL_SIDES, bottom: ['digit-square-border-top', 'digit-square-border-right', 'digit-square-border-bottom'] },
};

function Digit({ number }) {
  const { top, bottom } = NUMBER_TO_CLASSES[number];
  return (
    <div>
      <div className={['digit-square', 'digit-square-top', ...top].join(' ')} />
      <div className={['digit-square', 'digit-square-bottom', ...bottom].join(' ')} />
    </div>
  );
}

function Separator() {
  return (
    <div className="separator">
      <div className="separator-dot" />
      <div className="separator-dot" />
    </div>
  );
}

// 생체 시계에서 하루를 25시간으로 나누기 위해 사용되는 시간 변환 함수
function convertToBioClockTime(elapsedRealSeconds) {
  const bioSeconds = elapsedRealSeconds / (86400 / (25 * 3600));
  const bioHours = Math.floor(bioSeconds / 3600) % 25;
  const bioMinutes = Math.floor((bioSeconds % 3600) / 60);
  const bioSecondsOnly = Math.floor(bioSeconds % 60);

  return { bioHours, bioMinutes, bioSeconds: bioSecondsOnly };
}

function useBioClockTime() {
  const [bioTime, setBioTime] = useState(() => {
    const now = new Date();
    const elapsedRealSeconds =
      (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());
    return convertToBioClockTime(elapsedRealSeconds);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const elapsedRealSeconds =
        (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());
      setBioTime(convertToBioClockTime(elapsedRealSeconds));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return bioTime;
}

export default function Clock() {
  const { bioHours, bioMinutes, bioSeconds } = useBioClockTime();

  return (
    <time className="clock">
      <Digit number={Math.floor(bioHours / 10)} />
      <Digit number={bioHours % 10} />
      <Separator />
      <Digit number={Math.floor(bioMinutes / 10)} />
      <Digit number={bioMinutes % 10} />
      <Separator />
      <Digit number={Math.floor(bioSeconds / 10)} />
      <Digit number={bioSeconds % 10} />
    </time>
  );
}
