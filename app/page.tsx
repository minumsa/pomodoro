"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./pomodoro.module.css";

export default function Page() {
  const [time, setTime] = useState<number>(25);
  const [timeToggle, setTimeToggle] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(time * 60);
  const [restTime, setRestTime] = useState<number>(5);
  const [restTimeToggle, setRestTimeToggle] = useState<boolean>(false);
  const [restSeconds, setRestSeconds] = useState<number>(restTime * 60);
  const [plan, setPlan] = useState<number>(12);
  const [complete, setComplete] = useState<number>(0);

  const midnight = new Date();

  midnight.setHours(24, 0, 0, 0);

  useEffect(() => {
    const storedTime = localStorage.getItem("time");
    if (storedTime) {
      setTime(parseInt(storedTime));
    }

    const storedRestTime = localStorage.getItem("restTime");
    if (storedRestTime) {
      setRestTime(parseInt(storedRestTime));
    }

    const storedComplete = localStorage.getItem("complete");
    if (storedComplete) {
      setComplete(parseInt(storedComplete));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("time", time.toString());
    localStorage.setItem("restTime", restTime.toString());
    localStorage.setItem("complete", complete.toString());

    const now = new Date();
    if (now > midnight) {
      localStorage.removeItem("time");
      localStorage.removeItem("restTime");
      localStorage.removeItem("complete");
    }
  }, [time, restTime, complete]);

  const intervalRef = useRef<any>(null);

  useEffect(() => {
    setTimeToggle(false);
  }, []);

  useEffect(() => {
    setSeconds(time * 60);
    setRestSeconds(restTime * 60);
  }, [time, restTime]);

  const handleReset = () => {
    if (window.confirm("리셋하시겠습니까? 모든 양이 사라집니다.")) {
      setTimeToggle(false);
      setPlan(12);
      setTime(25);
      setRestTime(5);
      setSeconds(time * 60);
      setRestSeconds(restTime * 60);
      window.alert("리셋되었습니다.");
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className={styles["container"]} style={{ width: "100vw", height: "100vh" }}>
      <div className={styles["nav-div"]}>
        <div className={styles["nav-title"]}>C:₩WINDOWS₩system32₩복제양_뽀모도로.exe</div>
        <div className={styles["nav-icon"]}>?</div>
        <div className={`${styles["nav-icon"]} ${styles["close"]}`}>x</div>
        <div className={styles["nav-border-bottom"]}></div>
      </div>
      <div className={styles["sheep-container"]}>
        <div className={styles["sheep"]}>{`🐑`}</div>
        <div className={styles["timer-container"]}>
          <Timer
            time={time}
            timeToggle={timeToggle}
            setTimeToggle={setTimeToggle}
            restTime={restTime}
            restTimeToggle={restTimeToggle}
            setRestTimeToggle={setRestTimeToggle}
            seconds={seconds}
            setSeconds={setSeconds}
            restSeconds={restSeconds}
            setRestSeconds={setRestSeconds}
            complete={complete}
            setComplete={setComplete}
            handleReset={handleReset}
          />
        </div>
        <div className={styles["settings-container"]}>
          <div className={styles["settings-div"]}>
            <div className={styles["settings-plan-div"]}>
              반복(plan) :{" "}
              <select
                className={styles["select"]}
                name="plan"
                id="plan-select"
                value={plan}
                onChange={e => {
                  setPlan(Number(e.target.value));
                }}
                style={{
                  fontSize: "14px",
                  width: "60px",
                  marginLeft: "12px",
                }}
                disabled={timeToggle || restTimeToggle}
              >
                <option value="1">1회</option>
                <option value="2">2회</option>
                <option value="3">3회</option>
                <option value="4">4회</option>
                <option value="5">5회</option>
                <option value="6">6회</option>
                <option value="7">7회</option>
                <option value="8">8회</option>
                <option value="9">9회</option>
                <option value="10">10회</option>
                <option value="11">11회</option>
                <option value="12">12회</option>
              </select>
            </div>
            <div className={styles["settings-pomodoro-div"]}>
              집중(pomodoro) :
              <select
                className={styles["select"]}
                name="time"
                id="time-select"
                value={time}
                onChange={e => {
                  setTime(Number(e.target.value));
                }}
                style={{
                  fontSize: "14px",
                  width: "60px",
                  marginLeft: "12px",
                }}
                disabled={timeToggle || restTimeToggle}
              >
                <option value="5">5분</option>
                <option value="10">10분</option>
                <option value="15">15분</option>
                <option value="20">20분</option>
                <option value="25">25분</option>
                <option value="30">30분</option>
                <option value="35">35분</option>
                <option value="40">40분</option>
                <option value="45">45분</option>
                <option value="50">50분</option>
                <option value="55">55분</option>
                <option value="60">60분</option>
              </select>
            </div>
            <div className={styles["settings-rest-div"]}>
              휴식(rest) :{" "}
              <select
                className={styles["select"]}
                name="rest"
                id="rest-select"
                value={restTime}
                onChange={e => {
                  setRestTime(Number(e.target.value));
                }}
                style={{
                  fontSize: "14px",
                  width: "60px",
                  marginLeft: "12px",
                }}
                disabled={timeToggle || restTimeToggle}
              >
                <option value="5">5분</option>
                <option value="10">10분</option>
                <option value="15">15분</option>
                <option value="20">20분</option>
                <option value="25">25분</option>
                <option value="30">30분</option>
                <option value="35">35분</option>
                <option value="40">40분</option>
                <option value="45">45분</option>
                <option value="50">50분</option>
                <option value="55">55분</option>
                <option value="60">60분</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles["pomodoro-container"]}>
          <div className={styles["pomodoro"]}>
            <SheepImage plan={plan} restTimeToggle={restTimeToggle} complete={complete} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface TimerProps {
  time: number;
  timeToggle: boolean;
  setTimeToggle: React.Dispatch<React.SetStateAction<boolean>>;
  restTime: number;
  restTimeToggle: boolean;
  setRestTimeToggle: React.Dispatch<React.SetStateAction<boolean>>;
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  restSeconds: number;
  setRestSeconds: React.Dispatch<React.SetStateAction<number>>;
  complete: number;
  setComplete: React.Dispatch<React.SetStateAction<number>>;
  handleReset: any;
}

function Timer({
  time,
  timeToggle,
  setTimeToggle,
  restTime,
  restTimeToggle,
  setRestTimeToggle,
  seconds,
  setSeconds,
  restSeconds,
  setRestSeconds,
  setComplete,
  handleReset,
}: TimerProps) {
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (timeToggle === true) {
      interval = setInterval(() => {
        setSeconds(x => {
          if (x > 0) {
            return x - 1;
          } else {
            clearInterval(interval);
            setSeconds(time * 60);
            setTimeToggle(false);
            setComplete(x => x + 1);
            alert("집중에 성공해서 양 한 마리가 생성되었습니다!");
            setRestTimeToggle(true);
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeToggle]);

  useEffect(() => {
    let restInterval: ReturnType<typeof setInterval>;

    if (restTimeToggle === true) {
      setRestSeconds(restTime * 60);
      restInterval = setInterval(() => {
        setRestSeconds(x => {
          if (x > 0) {
            return x - 1;
          } else {
            clearInterval(restInterval);
            setRestTimeToggle(false);
            setRestSeconds(restTime * 60);
            alert("시작 버튼을 눌러 다시 집중을 시작하세요!");
            return restTime * 60;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(restInterval);
    };
  }, [restTimeToggle]);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const restHours = Math.floor(restSeconds / 3600);
  const restMinutes = Math.floor((restSeconds % 3600) / 60);
  const restRemainingSeconds = restSeconds % 60;

  const formatTime = (x: number) => {
    return x < 10 ? "0" + x : x;
  };

  return (
    <div>
      {(() => {
        if (timeToggle === false && restTimeToggle === false) {
          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className={styles["time-container"]} style={{ marginLeft: "5px" }}>
                  {`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(remainingSeconds)}`}{" "}
                </div>
              </div>
              <div className={styles["text-container"]}>
                <span>집중을 통해 </span>
                <span className={styles["sheep-point"]}>양</span>
                <span>을 탄생시키세요!</span>
              </div>
              <div className={styles["button-container"]}>
                <span
                  className={styles["button"]}
                  onClick={() => {
                    setTimeToggle(true);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  시작
                </span>
                <span
                  className={styles["button"]}
                  onClick={() => {
                    setTimeToggle(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  중단
                </span>
                <span
                  className={styles["button"]}
                  onClick={handleReset}
                  style={{ cursor: "pointer" }}
                >
                  리셋
                </span>
              </div>
            </div>
          );
        } else if (timeToggle === true && restTimeToggle === false) {
          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className={styles["time-container"]}>
                  {`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(remainingSeconds)}`}{" "}
                </div>
              </div>
              <div className="text-container">
                <span>이제부터 </span>
                <span className={styles["sheep-point"]}>집중</span>
                <span>하세요!...</span>
              </div>
              <div className={styles["button-container"]}>
                <span
                  className={styles["button"]}
                  onClick={() => {
                    setTimeToggle(true);
                  }}
                >
                  시작
                </span>
                <span
                  className={styles["button"]}
                  onClick={() => {
                    setTimeToggle(false);
                  }}
                >
                  중단
                </span>
                <span
                  className={styles["button"]}
                  onClick={handleReset}
                  style={{ cursor: "pointer" }}
                >
                  리셋
                </span>
              </div>
            </div>
          );
        } else if (timeToggle === false && restTimeToggle === true) {
          return (
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className={styles["time-container"]}>
                  {`${formatTime(restHours)}:${formatTime(restMinutes)}:${formatTime(
                    restRemainingSeconds
                  )}`}
                </div>
              </div>
              <div className="text-container">
                <span>이제부터 </span>
                <span className={styles["sheep-point"]}>휴식</span>
                <span>을 취하세요!...</span>
              </div>
            </>
          );
        }
      })()}
    </div>
  );
}

interface SheepImageProps {
  plan: number;
  restTimeToggle: boolean;
  complete: number;
}

function SheepImage({ plan, restTimeToggle, complete }: SheepImageProps) {
  useEffect(() => {}, [plan]);

  useEffect(() => {}, [restTimeToggle]);

  const generateImages = () => {
    const images = [];

    images.push(
      Array(complete > 0 ? complete : 0)
        .fill(undefined)
        .map((_, i) => (
          <span className={styles["pomodoro-image"]} key={i}>
            <Image
              src="/pomodoro/icon-color.webp"
              alt="Pictures of the sheep"
              width="65"
              height="65"
              style={{ marginBottom: "8px" }}
            />
          </span>
        ))
    );

    images.push(
      Array(plan - complete > 0 ? plan - complete : 0)
        .fill(undefined)
        .map((_, i) => (
          <span className={styles["pomodoro-image"]} key={i}>
            <Image
              src="/pomodoro/icon-mono.webp"
              alt="Pictures of the sheep"
              width="65"
              height="65"
              style={{ marginBottom: "8px" }}
            />
          </span>
        ))
    );

    return images;
  };

  return <>{generateImages()}</>;
}
