import { useEffect, useState } from "react";

function useResizeScreen() {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    // 화면 크기가 변경될 때마다 실행되는 함수
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // 화면 크기 변경 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  return screenWidth
}

export default useResizeScreen