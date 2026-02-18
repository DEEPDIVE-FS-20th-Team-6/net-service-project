export default function Hero() {
    return (
      <div
        className="h-[70vh] flex items-end p-10 bg-cover bg-center"
    style={{
  backgroundImage: "url('/blad.png')",
}}
      >
        <div>
          <h2 className="text-4xl font-bold mb-4">대표 영화 제목</h2>
          <p className="max-w-lg">
            이곳에 영화 설명이 들어갑니다. 넷플릭스 스타일의 히어로 배너입니다.
          </p>
        </div>
      </div>
    );
  }
  